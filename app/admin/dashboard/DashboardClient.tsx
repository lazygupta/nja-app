"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveMember, rejectMember, sendPaymentRequest } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Member = {
  _id: string;
  name: string;
  email?: string;
  status: "pending" | "approved" | "rejected";
  memberIdCardNumber?: string;
  finalDesignation?: string;

  photo?: string;
  signature?: string;
  idProof?: string;
  ugCert?: string;
  characterCert?: string;
  paymentReceipt?: string;
};

type Props = {
  members: Member[];
};

type DocPreview = {
  url: string;
  label: string;
};

const TABS = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
] as const;

export default function DashboardClient({ members }: Props) {
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [isPending, startTransition] = useTransition();
  const [designationDrafts, setDesignationDrafts] = useState<
    Record<string, string>
  >({});
  const [preview, setPreview] = useState<DocPreview | null>(null);

  const router = useRouter();

  const filtered = members.filter((m) => m.status === activeTab);

  const handleApprove = (memberId: string) => {
    const finalDesignation =
      designationDrafts[memberId] ||
      members.find((m) => m._id === memberId)?.finalDesignation ||
      "";

    startTransition(async () => {
      await approveMember(memberId, finalDesignation);
      router.refresh();
    });
  };

  const handleReject = (memberId: string) => {
    startTransition(async () => {
      await rejectMember(memberId);
      router.refresh();
    });
  };

  const openPreview = (url: string, label: string) => {
    setPreview({ url, label });
  };

  return (
    <>
      <div className="flex gap-6">
        {/* LEFT: Vertical Tabs */}
        <aside className="w-48 border rounded-lg bg-white dark:bg-neutral-900 p-3 space-y-2">
          {TABS.map((tab) => {
            const count = members.filter((m) => m.status === tab.id).length;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm rounded-md border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-transparent text-gray-800 dark:text-gray-100 border-transparent hover:bg-gray-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-xs rounded-full px-2 py-0.5 bg-black/10 dark:bg-white/10">
                  {count}
                </span>
              </button>
            );
          })}
        </aside>

        {/* RIGHT: Members List */}
        <section className="flex-1 border rounded-lg bg-white dark:bg-neutral-900 p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold capitalize">
              {activeTab} Members
            </h2>
            {isPending && <p className="text-xs text-gray-500">Updating…</p>}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No members in this section.</p>
          ) : (
            <div className="space-y-4">
              {filtered.map((m) => (
                <div
                  key={m._id}
                  className="border rounded-md p-4 bg-gray-50 dark:bg-neutral-800 space-y-2"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-base">{m.name}</p>
                      {m.email && (
                        <p className="text-xs text-gray-600">{m.email}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        ID Card No:{" "}
                        {m.memberIdCardNumber ? m.memberIdCardNumber : "—"}
                      </p>

                      <p className="text-xs text-gray-500">
                        Final Designation: {m.finalDesignation || "Not set"}
                      </p>
                    </div>

                    {/* Designation editor (owner sets designation) */}
                    {activeTab === "pending" && (
                      <div className="space-y-1 space-x-3">
                        <label className="block text-xs font-semibold">
                          Set Final Designation
                        </label>
                        <input
                          type="text"
                          className="border text-xs rounded-md px-2 py-1 bg-white dark:bg-neutral-900"
                          placeholder="e.g. State Coordinator"
                          required
                          value={
                            designationDrafts[m._id] ?? m.finalDesignation ?? ""
                          }
                          onChange={(e) =>
                            setDesignationDrafts((prev) => ({
                              ...prev,
                              [m._id]: e.target.value,
                            }))
                          }
                        />

                        {!m.paymentReceipt && (<Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-xs"
                          disabled={isPending}
                          onClick={() =>
                            startTransition(async () => {
                              const res = await sendPaymentRequest(m._id);
                              if (res?.success)
                                alert("Payment email sent to member.");
                              else alert("Failed to send email.");
                            })
                          }
                        >
                          Send Membership Fee Message
                        </Button>
                      )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {activeTab === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            disabled={isPending}
                            onClick={() => handleApprove(m._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            disabled={isPending}
                            onClick={() => handleReject(m._id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {activeTab === "approved" && (
                        <span className="text-xs text-green-600 font-semibold">
                          Approved ✔
                        </span>
                      )}

                      {activeTab === "rejected" && (
                        <span className="text-xs text-red-600 font-semibold">
                          Rejected ✘
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Document preview buttons */}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {m.photo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() => openPreview(m.photo!, "Photo")}
                      >
                        View Photo
                      </Button>
                    )}
                    {m.signature && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() => openPreview(m.signature!, "Signature")}
                      >
                        View Signature
                      </Button>
                    )}
                    {m.idProof && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() => openPreview(m.idProof!, "ID Proof")}
                      >
                        View ID Proof
                      </Button>
                    )}
                    {m.ugCert && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() => openPreview(m.ugCert!, "UG Certificate")}
                      >
                        View Education Certificate
                      </Button>
                    )}
                    {m.characterCert && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() =>
                          openPreview(m.characterCert!, "Character Certificate")
                        }
                      >
                        View Press Card Certificate
                      </Button>
                    )}
                    {m.paymentReceipt && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          openPreview(m.paymentReceipt!, "Payment Receipt")
                        }
                      >
                        View Receipt
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* 🔍 Preview popup / modal */}
      <Dialog
        open={!!preview}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{preview?.label}</DialogTitle>
          </DialogHeader>

          {preview && (
            <div className="mt-2">
              {preview.url.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={preview.url}
                  className="w-full h-[70vh] rounded-md border"
                />
              ) : (
                <img
                  src={preview.url}
                  alt={preview.label}
                  className="max-h-[70vh] w-auto mx-auto rounded-md border object-contain"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

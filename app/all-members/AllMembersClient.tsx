"use client";

import { useMemo, useState, ChangeEvent } from "react";
import Image from "next/image";

type Member = {
  _id: string;
  name: string;
  email?: string;
  designation?: string;
  finalDesignation?: string;
  memberIdCardNumber?: string;
  status: string;
  photo?: string;
  city?: string;
  state?: string;
  createdAt?: string;
};

export default function AllMembersClient({ members }: { members: Member[] }) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return members;

    return members.filter((m) => {
      return (
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.city?.toLowerCase().includes(q) ||
        m.state?.toLowerCase().includes(q) ||
        m.finalDesignation?.toLowerCase().includes(q) ||
        m.designation?.toLowerCase().includes(q)
      );
    });
  }, [members, search]);

  const visible = filtered.slice(0, pageSize);

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDesignation = (m: Member) =>
    m.finalDesignation && m.finalDesignation.trim().length > 0
      ? m.finalDesignation
      : m.designation || "Member";

  return (
    <div className="space-y-4">
      {/* Controls row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-300">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="bg-[#0b1020] text-gray-100 border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-300">entries</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-300">Search:</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="bg-[#0b1020] text-gray-100 border border-gray-600 rounded-md px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#1b2435] bg-[#050c1a] shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#0f172a] text-xs uppercase tracking-wide text-gray-300">
              <th className="px-4 py-3 text-left w-16">Sl. No</th>
              <th className="px-4 py-3 text-left w-28">Photo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Portal &amp; Designation</th>
              <th className="px-4 py-3 text-left">City Operated</th>
              <th className="px-4 py-3 text-left">Joined On</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No members found.
                </td>
              </tr>
            )}

            {visible.map((m, index) => (
              <tr
                key={m._id}
                className="border-t border-[#1b2435] hover:bg-[#0b1220]"
              >
                {/* SL NO */}
                <td className="px-4 py-4 align-top text-xs text-gray-300">
                  {String(index + 1).padStart(2, "0")}.
                </td>

                {/* PHOTO */}
                <td className="px-4 py-4 align-top">
                  <div className="h-28 w-20 bg-black/40 border border-gray-700 flex items-center justify-center overflow-hidden">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        width={80}
                        height={110}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-500 text-center px-1">
                        No Photo
                      </span>
                    )}
                  </div>
                </td>

                {/* NAME */}
                <td className="px-4 py-4 align-top">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-white">{m.name}</p>
                    {m.email && (
                      <p className="text-xs text-gray-400">{m.email}</p>
                    )}
                    {(m.city || m.state) && (
                      <p className="text-[11px] text-gray-500">
                        {m.city}
                        {m.city && m.state ? ", " : ""}
                        {m.state}
                      </p>
                    )}
                    {m.memberIdCardNumber && (
                      <p className="text-[11px] text-gray-500">
                        ID: {m.memberIdCardNumber}
                      </p>
                    )}
                  </div>
                </td>

                {/* PORTAL & DESIGNATION */}
                <td className="px-4 py-4 align-top">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-gray-100">
                      National Journalist Association
                    </p>
                    <p className="text-xs text-gray-300">{getDesignation(m)}</p>
                  </div>
                </td>

                <td className="px-4 py-4 align-top text-xs text-gray-300">
                  {m.city || m.state ? (
                    <>
                      {m.city}
                      {m.city && m.state ? ", " : ""}
                      {m.state}
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                {/* JOINED ON */}
                <td className="px-4 py-4 align-top text-xs text-gray-300">
                  {formatDate(m.createdAt)}
                </td>

                {/* STATUS */}
                <td className="px-4 py-4 align-top text-sm">
                  <span className="font-semibold text-emerald-400">
                    {m.status === "approved" ? "Active" : m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info text */}
      <p className="text-[11px] text-gray-500">
        Showing {visible.length} of {filtered.length} approved members.
      </p>
    </div>
  );
}

function getDesignation(m: Member) {
  if (m.finalDesignation && m.finalDesignation.trim().length > 0) {
    return m.finalDesignation;
  }
  if (m.designation && m.designation.trim().length > 0) {
    return m.designation;
  }
  return "Member";
}

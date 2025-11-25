"use client";

import { useState, useTransition } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { sendReceipt } from "./actions";

export default function PaymentUploadClient({
  memberId,
}: {
  memberId: string;
}) {
  const [receiptUrl, setReceiptUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg border bg-card">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upload Payment Receipt
        </h1>

        <p className="text-sm text-muted-foreground text-center mb-6">
          Please upload your payment receipt (JPG / PNG / PDF).
        </p>

        {/* Upload Button */}
        {!submitted && (
          <div className="flex justify-center mb-6">
            <UploadButton<OurFileRouter, "paymentReceipts">
              endpoint="paymentReceipts"
              onClientUploadComplete={(res) => {
                setReceiptUrl(res[0].url);
              }}
              appearance={{
                button:
                  "ut-button bg-blue-600 text-white dark:bg-blue-500 dark:text-black px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-400",
                allowedContent:
                  "text-xs text-muted-foreground mt-1 text-center",
              }}
            />
          </div>
        )}

        {submitted && (
          <div className="mt-6 text-center">
            <div className="p-4 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium text-sm">
              Receipt submitted successfully!
              <br />
              A confirmation email has been sent to your registered email ID.
              <br />
              You will soon receive your Membership ID after verification.
            </div>
          </div>
        )}

        {/* Show uploaded preview */}
        {receiptUrl && !submitted && (
          <div className="mt-4 text-center">
            <p className="text-sm mb-2 text-muted-foreground">
              File ready to submit
            </p>

            <button
              onClick={() =>
                startTransition(async () => {
                  await sendReceipt(memberId, receiptUrl);
                  setSubmitted(true);
                })
              }
              disabled={isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-md w-full disabled:opacity-60 hover:bg-green-700 transition"
            >
              {isPending ? "Submitting..." : "Submit Receipt"}
            </button>
          </div>
        )}

        {/* Success message */}
        {submitted && (
          <div className="mt-6 text-center">
            <div className="p-4 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
              Receipt submitted successfully!
              <br />
              Admin will verify your payment soon.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

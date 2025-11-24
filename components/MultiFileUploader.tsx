"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type FileMap = {
  photo?: string;
  signature?: string;
  idProof?: string;
  ugCert?: string;
  characterCert?: string;
};

export default function MultiFileUploader({
  onComplete,
}: {
  onComplete: (files: FileMap) => void;
}) {
  const [uploads, setUploads] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<number>(0);

  const handleUpload = (field: keyof FileMap, res: any[]) => {
    const file = res[0];

    const next = {
      ...uploads,
      [field]: {
        url: file.url,
        name: file.name,
        type: file.type,
        size: file.size,
      },
    };

    setUploads(next);

    onComplete({
      photo: next.photo?.url,
      signature: next.signature?.url,
      idProof: next.idProof?.url,
      ugCert: next.ugCert?.url,
      characterCert: next.characterCert?.url,
    });
  };

  const fields: { label: string; field: keyof FileMap }[] = [
    { label: "Upload Photo*", field: "photo" },
    { label: "Upload Signature*", field: "signature" },
    { label: "Upload Aadhar / Voter ID*", field: "idProof" },
    { label: "Upload Graduation Certificate*", field: "ugCert" },
    { label: "Upload Character Certificate*", field: "characterCert" },
  ];

  return (
    <div className="space-y-6">
      {fields.map(({ label, field }) => (
        <div key={field} className="space-y-2">
          {/* Label (dark mode safe) */}
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {label}
          </p>

          {/* Upload Button – UploadThing auto adapts to dark mode */}
          <UploadButton<OurFileRouter, "memberDocuments">
            endpoint="memberDocuments"
            onUploadProgress={(p) => setProgress(p)}
            onClientUploadComplete={(res) => handleUpload(field, res)}
            onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
            appearance={{
              button:
                "ut-button bg-primary text-white dark:bg-white dark:text-black px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-primary/80 dark:hover:bg-gray-100 transition",
              allowedContent: "text-xs text-gray-500 dark:text-gray-400 mt-1",
            }}
          />

          {/* PROGRESS BAR (light + dark mode) */}
          {progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="h-2 rounded-full transition-all bg-blue-600 dark:bg-blue-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* PREVIEW (images + PDF) */}
          {uploads[field]?.url && (
            <div className="mt-1">
              {uploads[field].type?.startsWith("image") ? (
                <img
                  src={uploads[field].url}
                  alt={label}
                  className="w-24 h-24 rounded-md object-cover border border-gray-300 dark:border-gray-700"
                />
              ) : (
                <a
                  href={uploads[field].url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-700 dark:text-blue-400 underline"
                >
                  View uploaded file
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

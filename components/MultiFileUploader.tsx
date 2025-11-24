"use client";

import { useEffect, useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type FileMap = {
  photo?: string;
  signature?: string;
  idProof?: string;
  ugCert?: string;
  characterCert?: string;
};

type UploadedMeta = {
  url: string;
  name: string;
  type: string;
  size: number;
};

type UploadState = {
  file?: UploadedMeta;
  progress: number;
};

type UploadMap = Record<keyof FileMap, UploadState>;

const initialUploads: UploadMap = {
  photo: { progress: 0 },
  signature: { progress: 0 },
  idProof: { progress: 0 },
  ugCert: { progress: 0 },
  characterCert: { progress: 0 },
};

export default function MultiFileUploader({
  onComplete,
}: {
  onComplete: (files: FileMap) => void;
}) {
  const [uploads, setUploads] = useState<UploadMap>(initialUploads);

  const handleProgress = (field: keyof FileMap, value: number) => {
    setUploads((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        progress: value,
      },
    }));
  };

  const handleUpload = (field: keyof FileMap, res: any[]) => {
    const file = res?.[0];
    if (!file) return;

    setUploads((prev) => ({
      ...prev,
      [field]: {
        file: {
          url: file.url,
          name: file.name,
          type: file.type,
          size: file.size,
        },
        progress: 100,
      },
    }));

    // optional: hide progress bar after short delay
    setTimeout(() => {
      setUploads((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          progress: 0,
        },
      }));
    }, 600);
  };

  // ✅ Call onComplete in an effect (AFTER render), not inside render or setState
  useEffect(() => {
    const files: FileMap = {
      photo: uploads.photo.file?.url,
      signature: uploads.signature.file?.url,
      idProof: uploads.idProof.file?.url,
      ugCert: uploads.ugCert.file?.url,
      characterCert: uploads.characterCert.file?.url,
    };

    onComplete(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploads]);

  const fields: { label: string; field: keyof FileMap; helper?: string }[] = [
    { label: "Upload Photo*", field: "photo", helper: "Recent passport-size photo" },
    { label: "Upload Signature*", field: "signature", helper: "Clear signature on white paper" },
    { label: "Upload Aadhar / Voter ID*", field: "idProof" },
    { label: "Upload Educational Certificate*", field: "ugCert" },
    { label: "Upload Press Card Certificate*", field: "characterCert" },
  ];

  return (
    <div className="space-y-6 sm:space-y-5">
      {fields.map(({ label, field, helper }) => {
        const state = uploads[field];

        return (
          <div
            key={field}
            className="space-y-2 sm:space-y-1 sm:flex sm:items-start sm:justify-between sm:gap-4"
          >
            {/* Label side */}
            <div className="sm:w-1/3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {label}
              </p>
              {helper && (
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {helper}
                </p>
              )}
            </div>

            {/* Controls side */}
            <div className="sm:flex-1 space-y-2">
              <UploadButton<OurFileRouter, "memberDocuments">
                endpoint="memberDocuments"
                onUploadProgress={(p) => handleProgress(field, p)}
                onClientUploadComplete={(res) => handleUpload(field, res)}
                onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
                appearance={{
                  button:
                    "ut-button w-full sm:w-auto inline-flex items-center justify-center bg-primary text-white dark:bg-white dark:text-black px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-primary/80 dark:hover:bg-gray-100 text-sm font-medium transition",
                  allowedContent:
                    "text-xs text-gray-500 dark:text-gray-400 mt-1",
                }}
              />

              {/* PROGRESS BAR (per-field) */}
              {state.progress > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
              )}

              {/* PREVIEW */}
              {state.file?.url && (
                <div className="mt-1 flex items-center gap-3">
                  {state.file.type?.startsWith("image") ? (
                    <img
                      src={state.file.url}
                      alt={label}
                      className="w-16 h-16 rounded-md object-cover border border-gray-300 dark:border-gray-700"
                    />
                  ) : (
                    <a
                      href={state.file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-700 dark:text-blue-400 underline"
                    >
                      View uploaded file
                    </a>
                  )}

                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                    <p className="truncate">{state.file.name}</p>
                    <p className="text-[10px]">
                      {(state.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

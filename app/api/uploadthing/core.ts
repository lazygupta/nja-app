import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Existing endpoint for member documents
  memberDocuments: f({
    "image/jpeg": { maxFileSize: "2MB" },
  }).onUploadComplete(({ file }) => {
    return {
      url: file.url,
      name: file.name,
      type: file.type,
      size: file.size,
    };
  }),

  // NEW endpoint for payment receipts
  paymentReceipts: f({
    "image/jpeg": { maxFileSize: "4MB" },
    "image/png": { maxFileSize: "4MB" },
    "application/pdf": { maxFileSize: "4MB" },
  }).onUploadComplete(({ file }) => {
    return {
      url: file.url,
      name: file.name,
      type: file.type,
      size: file.size,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

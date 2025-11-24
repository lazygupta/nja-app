import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  memberDocuments: f({
    "image/jpeg": { maxFileSize: "2MB" }
  })
    .onUploadComplete(({ file }) => {
      return {
        url: file.url,
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

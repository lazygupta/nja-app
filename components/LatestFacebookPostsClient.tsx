// components/LatestFacebookPostsClient.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { FbPost } from "./latest-facebook-posts";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function LatestFacebookPostsClient({ posts }: { posts: FbPost[] }) {
  // Load FB SDK once and re-parse when posts change (for embeds)
  useEffect(() => {
    const w = window as any;

    const parse = () => {
      if (w.FB && w.FB.XFBML && typeof w.FB.XFBML.parse === "function") {
        w.FB.XFBML.parse();
      }
    };

    if (w.FB) {
      parse();
      return;
    }

    const scriptId = "facebook-jssdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.onload = parse;

    document.body.appendChild(script);
  }, [posts]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((post) => {
        const isVideo = post.url.includes("/videos/");
        const hasMessage = !!post.message && post.message.trim().length > 0;
        const hasImage = !!post.image;

        const shortText =
          post.message.length > 180
            ? post.message.slice(0, 180) + "..."
            : post.message;

        return (
          <article
            key={post.id}
            className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm"
          >
            {/* For normal posts, show image thumbnail at top. 
                For video posts we'll rely on the FB embed preview instead. */}
            {!isVideo && hasImage && (
              <div className="relative max-h-52 w-full overflow-hidden border-b bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image!}
                  alt="Facebook update"
                  className="h-52 w-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-4">
              <div className="mb-1 text-xs text-muted-foreground">
                Facebook • {formatDate(post.created_time)}
              </div>

              {/* VIDEO POST */}
              {isVideo ? (
                <>
                  {hasMessage && (
                    <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
                      {shortText}
                    </p>
                  )}

                  <div className="flex justify-center py-2">
                    <div
                      className="fb-video w-full h-auto"
                      data-href={post.url}
                      data-width="350"
                      data-show-text="true"
                    ></div>
                  </div>
                </>
              ) : !hasMessage && !hasImage ? (
                // BLANK / RESHARED POST → embed as fb-post
                <div className="flex justify-center py-2">
                  <div
                    className="fb-post w-full"
                    data-href={post.url}
                    data-width="350"
                    data-show-text="true"
                  ></div>
                </div>
              ) : (
                // NORMAL POST (text and/or image)
                <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {shortText || "(No text in this post)"}
                </p>
              )}

              <div className="mt-4 flex justify-end">
                <Link
                  href={post.url}
                  target="_blank"
                  className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
                >
                  View on Facebook
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

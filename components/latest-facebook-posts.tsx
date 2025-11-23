// components/latest-facebook-posts.tsx

import { LatestFacebookPostsClient } from "./LatestFacebookPostsClient";

export type FbPost = {
  id: string;
  message: string;
  image?: string | null;
  url: string;
  created_time: string;
};

async function getLatestFacebookPosts(limit = 2): Promise<FbPost[]> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) {
    console.error("Facebook env vars missing");
    return [];
  }

  const fields = [
    "message",
    "full_picture",
    "created_time",
    "permalink_url",
  ].join(",");

  const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${token}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("FB fetch failed", await res.text());
    return [];
  }

  const data = await res.json();
  const posts = (data.data ?? []) as any[];

  return posts.map((post) => ({
    id: post.id,
    message: post.message ?? "",
    image: post.full_picture ?? null,
    url: post.permalink_url,
    created_time: post.created_time,
  }));
}

export async function LatestFacebookPostsSection() {
  // change 1 -> how many posts you want
  const posts = await getLatestFacebookPosts(3);
  if (!posts.length) return null;

  return (
    <section className="bg-muted/40 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Latest Updates
        </h2>

        {/* Hand off rendering to client component */}
        <LatestFacebookPostsClient posts={posts} />
      </div>
    </section>
  );
}

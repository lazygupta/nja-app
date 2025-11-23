// app/api/facebook-posts/route.ts
import { NextResponse } from "next/server";

const PAGE_ID = process.env.FACEBOOK_PAGE_ID!;
const ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN!; // <- matches your env
const API_VERSION = process.env.FACEBOOK_API_VERSION || "v21.0";

export type FacebookPost = {
  id: string;
  title: string;
  text: string;
  image: string | null;
  url: string;
  date: string; // ISO string
};

function buildTitle(message?: string | null): string {
  if (!message) return "Facebook Update";
  const firstLine = message.split("\n")[0].trim();
  if (firstLine.length > 80) return firstLine.slice(0, 77) + "...";
  return firstLine || "Facebook Update";
}

export async function GET() {
  if (!PAGE_ID || !ACCESS_TOKEN) {
    console.error("FB env missing", { PAGE_ID: !!PAGE_ID, ACCESS_TOKEN: !!ACCESS_TOKEN });
    return NextResponse.json(
      { error: "FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN not configured" },
      { status: 500 }
    );
  }

  const fields = [
    "id",
    "created_time",
    "message",
    "full_picture",
    "permalink_url",
  ].join(",");

  const url = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/posts?fields=${fields}&access_token=${ACCESS_TOKEN}&limit=20`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const rawText = await res.text();

    if (!res.ok) {
      console.error("Facebook API raw error:", res.status, rawText);

      // Default error response
      let status = 502;
      let errorMsg = "Failed to fetch Facebook posts";

      // Try to parse Facebook JSON error and detect expired token
      try {
        const payload = JSON.parse(rawText);
        const fbError = payload?.error;

        if (fbError) {
          // Token expired / invalid (common: code 190, subcode 463)
          if (fbError.code === 190) {
            status = 401;
            errorMsg = "Facebook access token invalid or expired";
          } else {
            errorMsg = fbError.message || errorMsg;
          }
        }
      } catch {
        // ignore JSON parse failure, keep defaults
      }

      return NextResponse.json({ error: errorMsg }, { status });
    }

    const json = JSON.parse(rawText);

    const posts: FacebookPost[] = (json.data || []).map((p: any) => ({
      id: p.id,
      title: buildTitle(p.message),
      text: p.message || "",
      image: p.full_picture || null,
      url: p.permalink_url,
      date: p.created_time,
    }));

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Unexpected error fetching Facebook posts:", err);
    return NextResponse.json(
      { error: "Unexpected error fetching Facebook posts" },
      { status: 500 }
    );
  }
}

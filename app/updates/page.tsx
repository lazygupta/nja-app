// app/updates/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { FacebookPost } from "../api/facebook-posts/route";

export const metadata = {
  title: "Blog / Updates",
};

function formatDateParts(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return { day, month, year };
}

async function getFacebookUpdates(): Promise<FacebookPost[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/facebook-posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const msg = data?.error || "Updates currently unavailable.";
    // show msg somewhere in the UI instead of crashing
  }

  return res.json();
}

export default async function UpdatesPage() {
  const posts = await getFacebookUpdates();
  const latest = posts.slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Page header / breadcrumb */}
      <section className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8">
          <h1 className="text-3xl font-bold tracking-wide uppercase">Blog</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Home{" "}
            <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>{" "}
            Blog
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row">
        {/* Left: posts list */}
        <div className="flex-1 space-y-10">
          {posts.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No updates available right now. Please check again later.
            </p>
          )}

          {posts.map((post) => {
            const { day, month, year } = formatDateParts(post.date);

            return (
              <article
                key={post.id}
                className="flex flex-col gap-4 border-b border-gray-200 dark:border-gray-700 pb-10 last:border-b-0"
              >
                {/* Date + content wrapper */}
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Date box */}
                  <div className="flex w-20 flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 pr-4 text-center md:w-24">
                    <span className="text-4xl font-bold text-sky-600 dark:text-sky-400">
                      {day}
                    </span>
                    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      {month}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {year}
                    </span>
                  </div>

                  {/* Post content */}
                  <div className="flex-1 space-y-3">
                    {/* Image */}
                    {post.image && (
                      <div className="relative h-64 w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-100">
                      {post.title || "Facebook Update"}
                    </h2>

                    {/* Excerpt */}
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {post.text ||
                        "Click below to read the full update on Facebook."}
                    </p>

                    {/* Read more button */}
                    <div className="pt-2">
                      <Link
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded bg-sky-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow hover:bg-sky-700 dark:hover:bg-sky-500"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right: sidebar */}
        <aside className="w-full space-y-8 border-t border-gray-200 dark:border-gray-700 pt-8 lg:w-80 lg:border-t-0 lg:pl-10 lg:pt-0">
          {/* Latest Updates */}
          <section>
            <h3 className="mb-3 border-l-4 border-sky-600 pl-3 text-lg font-semibold">
              Latest Updates
            </h3>
            <ul className="space-y-2 text-sm">
              {latest.map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 dark:text-sky-400 hover:underline"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Search box */}
          <section>
            <h3 className="mb-3 border-l-4 border-sky-600 pl-3 text-lg font-semibold">
              Search
            </h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Search updates..."
                className="w-full rounded-l border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              />
              <button className="rounded-r border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 text-sm font-semibold text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700">
                Go
              </button>
            </div>
          </section>

          {/* Categories */}
          <section>
            <h3 className="mb-3 border-l-4 border-sky-600 pl-3 text-lg font-semibold">
              Categories
            </h3>
            <ul className="space-y-1 text-sm text-sky-700 dark:text-sky-400">
              <li>Grievance Reports</li>
              <li>News</li>
              <li>Notice</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}

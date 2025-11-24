import { Suspense } from "react";
import AdminLoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-neutral-900 dark:via-black dark:to-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center rounded-full border border-blue-100/60 dark:border-blue-500/40 bg-blue-50/80 dark:bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
            Admin Area
          </p>
        </div>

        <div className="w-full rounded-2xl border border-gray-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 shadow-xl backdrop-blur-sm p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Enter your admin credentials to access the dashboard.
            </p>
          </div>

          <Suspense fallback={<p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          This page is not linked publicly. Access via direct URL only.
        </p>
      </div>
    </main>
  );
}

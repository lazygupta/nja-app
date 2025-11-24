"use client";

import { useActionState } from "react";
import { authenticateAdmin } from "@/lib/actions";

export default function AdminLoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateAdmin,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="admin@example.com"
          autoComplete="username"
        />
      </div>

      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={4}
          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {/* Redirect after successful login */}
      <input type="hidden" name="redirectTo" value="/admin/dashboard" />

      {errorMessage && (
        <p
          className="text-sm text-red-600 dark:text-red-400 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900 px-3 py-2"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition"
      >
        {isPending ? "Logging in…" : "Login"}
      </button>
    </form>
  );
}

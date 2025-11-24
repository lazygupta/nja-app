import { getAllMembers } from "../actions";
import { signOut } from "@/auth";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  const members = await getAllMembers();

  return (
    <main className="min-h-screen p-8 space-y-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Logout */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md">
            Logout
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto">
        <DashboardClient members={members} />
      </div>
    </main>
  );
}

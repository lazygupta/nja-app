// import { getAllMembers } from "../actions";
// import { signOut } from "@/auth";
// import DashboardClient from "./DashboardClient";

// export default async function AdminDashboardPage() {
//   const members = await getAllMembers();
//   return (
//     <main className="min-h-screen p-8 space-y-6">
//       <div className="flex items-center justify-between max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//         {/* Logout */}
//         <form
//           action={async () => {
//             "use server";
//             await signOut({ redirectTo: "/" });
//           }}
//         >
//           <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md">
//             Logout
//           </button>
//         </form>
//       </div>

//       <div className="max-w-6xl mx-auto">
//         <DashboardClient members={members} />
//       </div>
//     </main>
//   );
// }


// app/admin/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth"; // exported from your auth.ts
import { getAllMembers } from "../actions";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  // 1) check server-side session (this reads cookies automatically)
  const session = await auth();

  // if not signed in, redirect to admin login
  if (!session?.user) {
    return redirect("/admin/login");
  }

  // 2) now fetch members from DB
  const members = await getAllMembers();

  // 3) render client dashboard with the members list (client component will handle interactions)
  return (
    <main className="min-h-screen p-8 space-y-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form
          action={async () => {
            "use server";
            // signOut imported in the server action file (keep same pattern you used earlier)
            const { signOut } = await import("@/auth");
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

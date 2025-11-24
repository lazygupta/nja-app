import { connectDB } from "@/lib/db";
import Member from "@/lib/model/Member";
import AllMembersClient from "./AllMembersClient";


export const dynamic = "force-dynamic";

export default async function AllMembersPage() {
  await connectDB();

  const docs = await Member.find({ status: "approved" })
    .sort({ createdAt: 1 })
    .lean();

  const members = JSON.parse(JSON.stringify(docs));

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold tracking-wide">
          OUR MEMBERS
        </h1>
        <AllMembersClient members={members} />
      </div>
    </div>
  );
}

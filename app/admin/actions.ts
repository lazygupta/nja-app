"use server";

import { connectDB } from "@/lib/db";
import Member from "@/lib/model/Member";


export async function getAllMembers() {
  await connectDB();
  const members = await Member.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(members));
}

// ✅ Approve + set status + generate ID + save finalDesignation
// ✅ Approve + set status + generate ID in format: NJA/01/2025-26
export async function approveMember(id: string, finalDesignation: string) {
  await connectDB();

  // If already approved with an ID, don't regenerate
  const existing = await Member.findById(id);
  if (!existing) return { success: false };

  let cardNo = existing.memberIdCardNumber;

  if (!cardNo) {
    // Serial number = number of already approved members + 1
    const approvedCount = await Member.countDocuments({ status: "approved" });
    const serial = String(approvedCount + 1).padStart(2, "0"); // 01, 02, 03...

    // Financial year style: 2025-26
    const now = new Date();
    const year = now.getFullYear();
    const nextYrShort = String(year + 1).slice(-2); // "26"
    const fy = `${year}-${nextYrShort}`;

    // Final format: NJA/01/2025-26
    cardNo = `NJA/${serial}/${fy}`;
  }

  await Member.findByIdAndUpdate(id, {
    status: "approved",
    memberIdCardNumber: cardNo,
    finalDesignation: finalDesignation || "",
  });

  return { success: true };
}


// ✅ Reject + set status only
export async function rejectMember(id: string) {
  await connectDB();

  await Member.findByIdAndUpdate(id, {
    status: "rejected",
  });

  return { success: true };
}

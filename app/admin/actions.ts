"use server";

import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/mail";
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

export async function sendPaymentRequest(memberId: string) {
  await connectDB();

  const member = await Member.findById(memberId);
  if (!member) return { success: false };

  // Generate unique payment reference
  const paymentRef = "PAY-" + Math.floor(100000 + Math.random() * 900000);

  // Update DB
  await Member.findByIdAndUpdate(memberId, {
    paymentReference: paymentRef,
    paymentStatus: "sent",
  });

  // Send email with payment instructions
  await sendMail({
    to: member.email,
    subject: "Membership Fee Payment Instructions",
    html: `
      Dear ${member.name}, <br/><br/>
      Your membership application has been received.<br/><br/>
      Please pay the membership fee of <strong>₹100</strong> using the details below:<br/><br/>

      <b>UPI ID:</b> nja@upi<br/>
      <b>Bank:</b> Axis<br/>
      <b>Payment Reference No:</b> ${paymentRef}<br/><br/>

      After payment, upload your receipt here:<br/>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/payment-upload/${memberId}">
        Upload Receipt
      </a>

      <br/><br/>
      Thank you,<br/>
      National Journalist Association
    `,
  });

  return { success: true };
}
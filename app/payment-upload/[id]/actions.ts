"use server";

import Member from "@/lib/model/Member";
import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/mail";

export async function sendReceipt(memberId: string, url: string) {
  await connectDB();

  // Update member with receipt info & get the updated document
  const member = await Member.findByIdAndUpdate(
    memberId,
    {
      paymentReceipt: url,
      paymentStatus: "uploaded",
      paymentUploadedAt: new Date(),
    },
    { new: true }
  );

  if (!member) {
    return { success: false };
  }

  // Build a nice HTML email
  const paymentRef = member.paymentReference || "your payment reference number";
  const amount = member.paymentAmount || 100; // if you added paymentAmount; else just hardcode

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color:#f3f4f6; padding:24px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(90deg,#0f172a,#111827); padding:16px 24px;">
          <h1 style="margin:0; color:#f9fafb; font-size:20px;">
            National Journalist Association
          </h1>
          <p style="margin:4px 0 0; color:#9ca3af; font-size:12px;">
            Payment Receipt Confirmation
          </p>
        </div>

        <div style="padding:24px;">
          <p style="margin:0 0 12px; font-size:14px; color:#111827;">
            Dear <strong>${member.name}</strong>,
          </p>

          <p style="margin:0 0 12px; font-size:14px; color:#111827;">
            We have <strong>successfully received your payment receipt</strong> for the NJA membership fee.
          </p>

          <div style="margin:16px 0; padding:12px 16px; background:#f9fafb; border-radius:8px; border:1px solid #e5e7eb;">
            <p style="margin:0 0 6px; font-size:13px; color:#374151;">
              <strong>Payment Details:</strong>
            </p>
            <p style="margin:0; font-size:13px; color:#4b5563;">
              Amount: <strong>₹${amount}</strong><br/>
              Reference No: <strong>${paymentRef}</strong><br/>
              Applicant Name: <strong>${member.name}</strong><br/>
              Registered Email: <strong>${member.email}</strong>
            </p>
          </div>

          <p style="margin:0 0 12px; font-size:14px; color:#111827;">
            Our team will now verify your payment and application details.
          </p>

          <p style="margin:0 0 12px; font-size:14px; color:#111827;">
            Once approved, you will receive your <strong>official Membership ID</strong> (e.g. <strong>NJA/01/2025-26</strong>), and it will be visible on the <strong>NJA Members Portal</strong>.
          </p>

          <p style="margin:0 0 16px; font-size:13px; color:#6b7280;">
            You can later view your membership details in the “Members” section on the NJA website.
          </p>

          <p style="margin:0 0 4px; font-size:13px; color:#111827;">
            Regards,
          </p>
          <p style="margin:0; font-size:13px; color:#111827;">
            <strong>National Journalist Association</strong><br/>
            (NJA)
          </p>
        </div>

        <div style="padding:12px 24px; background:#f9fafb; border-top:1px solid #e5e7eb;">
          <p style="margin:0; font-size:11px; color:#9ca3af;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    </div>
  `;

  await sendMail({
    to: member.email,
    subject: "Payment Receipt Received - National Journalist Association",
    html,
  });

  return { success: true };
}

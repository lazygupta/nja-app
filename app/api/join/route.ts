import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/lib/model/Member";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newMember = await Member.create(body);

    return NextResponse.json(
      { success: true, message: "Member Registered", data: newMember },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error", error: err },
      { status: 500 }
    );
  }
}

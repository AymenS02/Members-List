import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

export async function POST(request) {
  try {
    const { firstName, lastName, phone, paymentStatus } = await request.json();

    if (!firstName || !lastName || !phone || !paymentStatus) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const newMember = await Member.create({ firstName, lastName, phone, paymentStatus });
    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

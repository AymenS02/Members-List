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

    // Check if member already exists (based on name + phone)
    const existingMember = await Member.findOne({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "Member already exists in the system." },
        { status: 409 } // Conflict
      );
    }

    const newMember = await Member.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      paymentStatus,
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// --- GET: Fetch all members ---
export async function GET() {
  try {
    await connectDB();
    const members = await Member.find().sort({ createdAt: -1 }); // newest first
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

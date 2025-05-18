import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    console.log("User ID from auth:", userId);

    await connectDB();
    console.log("Connected to DB");

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const role = user.publicMetadata?.role || "user";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        _id: userId,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        imageURL: user.imageUrl,
        role: role
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Synced User:", updatedUser);

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("Error in /api/user/data:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

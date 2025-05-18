import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "You are not authorized to view this" });
        }

        await connectDB();

        const products = await Product.find({ });
        return NextResponse.json({ success: true, products });

    } catch (error) {
        console.error("Error in /api/product/seller-list:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}
        
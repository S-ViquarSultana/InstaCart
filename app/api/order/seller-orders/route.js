import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";



export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        } 

        await connectDB();

        Address.length

        const orders = await Order.find({}).populate("address items.product");

        return NextResponse.json({ success: true, orders });
        
    } catch (error) {

        console.error("Error in /api/order/list:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}
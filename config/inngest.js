import User from "@/models/User";
import { Inngest } from "inngest";
import connectDB from "@/config/db";
import Order from "@/models/Order";             
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "instacart-next" });

// Inngst function to save user data to MongoDB
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
    },
    {  event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = { 
            _id: id, 
            email: email_addresses[0].email_address,
             name: first_name + ' ' + last_name, 
             imageURL: image_url
            };
        // Save userData to MongoDB
        await connectDB();
        await User.create(userData);
    }
);
// Inngest function to update user data in MongoDB
export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    { event: "clerk/user.updated"},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = { 
            _id: id, 
            email: email_addresses[0].email_address,
             name: first_name + ' ' + last_name, 
             imageURL: image_url
            };
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
);

// Inngest function to delete user data from MongoDB
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-with-clerk"
    },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;

        await connectDB();
        await User.findByIdAndDelete(id);
    }   

);
        
// Inngest function to create user order in database
export const createUserOrder = inngest.createFunction(
    {
        id: "create-user-order", 
        batchEvents: {
            maxSize: 25,
            timeout: '5seconds',
        }
    },
    { event: 'order/created' },
    async ({ events }) => {

        const orders = events.map((event) => {
            return {
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
    });

    await connectDB();
    await Order.insertMany(orders);

    return { success: true, processed: orders.length};
}
)
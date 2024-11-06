import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return new Response(
            JSON.stringify({ success: false, message: "Unauthorized" }),
            {
                status: 401,
            }
        );
    }
    const userId = user._id;
    const { acceptingMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptingMessages
    }, {new : true});
        if (!updatedUser) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                {
                    status: 404,
                }
            );
        }
        updatedUser.isAcceptingMessage = true;
        await updatedUser.save();
        return new Response(
            JSON.stringify({ success: true, message: "Message acceptance status updated successfully" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Something went wrong" }),
            {
                status: 500,
            }
        );
    }
}

export async function GET(request: Request){
    const session= await getServerSession(authOptions)
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return new Response(
            JSON.stringify({ success: false, message: "Unauthorized" }),
            {
                status: 401,
            }
        );
    }
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                {
                    status: 404,
                }
            );
        }
        return new Response(
            JSON.stringify({ success: true, user: foundUser }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Something went wrong" }),
            {
                status: 500,
            }
        );
    }
}

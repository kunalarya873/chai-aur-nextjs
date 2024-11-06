import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";


export async function POST(request: Request) {
    await dbConnect();
    const {username, content} = await request.json();
    try {
        const user = await UserModel.findOne({username});
        if (!user) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                {
                    status: 404
                }
            );
        }

        const newmessage = {content, createdAt: new Date()};

        user.message.push(newmessage as Message);
        await user.save();

        return new Response(JSON.stringify(
            {
                success: true,
                message: "Message sent successfully"
            }),
            {
                status: 200
            }
    )
    } catch (error) {
        
    }
}
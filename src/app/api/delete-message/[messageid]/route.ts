import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE(request: Request, {params}: {params: Promise<{messageid: string}>}){
    const {messageid: messageId} = await params
    await dbConnect()
    const session = await auth()

    if(!session || !session.user){
        return Response.json(
            {
                success: false, 
                message: "Not Authenticated"
            },
            {status: 401}
        )
    }

    const user = session.user

    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already delete"
                },
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message Deleted"
            },
            { status: 200}
        )
    } catch (error) {
        console.error("Erro is delete message route", error)
        return Response.json(
            {
                success: false,
                message: "Error deleting message"
            },
            {status: 500}
        )
    }
}
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();
    const userId = user?.id

    if (!user || !userId) return NextResponse.json({message:"User Not Available"}, {status:400});

    try {
        const user_chats = await prisma.user.findUnique({
            where:{
                clerkId:userId
            },
            include:{
                chats: {
                    include: {
                        prompts : {
                            orderBy:{
                                createdAt: "asc"
                            },
                            take: 1
                        }
                    }
                }
            },
        })
        return NextResponse.json({Userchats:user_chats?.chats}, {status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something Went Wrong"}, {status: 400})
    }
}
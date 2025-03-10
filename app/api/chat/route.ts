import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {userId, prompt} = await req.json();
    console.log(userId);
    console.log(prompt);
    
    try {
        const Create_chat = await prisma.chat.create({
            data: {
                userId: userId,
                prompts: {
                    create: {
                        role: prompt.role,
                        content: prompt.content
                    }
                }
            }
        });
        return NextResponse.json({message:"New Chat Created", chatId: Create_chat.id}, {status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something Went Wrong"}, {status: 400})
    }
}


export async function GET(req:NextRequest) {
    const chatId = req.nextUrl.searchParams.get("chatId");
    if(!chatId){
        return NextResponse.json({message: "ChatId is required"}, {status: 400});
    }
    console.log("Gotted ID", chatId);
    
    const chatHistory = await prisma.chat.findFirst({
        where:{
            id: chatId
        },
        include: {
            prompts: true
        }
    });
    return NextResponse.json({chatHistory})
}
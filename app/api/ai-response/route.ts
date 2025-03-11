import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {chatId,role,prompt} = await req.json();
    if(!prompt || !chatId || !role) {
        return NextResponse.json({message:"System/User Prompt is required"}, {status:400});
    }
    try {
        const prompt_data = await prisma.prompt.create({
            data:{
                chatId:chatId,
                role: role,
                content: prompt
            }
        });
        return NextResponse.json({promptid: prompt_data.id}, {status:200});
    } catch (error) {
        return NextResponse.json({error:error}, {status:500});
    }
}
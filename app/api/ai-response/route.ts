import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {prompt} = await req.json();
    if(!prompt) {
        return NextResponse.json({message:"System/User Prompt is required"}, {status:400});
    }
    try {
        // const prompts = await prisma.prompt.create({
        //     data:{

        //     }
        // })
    } catch (error) {
        return NextResponse.json({error:error})
    }
}
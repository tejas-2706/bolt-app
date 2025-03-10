import { chatSession } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {prompt} = await req.json();

    try {
        const result = await chatSession.sendMessage(prompt);
        const AIresponse = result.response.text();

        return NextResponse.json({result:AIresponse})
    } catch (error) {
        return NextResponse.json({error : error})
    }
}
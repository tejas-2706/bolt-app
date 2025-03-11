import { GenAiCode } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {prompt} = await req.json();

    try {
        const result =await GenAiCode.sendMessage(prompt);
        const resp = result.response.text();
        return NextResponse.json(resp);
    } catch (error) {
        console.error("Error in GenAiCode:", error);
        return NextResponse.json({error:error});
    }
}
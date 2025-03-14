import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { chatId , fileData} = await req.json();

    if (!chatId || !fileData) {
        return NextResponse.json({ message: "Chat Id / files are required !!" }, { status: 400 });
    }
    try {
        await prisma.chat.update({
            where:{
                id: chatId
            },
            data:{
                filesData: fileData
            }
        });
        return NextResponse.json({message:"Files for this Chat Updated Successfully !!"}, {status:200})
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


export async function GET(req:NextRequest) {
    const chatId = req.nextUrl.searchParams.get("chatId");
    if(!chatId){
        return NextResponse.json({ message: "Chat Id is required !!" }, { status: 400 });
    }
    try {
        const get_files = await prisma.chat.findFirst({
            where:{
                id: chatId
            },
            select:{
                filesData:true
            }
        });
        return NextResponse.json({filesData: get_files?.filesData}, {status:200});
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
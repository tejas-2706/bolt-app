import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const user = await currentUser();
    const userId = user?.id;
    const {token} = await req.json();
    if(!token) {
        return NextResponse.json({message:"No token"}, {status:400});
    }
    try {
        await prisma.user.update({
            where:{
                clerkId:userId
            },
            data:{
                token:token
            }
        });
        return NextResponse.json({message:"Token Updated Successfully !!"} , {status:200});
    } catch (error) {
        console.error("Error in Token Updation:", error);
        return NextResponse.json({error:error});
    }
};

export async function GET(req:NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) return NextResponse.json({message:"No UserId/token"}, {status:400});

    try {
        const user_token = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                token:true
            }
        });
        return NextResponse.json({user_latest_token: user_token?.token}, {status:200});
    } catch (error) {
        console.error("Error in Getting latest Token:", error);
        return NextResponse.json({error:error});
    }
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
export async function POST() {
    // const {userId} = useAuth(); // From cler i.e ClerkID
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })
        if (!user) {
            const clerkUser = await currentUser();
            const email = clerkUser?.emailAddresses[0]?.emailAddress || "";
            await prisma.user.create({
                data: {
                    clerkId: userId,
                    profileImageUrl: clerkUser?.imageUrl,
                    email: email,
                    firstname: clerkUser?.firstName,
                    lastname: clerkUser?.lastName
                }
            });
        }
        return NextResponse.json({uuid : user?.id})
    }catch(error){
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
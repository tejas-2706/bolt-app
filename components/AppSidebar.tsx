import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import ChatCollection from "./ChatCollection";
import Colors from "@/data/Colors";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function AppSidebar() {
    return (
        <div className="h-full w-64 text-white flex flex-col" style={{ backgroundColor: Colors.BACKGROUND }}>
            {/* Header */}
            <Link href={'/'}>
            <div className='text-black text-2xl font-semibold dark:text-white hover:cursor-pointer p-2 m-4'>
                Bolt
            </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex-1">
                <Link href={'/'}>
                    <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        <MessageCircleCode className="mr-2 h-4 w-4" /> New Chat
                    </Button>
                </Link>
                <div>
                    <ChatCollection />
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
                {/* Add footer content if needed */}
                <UserButton />
            </div>
        </div>
    );
}
import { Button } from "./ui/button";
import { MessageCircleCode, Wallet } from "lucide-react";
import ChatCollection from "./ChatCollection";
import Colors from "@/data/Colors";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { isSignInVisibleAtom } from "@/store/atoms/details";

export function AppSidebar() {
    const router = useRouter();
    const user = useUser();
    const [isSignInVisible, setSignInVisible] = useAtom(isSignInVisibleAtom);
    return (
        <div className="h-full w-64 text-white flex flex-col" style={{ backgroundColor: Colors.BACKGROUND }}>
            {/* Header */}
            <Link href={'/'}>
                <div className='text-black text-2xl font-semibold dark:text-white hover:cursor-pointer p-2 m-4'>
                    Bolt
                </div>
            </Link>

            {/* New Chat btn */}
            <Link href={'/'} className="px-5">
                <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    <MessageCircleCode className="mr-2 h-4 w-4" /> New Chat
                </Button>
            </Link>
            {/* Content */}
            <div className="p-5 flex-1 overflow-y-auto no-scrollbar" style={{
                scrollbarWidth: 'none', // Hides scrollbar in Firefox
                msOverflowStyle: 'none', // Hides scrollbar in IE and Edge
            }}>
                <div>
                    <ChatCollection />
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 p-4 border-t border-gray-800">
                {/* Add footer content if needed */}
                <Button
                    onClick={() => { user.isSignedIn? router.push('/pricing') : setSignInVisible(true)}}
                    className="cursor-pointer"
                ><Wallet /> My Subscription</Button>
                <UserButton />
            </div>
        </div>
    );
}
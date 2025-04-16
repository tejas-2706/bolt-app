import { Button } from "./ui/button";
import { MessageCircleCode, Wallet } from "lucide-react";
import ChatCollection from "./ChatCollection";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { isSignInVisibleAtom } from "@/store/atoms/details";
import Image from "next/image";

export function AppSidebar() {
    const router = useRouter();
    const user = useUser();
    const setSignInVisible = useSetAtom(isSignInVisibleAtom);
    return (
        <div className="h-full w-64 text-white flex flex-col bg-[var(--customapp-background)] dark:bg-[var(--customapp-background)] ">
            {/* Header */}
            <Link href={'/'}>
                <div className='text-black text-xl font-semibold dark:text-white hover:cursor-pointer p-6  bg-gradient-to-b from-[#5a00b2]/50 to-transparent'>
                    <span className='flex justify-center items-center gap-2'>
                        <Image src={'/mythicals-removebg.png'} alt='logo' width={40} height={40} />  𝓜𝔂𝓽𝓱𝓲𝓬𝓪𝓵𝓼.𝓽𝓮𝓬𝓱
                    </span>
                </div>
            </Link>

            {/* New Chat btn */}
            <Link href={'/'} className="px-5">
                <Button className="w-full mb-4 dark:bg-purple-500 dark:hover:bg-purple-600 cursor-pointer"
                onClick={()=>{router.refresh()}}>
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
                    className="cursor-pointer dark:bg-purple-500 dark:hover:bg-purple-600 "
                    onClick={() => user.isSignedIn ? router.push('/pricing') : setSignInVisible(true)}
                ><Wallet /> My Subscription</Button>
                <UserButton />
            </div>
        </div>
    );
}
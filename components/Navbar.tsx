"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from '@clerk/nextjs'
// import Colors from '@/data/Colors'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { useAtom, useSetAtom } from 'jotai'
import { ActionAtom, ActionType, refreshChatsAtom, useridAtom, usertokenAtom } from '@/store/atoms/details'
import { useParams, useRouter } from 'next/navigation'
import { Loader2Icon, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const { isSignedIn, user } = useUser();
    const [UserId, setUserId] = useAtom(useridAtom);
    const [UserToken, setUserToken] = useAtom(usertokenAtom);
    const [Fetchingtoken, setFetchingtoken] = useState(true);
    const router = useRouter();
    const hasFetchedRef = useRef(false);
    const setAction = useSetAtom(ActionAtom);
    const setRefresh = useSetAtom(refreshChatsAtom);
    const params = useParams<{ id: string }>();
    useEffect(() => {
        if (!hasFetchedRef.current && isSignedIn && user) {
            hasFetchedRef.current = true;
            fetch("/api/auth", {
                method: "POST",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("userId from api/auth", data.uuid);
                    setUserId(data.uuid);
                    setUserToken(data.user_token);
                    console.log(data.user_token);
                    setFetchingtoken(false);
                    console.log("IDddddddddd", UserId);
                })
                .catch((error) => console.error(error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn, user])
    return (
        <div className='flex justify-between p-6 bg-gradient-to-b from-[#5a00b2]/50 to-transparent'>
            <div className='flex justify-center items-center gap-8'>
                <div className='text-black text-xl font-bold dark:text-white hover:cursor-pointer'
                    onClick={() => { router.push('/'); setRefresh((prev) => prev + 1) }}>
                    <span className='flex justify-center items-center gap-2'>
                        {/* Script Bold Italic Font   𝓜𝔂𝓽𝓱𝓲𝓬𝓪𝓵𝓼.𝓽𝓮𝓬𝓱  */}
                        <Image src={'/mythicals-removebg.png'} alt='logo' width={40} height={40} />
                        <span className='hidden sm:block'>mythicals.tech</span>
                    </span>
                </div>
                <div className='text-sm font-semi-bold cursor-pointer hidden sm:block'>
                    <Link href={'/support'}>Support</Link>
                </div>
                <div className='text-sm font-semi-bold cursor-pointer hidden sm:block'>
                    {isSignedIn && <Link href={'/pricing'}>My Subscription</Link>}
                </div>
            </div>
            {/* <div className='sm:hidden'
                onClick={() => { router.push('/') }}>
                <Image src={'/mythicals.jpg'} alt='logo' width={40} height={40} />
            </div> */}
            {/* other side */}
            <div className='flex gap-2 justify-center items-center'>
                <div className='flex gap-2'>
                    {/* <Button variant={"outline"}>{UserId ? UserId : "Loading ID..."}</Button> */}
                    {isSignedIn && params.id && <Button onClick={() => {
                        setAction({
                            actionType: ActionType.export,
                            timestamp: Date.now()
                        })
                    }}
                        className='cursor-pointer'
                    >Export</Button>}
                    {/* {isSignedIn && params.id &&<Button onClick={()=>{setAction({
                        actionType:ActionType.deploy,
                        timestamp:Date.COdeviewnow()
                    })}}
                    className='cursor-pointer'
                    >Deploy</Button>} */}

                    {/* sudssssss */}

                    {/* {isSignedIn && <Button variant={"ghost"}
                        onClick={() => { router.push('/pricing') }}
                        className='dark:hover:bg-white dark:hover:text-black dark:shadow-white shadow-xs hover:bg-black hover:text-white cursor-pointer hidden sm:block'
                    >
                        <div className='sm:hidden'><Wallet2Icon /></div>
                        <div className='hidden sm:block'>My Subscription</div>
                    </Button>} */}
                    {isSignedIn && <Button variant={"link"} className='hidden sm:block' >{Fetchingtoken ? <Loader2Icon className='animate-spin' /> : UserToken}</Button>}
                </div>
                <div className='px-2'>
                    <SignedOut>
                        <div className='hidden sm:block'>
                            <SignInButton><Button variant={"outline"} size={"sm"} className='hover:cursor-pointer mx-2'>Sign in</Button></SignInButton>
                            <SignUpButton><Button variant={"default"} size={"sm"} className='hover:cursor-pointer '>Sign up</Button></SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className='hidden sm:block pt-1'>
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>
                <div className='hidden sm:block'>
                    <ModeToggle />
                </div>
            </div>
            <div className='flex sm:hidden justify-center items-center gap-4'>
                <SignedIn>
                    <div className='sm:hidden pt-1'>
                        <UserButton />
                    </div>
                </SignedIn>
                <DropdownMenu>
                    <DropdownMenuTrigger><Menu size={30} /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <SignedOut>
                                <div className='flex gap-4'>
                                    <SignInButton><Button variant={"outline"} size={"sm"} className='hover:cursor-pointer '>Sign in</Button></SignInButton>
                                    <SignUpButton><Button variant={"default"} size={"sm"} className='hover:cursor-pointer '>Sign up</Button></SignUpButton>
                                </div>
                            </SignedOut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild >
                            <Link href={'/pricing'} className="w-full px-2 py-1 hover:underline">My Subscription</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={'/support'} className="w-full px-2 py-1 hover:underline">Support</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            {isSignedIn && <Button variant={"link"}>
                                {Fetchingtoken ? <Loader2Icon className='animate-spin' /> : UserToken}
                            </Button>}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <ModeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar
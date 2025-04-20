"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    SignInButton,
    SignOutButton,
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
import { Atom, Coins, CreditCard, Loader2Icon, LogOut, Menu, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'

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
                    {isSignedIn && <Button variant={"link"} className='hidden sm:block cursor-pointer' title='tokens left' >
                        {Fetchingtoken ? <Loader2Icon className='animate-spin' /> : UserToken}
                    </Button>}
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


                            <DropdownMenu>
                                <DropdownMenuTrigger className='outline-none'><UserButton /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel asChild
                                        className='py-2 p-0'
                                    >
                                        {isSignedIn && <Button variant={"ghost"}>
                                            <div className='flex gap-2'>
                                                <Image src={user.imageUrl} alt='profile image' width={35} height={2} className='rounded-full' />
                                                <div className='flex flex-col justify-center items-start '>
                                                    <h2>{user.firstName} {user.lastName}</h2>
                                                    <h2>{user.emailAddresses[0]?.emailAddress}</h2>
                                                </div>
                                            </div>
                                        </Button>}
                                    </DropdownMenuLabel>
                                    {isSignedIn ? <DropdownMenuSeparator /> : null}
                                    <DropdownMenuItem asChild
                                        className='px-4'
                                    >
                                        {isSignedIn ?
                                            <Link href={'/user'} className="w-full px-2 py-1 hover:underline hover:cursor-pointer"><Settings className='mr-1' /> Manage Account</Link> : null
                                        }
                                    </DropdownMenuItem>
                                    {isSignedIn ? <DropdownMenuSeparator /> : null}
                                    <DropdownMenuItem asChild
                                        className='px-4'
                                    >
                                        {isSignedIn &&
                                            <SignOutButton>
                                                <span>
                                                    <LogOut className='mr-1' />
                                                    <Button variant={"destructive"} size={"sm"} className='hover:cursor-pointer px-8'>Sign out</Button>
                                                </span>
                                            </SignOutButton>
                                        }
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </div>
                    </SignedIn>
                </div>
                <div className='hidden sm:block'>
                    <ModeToggle />
                </div>
            </div>
            <div className='flex sm:hidden justify-center items-center gap-4'>
                {/* <SignedIn>
                    <div className='sm:hidden pt-1'>
                        {isSignedIn && <Image src={user.imageUrl} alt='profile image' width={35} height={2} className='rounded-full' />}
                    </div>
                </SignedIn> */}
                <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'><Menu size={30} className='cursor-pointer' /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel asChild
                            className='py-2 p-0'
                        >
                            {isSignedIn && <Button variant={"ghost"}>
                                <div className='flex gap-2'>
                                    <Image src={user.imageUrl} alt='profile image' width={35} height={2} className='rounded-full' />
                                    <div className='flex flex-col justify-center items-start '>
                                        <h2>{user.firstName} {user.lastName}</h2>
                                        <h2>{user.emailAddresses[0]?.emailAddress}</h2>
                                    </div>
                                </div>
                            </Button>}
                        </DropdownMenuLabel>
                        {isSignedIn ? <DropdownMenuSeparator /> : null}
                        <DropdownMenuItem asChild>
                            <SignedOut>
                                <div className='flex gap-4'>
                                    <SignInButton><Button variant={"outline"} size={"sm"} className='hover:cursor-pointer '>Sign in</Button></SignInButton>
                                    <SignUpButton><Button variant={"default"} size={"sm"} className='hover:cursor-pointer '>Sign up</Button></SignUpButton>
                                </div>
                            </SignedOut>
                        </DropdownMenuItem>
                        {!isSignedIn ? <DropdownMenuSeparator /> : null}
                        <DropdownMenuItem asChild >
                            <Link href={'/pricing'} className="w-full px-2 py-1 hover:underline hover:cursor-pointer"><CreditCard /> My Subscription</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={'/support'} className="w-full px-2 py-1 hover:underline hover:cursor-pointer"><Atom /> Support</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            {isSignedIn && <Button variant={"link"} size={"sm"} className='w-full justify-start'>
                                <Coins /> {Fetchingtoken ? <Loader2Icon className='animate-spin' /> : <div>{UserToken} <span className='text-gray-400 text-xs'>tokens left</span></div>}
                            </Button>}
                        </DropdownMenuItem>
                        {isSignedIn ? <DropdownMenuSeparator /> : null}
                        <DropdownMenuItem asChild >
                            {isSignedIn ?
                                <Link href={'/user'} className="w-full px-2 py-1 hover:underline hover:cursor-pointer"><Settings className='mr-1' /> Manage Account</Link> : null
                            }
                        </DropdownMenuItem>
                        {isSignedIn ? <DropdownMenuSeparator /> : null}
                        <DropdownMenuItem asChild >
                            {isSignedIn ?
                                <span className='flex gap-4 focus:bg-transparent'>
                                    <SignOutButton>
                                        <span className='flex justify-center items-center gap-2'>
                                            <LogOut className='mr-1' />
                                            <Button variant={"destructive"} size={"sm"} className='hover:cursor-pointer px-8'>Sign out</Button>
                                        </span>
                                    </SignOutButton>
                                    <ModeToggle />
                                </span>
                                : <ModeToggle />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar
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
import Colors from '@/data/Colors'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { useAtom, useSetAtom } from 'jotai'
import { ActionAtom, ActionType, refreshChatsAtom, useridAtom, usertokenAtom } from '@/store/atoms/details'
import { useParams, useRouter } from 'next/navigation'
import { Loader2Icon, Wallet2Icon } from 'lucide-react'
import Image from 'next/image'
const Navbar = () => {
    const { isSignedIn, user } = useUser();
    const [UserId, setUserId] = useAtom(useridAtom);
    const [UserToken, setUserToken] = useAtom(usertokenAtom);
    const [Fetchingtoken, setFetchingtoken] = useState(true);
    const router = useRouter();
    const hasFetchedRef = useRef(false);
    const setAction = useSetAtom(ActionAtom);
    const setRefresh = useSetAtom(refreshChatsAtom);
    const params = useParams<{id:string}>();
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
        <div className='flex justify-between p-6'>
            <div className='text-black text-xl font-bold dark:text-white hover:cursor-pointer hidden sm:block'
                onClick={() => { router.push('/'); setRefresh((prev)=>prev+1) }}>
                    <span className='flex justify-center items-center gap-2'>
                <Image src={'/mythicals-removebg.png'} alt='logo' width={40} height={40}/>  Mythicals.tech
                    </span>
            </div>
            <div className='sm:hidden'
            onClick={() => { router.push('/') }}>
                <Image src={'/mythicals.jpg'} alt='logo' width={40} height={40}/>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <div className='flex gap-2'>
                    {/* <Button variant={"outline"}>{UserId ? UserId : "Loading ID..."}</Button> */}
                    {isSignedIn && params.id && <Button onClick={()=>{setAction({
                        actionType:ActionType.export,
                        timestamp:Date.now()
                    })}}
                    className='cursor-pointer'
                    >Export</Button>}
                    {/* {isSignedIn && params.id &&<Button onClick={()=>{setAction({
                        actionType:ActionType.deploy,
                        timestamp:Date.COdeviewnow()
                    })}}
                    className='cursor-pointer'
                    >Deploy</Button>} */}
                    {isSignedIn&& <Button variant={"outline"} 
                    onClick={()=>{router.push('/pricing')}}
                    className='dark:hover:bg-white dark:hover:text-black dark:shadow-white shadow-xs hover:bg-black hover:text-white cursor-pointer'
                    ><div className='sm:hidden'><Wallet2Icon/></div>
                    <div className='hidden sm:block'>My Subscription</div>
                    </Button>}
                    {isSignedIn&&<Button variant={"ghost"}>{Fetchingtoken? <Loader2Icon className='animate-spin'/> : UserToken}</Button>}
                </div>
                <div className='px-2'>
                    <SignedOut>
                        <div className='flex gap-4'>
                            <SignInButton><Button variant={"outline"} className='hover:cursor-pointer'>SignIn</Button></SignInButton>
                            <SignUpButton><Button style={{ backgroundColor: Colors.BLUE }} className='hover:cursor-pointer'>SignUp</Button></SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Navbar
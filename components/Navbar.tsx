"use client"
import React, { useEffect, useState } from 'react'
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
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useridAtom } from '@/store/atoms/details'
const Navbar = () => {
    const {isSignedIn , user} = useUser();
    const setUserId = useSetAtom(useridAtom);
    useEffect(()=>{
        if (isSignedIn && user){
            fetch("/api/auth", {
                method: "POST",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("userId", data.uuid);   
                setUserId(data.uuid);
            })
            .catch((error) => console.error(error));
        }
    },[isSignedIn,user])
    return (
        <div className='flex justify-between p-6'>
            <div className='text-black text-2xl font-semibold dark:text-white'>
                bolt
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <div className='px-2'>
                <SignedOut>
                    <div className='flex gap-4'>
                    <SignInButton><Button variant={"outline"} className='hover:cursor-pointer'>SignIn</Button></SignInButton>
                    <SignUpButton><Button style={{backgroundColor:Colors.BLUE}} className='hover:cursor-pointer'>SignUp</Button></SignUpButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                </div>
                <div>
                    <ModeToggle/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
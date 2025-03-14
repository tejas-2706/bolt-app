import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Lookup from '@/data/Lookup'
  
interface isSignedInType {
  isSignInVisible:boolean;
  setSignInVisible:(value:boolean) => void;
}
function AuthPopUp({isSignInVisible, setSignInVisible} : isSignedInType) {
  return (
    <Dialog open={isSignInVisible} onOpenChange={()=>{setSignInVisible(false)}}>
  <DialogContent> 
    <DialogHeader >
      <DialogTitle className='text-xl font-bold'>{Lookup.SIGNIN_HEADING}</DialogTitle>
      <DialogDescription className='flex-col gap-4'>
        <span className='pb-4'>{Lookup.SIGNIN_SUBHEADING}</span>
        <span className='flex gap-4 justify-center items-center'>
        <SignInButton><Button className='hover:cursor-pointer mt-8 px-8' >SignIn</Button></SignInButton>
        <SignUpButton><Button className='hover:cursor-pointer mt-8 px-8'>Signup</Button></SignUpButton>
        </span>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default AuthPopUp
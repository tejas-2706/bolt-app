import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Lookup from '@/data/Lookup'
  
function AuthPopUp({isSignInVisible, setSignInVisible}: any) {
  return (
    <Dialog open={isSignInVisible} onOpenChange={()=>{setSignInVisible(false)}}>
  <DialogContent> 
    <DialogHeader >
      <DialogTitle>{Lookup.SIGNIN_HEADING}</DialogTitle>
      <DialogDescription className='flex-col gap-4'>
        <div className='pb-4'>{Lookup.SIGNIN_SUBHEADING}</div>
        <div className='flex gap-4'>
        <SignInButton><Button className='hover:cursor-pointer' >SignIn</Button></SignInButton>
        <SignUpButton><Button className='hover:cursor-pointer'>Signup</Button></SignUpButton>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default AuthPopUp
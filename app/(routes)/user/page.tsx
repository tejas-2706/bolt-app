'use client'
import { UserProfile, useUser } from '@clerk/nextjs'
import React from 'react'

function User() {
    const { isSignedIn } = useUser();
  return (
    <div className='flex justify-center'>
        {isSignedIn ?
        <UserProfile
        routing='hash'
          appearance={{
            elements: {
              card: 'shadow-none ',
            },
          }}
        /> 
        : <div>
            Login to view your Details
        </div>
        }
    </div>
  )
}

export default User

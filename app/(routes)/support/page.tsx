import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Support() {
    return (
        <div className='flex flex-col w-full items-center p-10 md:px-32 lg:px-48'>
            <h2 className='font-bold text-5xl pb-5'>Help & Support</h2>
            <h2 className='text-gray-400'>Build in Progress</h2>
            <h2 className='text-gray-400 max-w-xl text-center pt-2'>For Any Queries/Pricing Discussion/Enterprise Pack Contact Us at -</h2>
            <span className='flex gap-2 p-2'>
                <Mail />
                <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=pangaonkar.tejas@gmail.com" className="hover:underline">
                    pangaonkar.tejas@gmail.com
                </Link>
            </span>
        </div>
    )
}

export default Support




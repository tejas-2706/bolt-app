"use client"
import PricingModel from '@/components/PricingModel';
import Lookup from '@/data/Lookup'
import { usertokenAtom } from '@/store/atoms/details';
import { useAtomValue } from 'jotai';
import React from 'react'

function Pricing() {
  const Usertokens = useAtomValue(usertokenAtom);
  return (
    <div className=' flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
      <h2 className='font-bold text-5xl pb-5'>Pricing</h2>
      <p className='text-gray-400 max-w-xl text-center'>{Lookup.PRICING_DESC}</p>
      <div className='p-5 border rounded-xl flex w-full justify-between mt-7 items-center dark:#151515'>
        <h2 className='text-lg'><span className='font-bold'>{Usertokens} Tokens Left</span></h2>
        <div>
          <h2>Need More Tokens !!</h2>
          <h2>Upgrade to a New Plan Now!!</h2>
        </div>
      </div>
      <PricingModel/>
    </div>
  )
}

export default Pricing
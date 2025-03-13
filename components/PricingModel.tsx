import Lookup from '@/data/Lookup'
import React, { use, useState } from 'react'
import { Button } from './ui/button'
import Colors from '@/data/Colors'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useUser } from '@clerk/nextjs'
import { useAtomValue } from 'jotai'
import { usertokenAtom } from '@/store/atoms/details'
import axios from 'axios'
import { toast } from 'sonner'

interface pricing {
    name: string;
    tokens: string;
    value: number;
    desc: string;
    price: string;
}

function PricingModel() {
    const user = useUser();
    const usertokens = useAtomValue(usertokenAtom);
    const [selectedOption, setSelectedOption] = useState<pricing>();
    const onPaymentSucces = async() => {
        const token = usertokens + Number(selectedOption?.value);
        console.log(token);
        // DB Call 
        await axios.post('/api/user-tokens', {
            token: token
        });
    }

    const onPaymentFailure = async() => {
        toast.error("Payment Failed !! Try Again", {
            description:"Please try Again !"
        });
    }
    
    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {Lookup.PRICING_OPTIONS.map((pricing:pricing, index) => (
                <div key={index} className='border p-4 flex flex-col items-center rounded-xl' style={{backgroundColor: Colors.BACKGROUND }}>
                    <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                    <h2 className='font-medium text-lg p-2'>{pricing.tokens} tokens</h2>
                    <h2 className='text-gray-400 font-light text-center'>{pricing.desc}</h2>
                    <h2 className='mt-10' >
                        <span className='p-1'>$</span>
                        <span className='text-3xl'>{pricing.price}</span>
                        <span className=''> / month</span>
                    </h2>
                    <h2 className='text-gray-400 p-2'>Billed Monthly</h2>
                    {/* <Button className='my-10 px-10 cursor-pointer'>Upgrade to Pro</Button> */}
                    <PayPalButtons className='mt-10'
                        onClick={()=>{setSelectedOption(pricing); console.log(pricing.value);}}
                        style={{ layout: "horizontal" }}
                        disabled={!user.isSignedIn || !user}
                        onApprove={() => onPaymentSucces()}
                        onCancel={() => onPaymentFailure()}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            value: pricing.price,
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default PricingModel
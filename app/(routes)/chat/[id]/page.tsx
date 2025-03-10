"use client"
import { PromptAtom } from "@/store/atoms/details"
import { useAtom } from "jotai"
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function() {
    const params = useParams<{ tag: string; id: string }>()
 
    // Route -> /shop/[tag]/[item]
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
    console.log("paramssssssssss", params.id)
    // useEffect(()=>{

    // },[])
    const [promptValues] = useAtom(PromptAtom);
    return (
        <div>
            {promptValues.map((value,index) => {
                return (
                    <div key={index}>
                        {value.role}
                        {value.content}
                    </div>
                )
            })}
            {JSON.stringify(params.id)}
        </div>
    )
}
"use client"
import { PromptAtom } from "@/store/atoms/details"
import { useAtom } from "jotai"
import { useEffect } from "react";

export default function() {
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
        </div>
    )
}
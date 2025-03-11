"use client"
import { Textarea } from "@/components/ui/textarea"
import { PromptAtom, Role, textvalueAtom, useridAtom } from "@/store/atoms/details";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios"
import ChatHistory from "./ChatHistory";
import Prompt from "@/data/Prompt";
import { useParams } from "next/navigation";

export function ChatSidebar() {
    const [textvalue, setTextvalue] = useAtom(textvalueAtom);
    const [Promptvalue,setPromptvalue] = useAtom(PromptAtom);
    const params = useParams<{ tag: string; id: string }>();
    const [isloading, setIsloading] = useState(false);
    const newPrompt = {
        role: Role.user,
        content: textvalue
    };
    const PromptHandler = async () => {
        setPromptvalue((prevprompt) => [...prevprompt, {
            role: Role.user,
            content: textvalue
        }])
        // DB add of User prompt 
        const user_prompt_db_add = await axios.post('/api/ai-response', {
            chatId: params.id,
            role: Role.user,
            prompt: textvalue
        });
        console.log("Prompt Id of User Message = ", user_prompt_db_add.data.promptid);
    }
    const GetAIResponse = async () => {
        setIsloading(true);
        const PROMPT = JSON.stringify(Promptvalue)+Prompt.CHAT_PROMPT;
        const result = await axios.post('/api/ai-chat', {
            prompt: PROMPT
        });
        setPromptvalue(prev => [...prev, {
            role: Role.system,
            content: result.data.result
        }])
        // DB add of AI prompt 
        // AI_SYSTEM PROMPT API CALL UPDATE
        setIsloading(false);
        const ai_prompt_db_add = await axios.post('/api/ai-response', {
            chatId: params.id,
            role: Role.system,
            prompt: result.data.result
        });
        console.log("Ai Response = ", result.data.result);
        console.log("Prompt Id of System Message = ", ai_prompt_db_add.data.promptid);
        
    }
    useEffect(() => {
      if(Promptvalue?.length > 0){
        const role = Promptvalue[Promptvalue?.length - 1].role;
        if(role == 'user'){
            GetAIResponse();
        }
      }
    }, [Promptvalue])
    
    return (
        <>
        <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto no-scrollbar" style={{
          scrollbarWidth: 'none', // Hides scrollbar in Firefox
          msOverflowStyle: 'none', // Hides scrollbar in IE and Edge
        }}>
                <ChatHistory isloading={isloading}/>
            </div>
            <div className="flex w-full gap-2 justify-end mt-auto pb-4">
                <div className="w-full">
                    <Textarea className="h-[120px]" placeholder="How can we help you ?" id="message"
                        onChange={(e) => { setTextvalue(e.target.value) }}
                        />
                </div>
                <div className="flex items-center">
                    <Button className={`hover:cursor-pointer ${!textvalue ? 'hidden' : ''}`}
                        onClick={() => PromptHandler()}
                        ><ArrowRight /></Button>
                </div>
            </div>
        </div>
        </>
    )
}

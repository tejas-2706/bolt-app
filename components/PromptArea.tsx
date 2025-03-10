"use client"
import { Textarea } from "@/components/ui/textarea"
import { PromptAtom, Role, useridAtom } from "@/store/atoms/details";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Divide } from "lucide-react";
import axios from "axios"
import Lookup from "@/data/Lookup";
import { useRouter } from "next/navigation";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import AuthPopUp from "./AuthPopUp";

export function PromptArea() {
  const userId = useAtomValue(useridAtom);
  const [textvalue, setTextvalue] = useState("");
  const setPromptvalue = useSetAtom(PromptAtom);
  const router = useRouter();
  const user = useUser()
  const newPrompt = {
    role: Role.user,
    content: textvalue
  };
  const [isSignInVisible, setSignInVisible] = useState(false);
  const PromptHandler = async() => {
    if (!userId && !user.isSignedIn){
      toast.warning("Please Login!!", {
        description: "Login to use the App",
        action: {
          label: "Login",
          onClick: () => {setSignInVisible(true)}
        }
      })
    }
    setPromptvalue((prevprompt) => [...prevprompt, {
      role: Role.user,
      content: textvalue
    }])
    if(userId && user.isSignedIn) {
      const response = await axios.post("/api/chat", {
        userId: userId,
        prompt: newPrompt
      });
      const Chat_id = await response.data.chatId;
      console.log(Chat_id);
      router.push(`chat/${Chat_id}`)
    }
  }
  return (
    <div>
        {isSignInVisible ? (
        <div>
          <AuthPopUp isSignInVisible={isSignInVisible} setSignInVisible={setSignInVisible}/>
        </div>
      ):
  <div className="flex w-[500px] gap-2">
      <div className="w-full">
        <h2 className="text-4xl pb-6">{Lookup.HERO_HEADING}</h2>
        <label className="text-black dark:text-gray-400" htmlFor="">{Lookup.HERO_DESC}</label>
        <Textarea className="h-[120px]" placeholder="Type your prompt here." id="message"
          onChange={(e) => { setTextvalue(e.target.value) }}
        />
      </div>
      <div className="flex items-center">
      <Button className={`hover:cursor-pointer ${!textvalue? 'hidden': ''}`} 
      onClick={()=>PromptHandler()}
      ><ArrowRight/></Button>
      </div>
    </div>}
    </div>
  )
}

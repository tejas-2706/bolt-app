"use client"
import { Textarea } from "@/components/ui/textarea"
import { isSignInVisibleAtom, PromptAtom, Role, textvalueAtom, useridAtom, usertokenAtom } from "@/store/atoms/details";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios"
import Lookup from "@/data/Lookup";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import AuthPopUp from "./AuthPopUp";

export function PromptArea() {
  const userId = useAtomValue(useridAtom);
  const [textvalue, setTextvalue] = useAtom(textvalueAtom);
  const setPromptvalue = useSetAtom(PromptAtom);
  const router = useRouter();
  const user = useUser()
  const setUserToken = useSetAtom(usertokenAtom);
  const user_token = useAtomValue(usertokenAtom);
  const [isDisable, setIsDisable] = useState(false);
  const newPrompt = {
    role: Role.user,
    content: textvalue
  };
  // const [isSignInVisible, setSignInVisible] = useState(false);
  const [isSignInVisible, setSignInVisible] = useAtom(isSignInVisibleAtom);
  const PromptHandler = async () => {
    if (!userId && !user.isSignedIn) {
      setSignInVisible(true);
      toast.warning("Please Login!!", {
        description: "Login to use the App",
        closeButton: true,
        action: {
          label: "Login",
          onClick: () => { setSignInVisible(true)}
        }
      });
    }
    if (Number(user_token) < 10 && user.isSignedIn) {
      toast.warning("Insufficient Token", {
        description: "Please Purchase Some Tokens to continue !!",
        closeButton: true,
        action: {
          label: "Buy Token",
          onClick: () => { router.push('/pricing') }
        }
      });
      return;
    }
    setIsDisable(true);
    setPromptvalue((prevprompt) => [...prevprompt, {
      role: Role.user,
      content: textvalue
    }])
    if (userId && user.isSignedIn) {
      const response = await axios.post("/api/chat", {
        userId: userId,
        prompt: newPrompt
      });
      const Chat_id = await response.data.chatId;
      console.log(Chat_id);
      setTextvalue('');
      router.push(`chat/${Chat_id}`)
    }
    setIsDisable(false);
  }

  const GetUserTokenDetails = async () => {
    const response = await axios.get(`/api/user-tokens?userId=${userId}`);
    const user_token = response.data.user_latest_token;
    setUserToken(Number(user_token));
  }

  useEffect(() => {
    if (userId) {
      GetUserTokenDetails();
    }
    // userId&&GetUserTokenDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isSignInVisible ? (
        <div>
          <AuthPopUp isSignInVisible={isSignInVisible} setSignInVisible={setSignInVisible} />
        </div>
      ) :
        <div className="flex sm:w-[530px] gap-2 px-4 my-40">
          <div className="w-full">
            <h2 className="text-4xl pb-4">{Lookup.HERO_HEADING}</h2>
            <h2 className="text-black dark:text-gray-400 pb-4">{Lookup.HERO_DESC}</h2>
            {/* <div className="h-[123px] animate-rotate-border bg-purple-500 shadow-lg rounded-lg bg-conic/[from_var(--border-angle)] from-black via-purple-500 to-black p-px"> */}
            <div
              className="h-[123px] animate-rotate-border shadow-lg rounded-lg p-px"
              style={{
                background: `conic-gradient(from var(--border-angle) at 50% 50%, black, #5a00b2, black)`
              }}
            >
              <Textarea className="h-[120px] dark:bg-neutral-900 bg-gray-100 rounded-lg border border-transparent focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none" placeholder="Type your prompt here." id="message"
                value={textvalue}
                onChange={(e) => { setTextvalue(e.target.value) }}
              />
            </div>
          </div>
          <div className="flex items-center sm:mt-2 mt-16">
            <Button className={`hover:cursor-pointer ${!textvalue ? 'hidden' : ''}`}
              disabled={isDisable}
              onClick={() => PromptHandler()}
            ><ArrowRight />
            </Button>
          </div>
        </div>}
    </div>
  )
}

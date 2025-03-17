"use client"
import Colors from '@/data/Colors';
import { PromptAtom } from '@/store/atoms/details';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface PromptType {
  role: string,
  content: string
}

function ChatHistory({ isloading }: { isloading: boolean }) {
  const params = useParams<{ tag: string; id: string }>();
  const user = useUser();
  const [promptvalue, setPromptvalue] = useAtom(PromptAtom);
  async function getChatHistory() {
    const response = await axios.get(`/api/chat?chatId=${params.id}`)
    setPromptvalue((prevprompt) => {
      // Extract all prompts from chatHistory and add them to the existing state
      const newPrompts = response.data.chatHistory.prompts.map((prompt: PromptType) => ({
        role: prompt.role,
        content: prompt.content
      }))

      // Return the updated state with the previous prompts and new prompts
      return [...prevprompt, ...newPrompts];
    });
  }
  useEffect(() => {
    getChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='sm:h-[70vh] h-[60vh]'>
      {promptvalue.map((value, index) => {
        return (
          <div key={index} className='flex p-2 leading-7' >
            {isloading ? <div className='flex hover:cursor-pointer rounded-2xl p-4 w-full gap-2 items-center' style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
              <Loader2Icon className='animate-spin' />
              <h2>Generating Your Resonse ...</h2>
            </div>
              :
              <div
                className="flex items-start gap-2 p-2 rounded-2xl bg-white dark:bg-[#272727] border shadow-lg"
              >
                <div className="shrink-0 pt-1">
                  {value.role === "user" && user.user?.imageUrl ? (
                    <Image
                      src={user.user.imageUrl}
                      alt="user"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/mythicals.jpg"
                      alt="assistant"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 leading-7">
                  <ReactMarkdown>{value.content}</ReactMarkdown>
                </div>
              </div>

            }
          </div>
        )
      })}
    </div>
  )
}

export default ChatHistory
"use client"
import Colors from '@/data/Colors';
import { PromptAtom, Role } from '@/store/atoms/details';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

function ChatHistory({isloading}:{isloading:boolean}) {
  const params = useParams<{ tag: string; id: string }>();
  const user = useUser();
  const [promptvalue, setPromptvalue] = useAtom(PromptAtom);
  async function getChatHistory() {
    const response = await axios.get(`/api/chat?chatId=${params.id}`)
    setPromptvalue((prevprompt) => {
      // Extract all prompts from chatHistory and add them to the existing state
      const newPrompts = response.data.chatHistory.prompts.map((prompt: any) => ({
        role: prompt.role,
        content: prompt.content
      }))

      // Return the updated state with the previous prompts and new prompts
      return [...prevprompt, ...newPrompts];
    });
  }
  useEffect(() => {
    getChatHistory();
  }, [])
  return (
    <div className='h-[70vh] '>
      {promptvalue.map((value, index) => {
        return (
          <div key={index} className='flex p-2 leading-7' >
            {isloading? <div className='flex hover:cursor-pointer rounded-2xl p-4 w-full gap-2 items-center' style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
              <Loader2Icon className='animate-spin'/>
              <h2>Generating Your Resonse ...</h2>
            </div> 
            :
            <div className='flex hover:cursor-pointer rounded-2xl p-1' style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
            <div className='p-2'> {value.role === "user" && user.user?.imageUrl ? <Image src={user.user?.imageUrl} alt='value.role' width={20} height={20} className='rounded-full' /> :
              <Image src={'/ai.jpeg'} alt='value.role' width={60} height={60} className='rounded-full' />
            }</div>
            <h2 className='flex flex-col'>
            <ReactMarkdown>{value.content}</ReactMarkdown>
            </h2>
          </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default ChatHistory
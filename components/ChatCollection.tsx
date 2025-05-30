import { refreshChatsAtom } from '@/store/atoms/details';
import { useUser } from '@clerk/nextjs';
import axios from 'axios'
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Chat {
    id: string; // Assuming chat IDs are strings (common in Next.js routing)
    prompts: { content: string }[]; // Array of prompt objects with a content field
  }

function ChatCollection() {
    const [ChatList, setChatList] = useState<Chat[] | undefined>();
    const user = useUser();
    const [refreshTrigger] = useAtom(refreshChatsAtom);
    // const {toggleSidebar} = useSidebar();
    const GetAllUserChats = async () => {
        const response = await axios.get('/api/users-chat');
        const user_chats = response.data.Userchats;
        console.log("SBbb Users ka chat hai", user_chats);
        setChatList(user_chats)
    }
    useEffect(() => {
        if (user.isSignedIn) {
            GetAllUserChats();
          }
    }, [user.isSignedIn,refreshTrigger]);
    return (
        <div className=''>
            <h2 className='text-xl font-medium text-black dark:text-white'>Your Chats</h2>
            <div className=''>
                {ChatList ? (
                    ChatList.map((chat: Chat) => (
                        <Link href={`/chat/${chat.id}`} key={chat.id}>
                            <div>
                                {chat.prompts.length > 0 ? (
                                    <p
                                        className='text-black dark:text-gray-400 my-4 hover:text-gray-500 dark:hover:text-white cursor-pointer'
                                        // style={{backgroundColor:Colors.CHAT_BACKGROUND}}
                                        >
                                        {chat.prompts[0].content}
                                    </p>
                                ) : (
                                    <p>No Prompts</p>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className='text-black dark:text-white'>NO Chats</p>
                )}
            </div>
        </div>
    )
}

export default ChatCollection
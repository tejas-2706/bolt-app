import { useUser } from '@clerk/nextjs';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function ChatCollection() {
    const [ChatList, setChatList] = useState<any>();
    const user = useUser();
    // const {toggleSidebar} = useSidebar();
    const GetAllUserChats = async () => {
        const response = await axios.get('/api/users-chat');
        const user_chats = response.data.Userchats;
        console.log("SBbb Users ka chat hai", user_chats);
        setChatList(user_chats)
    }
    useEffect(() => {
        user && GetAllUserChats();
    }, [])
    return (
        <div>
            <h2 className='text-xl font-medium'>Your Chats</h2>
            <div>
                {ChatList ? (
                    ChatList.map((chat: any) => (
                        <Link href={`/chat/${chat.id}`} key={chat.id}>
                            <div>
                                {chat.prompts.length > 0 ? (
                                    <p
                                        className='text-gray-400 my-4 hover:text-white cursor-pointer'
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
                    <p>NO Chats</p>
                )}
            </div>
        </div>
    )
}

export default ChatCollection
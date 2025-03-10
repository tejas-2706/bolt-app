import { ChatSidebar } from "@/components/ChatSidebar";

export default function() {
    // useEffect(()=>{

    // },[])
    return (
        <div className="flex h-[88vh] overflow-hidden">
            <div className="w-[30%] h-full">
            <ChatSidebar/>
            </div>
            <div className="flex-1">
hello
            </div>
        </div>
    )
}
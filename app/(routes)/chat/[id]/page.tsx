import { ChatSidebar } from "@/components/ChatSidebar";
import CodeView from "@/components/CodeView";

export default function() {
    // useEffect(()=>{

    // },[])
    return (
        <div className="flex h-[88vh] overflow-hidden">
            <div className="w-[30%] h-full">
            <ChatSidebar/>
            </div>
            <div className="flex-1">
                <CodeView/>
            </div>
        </div>
    )
}
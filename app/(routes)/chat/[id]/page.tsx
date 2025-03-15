import { ChatSidebar } from "@/components/ChatSidebar";
import CodeView from "@/components/CodeView";

export default function Chat() {
    return (
        <div className="sm:flex sm:h-[88vh] overflow-hidden">
            <div className="sm:w-[30%] h-full">
                <ChatSidebar />
            </div>
            <div className="flex-1">
                <CodeView />
            </div>
        </div>
    )
}
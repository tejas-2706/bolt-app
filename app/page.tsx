import { PromptArea } from "@/components/PromptArea";
import { PanelRightOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center max-h-screen ">
      <div className="flex justify-start w-full px-4 hover:cursor-pointer" title="Previous Chats">
        <PanelRightOpen size={24} className='text-gray-400 ' />
      </div>
      <PromptArea />
    </div>
  );
}

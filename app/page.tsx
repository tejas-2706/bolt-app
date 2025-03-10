"use client"

import { PromptArea } from "@/components/PromptArea";
import { useridAtom } from "@/store/atoms/details";
import { useAtomValue } from "jotai";

export default function Home() {
  const userId = useAtomValue(useridAtom);
  return (
    <div className="flex justify-center items-center h-screen">
      <PromptArea/>
    </div>
  );
}

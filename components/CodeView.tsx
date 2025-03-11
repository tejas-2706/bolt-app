"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import { useAtom } from 'jotai';
import { PromptAtom } from '@/store/atoms/details';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
function CodeView() {
    const params = useParams<{ tag: string; id: string }>();
    const [activetab, setActivetab] = useState('code');
    const [files,setFiles] = useState(Lookup?.DEFAULT_FILE);
    const [promptvalue,setPromptvalue] = useAtom(PromptAtom);
    const isInitialMount = useRef(true);
    const [loading,setLoading] = useState(false);
    // const GenerateCode = async() => {
    //     const PROMPT = JSON.stringify(promptvalue) + " " + Prompt.CODE_GEN_PROMPT
    //     // const PROMPT = JSON.stringify(promptvalue)
        
    //     const result = await axios.post('/api/gen-ai-code', {
    //         prompt: PROMPT
    //     });

    //     console.log("Files / Code generated", result.data);
    //     const Ai_Response = result.data;
    //     const mergedFiles = {...Lookup.DEFAULT_FILE, ...Ai_Response?.files}
    //     // setFiles(mergedFiles);
    // }
    const GenerateCode = async () => {
        setLoading(true)
        const PROMPT = JSON.stringify(promptvalue) + " " + Prompt.CODE_GEN_PROMPT;
    
        const result = await axios.post('/api/gen-ai-code', {
            prompt: PROMPT
        });
    
        console.log("Files / Code generated", result.data);
    
        // Parse the markdown-wrapped JSON
        const jsonMatch = result.data.match(/```\s*json\s*([\s\S]*?)\s*```/);
        if (!jsonMatch || !jsonMatch[1]) {
            throw new Error("No valid JSON found in the response");
        }
        const parsedResponse = JSON.parse(jsonMatch[1].trim());
    
        const Ai_Response = parsedResponse;
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...Ai_Response?.files };
        setFiles(mergedFiles);
        // Files Updation Every Time
        console.log("About to update files with chatId:", params.id, "and files:", Ai_Response?.files);
        const update_files = await axios.post('/api/code-files', {
            chatId: params.id,
            fileData: Ai_Response?.files
        });
        console.log(update_files.data);
        setLoading(false);
    };
    const GetFiles = async() =>{
        setLoading(true)
        const ChatFiles = await axios.get(`/api/code-files?chatId=${params.id}`);
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...ChatFiles.data.filesData};
        console.log("Dtaa", ChatFiles.data.filesData);
        setFiles(mergedFiles);
        setLoading(false)
    }
    useEffect(() => {
      params.id&&GetFiles()
    }, [params.id])
    
    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Do nothing on first render
        }
        if(promptvalue.length > 0){
            const role = promptvalue[promptvalue?.length - 1].role
            if(role == 'user'){
                GenerateCode();
            }
        }
    },[promptvalue])
    return (
        <div className='relative'>
            <div className='bg-[#181818] w-full p-2 border'>
                <div className='flex items-center justify-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 rounded-full'>
                    <h2
                        onClick={() => { setActivetab('code') }}
                        className={`text-sm cursor-pointer ${activetab == 'code' && ' bg-blue-500 opacity-80 p-1 px-2 rounded-full'}`}>Code</h2>
                    <h2
                        onClick={() => { setActivetab('preview') }}
                        className={`text-sm cursor-pointer ${activetab == 'preview' && 'bg-blue-500 opacity-80 p-1 px-2 rounded-full'}`}>Preview</h2>
                </div>
            </div>
            <SandpackProvider 
            files={files}
            template="react" 
            theme={'dark'}
            customSetup={{
                dependencies:{
                    ...Lookup.DEPENDANCY
                }
            }}
            options={{
                externalResources:['https://cdn.tailwindcss.com']
            }}
            >
                <SandpackLayout>
                    {activetab == 'code'? 
                    <>
                        <SandpackFileExplorer style={{ height: '80vh' }} />
                        <SandpackCodeEditor style={{ height: '80vh' }} />
                    </>
                    :
                    <>
                        <SandpackPreview style={{ height: '80vh'}} showNavigator={true} />
                    </>
                    }
                </SandpackLayout>
            </SandpackProvider>

            {loading && <div className='p-10 bg-gray-900 opacity-75
            absolute top-0 rounded-lg w-full h-full flex items-center justify-center gap-2
            '>
                <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
                <h2 className='text-white'>Generating Your Files ...</h2>
            </div>}
        </div>
    )
}

export default CodeView
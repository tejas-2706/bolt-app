"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import { useAtom, useAtomValue } from 'jotai';
import { ActionAtom, ActionType, PromptAtom, useridAtom, usertokenAtom } from '@/store/atoms/details';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { useParams } from 'next/navigation';
import { Loader2Icon, Rocket } from 'lucide-react';
import { useTheme } from 'next-themes';
import { countToken } from './ChatSidebar';
import SandPackPreviewClient from './SandPackPreviewClient';
import { toast } from 'sonner';
function CodeView() {
    const params = useParams<{ tag: string; id: string }>();
    const [activetab, setActivetab] = useState('code');
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
    const [promptvalue] = useAtom(PromptAtom);
    const isInitialMount = useRef(true);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme()
    const ptheme = theme === 'light' ? 'light' : 'dark';
    const user_token = useAtomValue(usertokenAtom);
    const user_Id = useAtomValue(useridAtom);
    const [action, setAction] = useAtom(ActionAtom);
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    // const DeployLink = useAtomValue(DeployLinkAtom);
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
        try {

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

            // CHECKING TOKEN CALCULATION USED
            if (user_token > 0){
                const calculated_token = Number(user_token) - Number(countToken(JSON.stringify(Ai_Response)));
                console.log("Token Value from COdeview = ", user_token);
                console.log("COUNTED AI CODE RESPONSE TOKENS ARE = ", Number(countToken(JSON.stringify(Ai_Response))));
                console.log("Sending to codeview /api/user-tokens:", { userId: user_Id, token: calculated_token });
                if (calculated_token) {
                    console.log("Inside to codeview /api/user-tokens:", { userId: user_Id, token: calculated_token });
                    await axios.post('/api/user-tokens', {
                        token: calculated_token
                    });
                }
            }
            setLoading(false);
        } catch (error) {
            toast.error("Error occured while generating the code !! Retry again !!", {
                closeButton:true
            })
            console.log("Error occured while generating the code - ", error);
        }
    };
    const GetFiles = async () => {
        setIsLoadingFiles(true);
        setLoading(true)
        const ChatFiles = await axios.get(`/api/code-files?chatId=${params.id}`);
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...ChatFiles.data.filesData };
        console.log("Dtaa", ChatFiles.data.filesData);
        setFiles(mergedFiles);
        setLoading(false)
        setIsLoadingFiles(false);
    }
    useEffect(() => {
        if (params.id) {
            GetFiles();
        }
        //   params.id&&GetFiles()  // it works just a linting error
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    // Working one Just commented for no APi request to GOOO

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Do nothing on first render
        }
        if(isLoadingFiles){
            return;
        }
        if (promptvalue.length > 0) {
            const role = promptvalue[promptvalue?.length - 1].role
            console.log('Last message role:', role);
            if (role == 'user') {
                GenerateCode();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promptvalue])

    useEffect(() => {
        if (action && (action.actionType === 'deploy' || action?.actionType === 'export'))
            setActivetab("preview")
    }, [action]);

    return (
        <div className='relative'>
            <div className='flex justify-between items-center dark:bg-[#181818] w-full p-2 border'>
                <div className='flex items-center justify-center flex-wrap shrink-0 dark:bg-black p-1 w-[140px] gap-3 rounded-full'>
                    <h2
                        onClick={() => { setActivetab('code') }}
                        className={`text-sm cursor-pointer ${activetab == 'code' && ' dark:bg-purple-500 bg-black text-white opacity-80 p-1 px-2 rounded-full'}`}>Code</h2>
                    <h2
                        onClick={() => { setActivetab('preview') }}
                        className={`text-sm cursor-pointer ${activetab == 'preview' && 'dark:bg-purple-500 bg-black text-white opacity-80 p-1 px-2 rounded-full'}`}>Preview</h2>
                </div>
                <div>
                    <Rocket
                        className='hover:bg-white hover:text-black cursor-pointer rounded-md'
                        onClick={() => {
                            setAction({
                                actionType: ActionType.deploy,
                                timestamp: Date.now()
                            })
                            // setActivetab('preview');
                            // console.log(DeployLink);
                            // try {
                            //     if(DeployLink){
                            //         navigator.clipboard.writeText(`https://${DeployLink}.csb.app/`);
                            //         toast.success("Copied the Deploy url!!",{
                            //             description:"Now, Share the url to visit the Site from any Device!!"
                            //         });
                            //     }
                            // }catch(error){
                            //     console.log("Not Copied", error);
                            // }
                        }}>
                    </Rocket>
                </div>
            </div>
            <SandpackProvider
                files={files}
                template="react"
                theme={ptheme}
                customSetup={{
                    dependencies: {
                        ...Lookup.DEPENDANCY
                    }
                }}
                options={{
                    externalResources: ['https://cdn.tailwindcss.com']
                }}

            >
                <SandpackLayout>
                    {activetab === 'code' ?
                        <>
                            <SandpackFileExplorer style={{ height: '80vh' }} />
                            <SandpackCodeEditor style={{ height: '80vh' }} />
                        </>
                        :
                        <>
                            <SandPackPreviewClient />
                        </>
                    }
                </SandpackLayout>
            </SandpackProvider>

            {loading && <div className='p-10 bg-gray-900 opacity-75
            absolute top-0 rounded-lg w-full h-full flex items-center justify-center gap-2
            '>
                <Loader2Icon className='animate-spin h-10 w-10 text-white' />
                <h2 className='text-white'>Generating Your Files ...</h2>
            </div>}
        </div>
    )
}

export default CodeView
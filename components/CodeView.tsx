"use client"
import React, { useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
function CodeView() {
    const [activetab, setActivetab] = useState('code')
    return (
        <div>
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
            <SandpackProvider template="react" theme={'dark'}
            customSetup={{
                dependencies:{
                    ...Lookup.DEPENDANCY
                }
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
        </div>
    )
}

export default CodeView
import { ActionAtom, ActionType } from '@/store/atoms/details';
import { SandpackPreview, SandpackPreviewRef, useSandpack } from '@codesandbox/sandpack-react'
import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react'

function SandPackPreviewClient() {
    const previewref = useRef<SandpackPreviewRef>();
    const {sandpack} = useSandpack();
    const [action,setAction] = useAtom(ActionAtom);
    // const ref = useRef()
    const GetSandPackClient = async() => {
        const client = previewref.current?.getClient();
        if(client){
            console.log(client);
            const result = await client.getCodeSandboxURL();
            console.log(result);
            if(action?.actionType == "deploy"){
                window.open(`https://${result?.sandboxId}.csb.app/`)
            }else if (action?.actionType == "export"){
                window.open(result?.editorUrl)
            }
        }
    }
    useEffect(()=>{
        GetSandPackClient();
    },[sandpack&&action])
  return (
    <SandpackPreview 
    ref={previewref}
    style={{ height: '80vh'}} showNavigator={true} />
  )
}

export default SandPackPreviewClient
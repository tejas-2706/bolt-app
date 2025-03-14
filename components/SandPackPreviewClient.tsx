import { ActionAtom, DeployLinkAtom } from '@/store/atoms/details';
import { SandpackPreview, SandpackPreviewRef, useSandpack } from '@codesandbox/sandpack-react'
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useRef } from 'react'

function SandPackPreviewClient() {
    const previewref = useRef<SandpackPreviewRef>(null);
    const {sandpack} = useSandpack();
    const [action] = useAtom(ActionAtom);
    const setDeployLink = useSetAtom(DeployLinkAtom);
    // const ref = useRef()
    const GetSandPackClient = async() => {
        const client = previewref.current?.getClient();
        if(client){
            console.log(client);
            // @ts-expect-error getCodeSandboxURL is not in SandpackClient types but works at runtime
            const result = await client.getCodeSandboxURL();
            console.log(result);
            setDeployLink(result?.sandboxId);
            if(action?.actionType == "deploy"){
                window.open(`https://${result?.sandboxId}.csb.app/`)
            }else if (action?.actionType == "export"){
                window.open(result?.editorUrl)
            }
        }
    }
    useEffect(()=>{
        GetSandPackClient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sandpack&&action])
  return (
    <SandpackPreview 
    ref={previewref}
    style={{ height: '80vh'}} showNavigator={true} />
  )
}

export default SandPackPreviewClient
import { ActionAtom } from '@/store/atoms/details';
import { SandpackPreview, SandpackPreviewRef, useSandpack } from '@codesandbox/sandpack-react'
import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner';

function SandPackPreviewClient() {
    const previewref = useRef<SandpackPreviewRef>(null);
    const {sandpack} = useSandpack();
    const [action] = useAtom(ActionAtom);
    // const setDeployLink = useSetAtom(DeployLinkAtom);
    // const ref = useRef()
    const GetSandPackClient = async() => {
        const client = previewref.current?.getClient();
        if(client){
            console.log(client);
            // @ts-expect-error getCodeSandboxURL is not in SandpackClient types but works at runtime
            const result = await client.getCodeSandboxURL();
            console.log(result);
            if(action?.actionType == "deploy"){
                // window.open(`https://${result?.sandboxId}.csb.app/`)
                navigator.clipboard.writeText(`https://${result?.sandboxId}.csb.app/`);
                toast.success("Copied the Deploy url!!",{
                    description:"Now, Share the url to visit the Site from any Device!!"
                });
            }else if (action?.actionType == "export"){
                window.open(result?.editorUrl)
            }
        }else{
            toast.error("Please Run the Project !!",{
                description:"Please Run the Project Explicitly from Code Section!",
                closeButton:true
            });
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
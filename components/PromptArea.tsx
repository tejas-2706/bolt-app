import { Textarea } from "@/components/ui/textarea"

export function PromptArea() {
  return (
    <div className="grid w-1/3 gap-1.5">
        <label htmlFor="">Write Your Prompt here</label>
      <Textarea placeholder="Type your message here." id="message"  />
    </div>
  )
}

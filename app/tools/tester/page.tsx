import { ToolTesterInterface } from "@/components/tools/tool-tester-interface"

export default function ToolTesterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-foreground">Interactive Tool Tester</h1>
        <p className="text-muted-foreground mt-2">Test SFMC tools with real-time execution and response analysis</p>
      </div>
      <ToolTesterInterface />
    </div>
  )
}

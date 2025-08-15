import { ToolsHeader } from "@/components/tools/tools-header"
import { ToolsCatalog } from "@/components/tools/tools-catalog"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <ToolsHeader />
      <ToolsCatalog />
    </div>
  )
}

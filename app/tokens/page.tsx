import { TokensOverview } from "@/components/tokens/tokens-overview"
import { TokensHeader } from "@/components/tokens/tokens-header"
import { SetupInstructions } from "@/components/tokens/setup-instructions"

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <TokensHeader />
      <TokensOverview />
      <SetupInstructions />
    </div>
  )
}

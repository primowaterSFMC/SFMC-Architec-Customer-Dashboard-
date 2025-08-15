"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Download, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SetupInstructions() {
  const { toast } = useToast()

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: `${label} copied`,
        description: `${label} has been copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: `Failed to copy ${label.toLowerCase()} to clipboard`,
        variant: "destructive",
      })
    }
  }

  const configExample = `{
  "mcpServers": {
    "sfmc-tools": {
      "command": "npx",
      "args": ["@salesforce/sfmc-mcp-server"],
      "env": {
        "SFMC_API_TOKEN": "your_token_here"
      }
    }
  }
}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-xl">Claude Desktop Setup Instructions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Follow these steps to connect your API tokens with Claude Desktop
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              1
            </Badge>
            <h3 className="font-semibold">Install Claude Desktop</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-8">
            Download and install Claude Desktop from the official Anthropic website.
          </p>
          <div className="ml-8">
            <Button variant="outline" size="sm" asChild>
              <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download Claude Desktop
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              2
            </Badge>
            <h3 className="font-semibold">Configure MCP Server</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-8">
            Add the SFMC MCP server configuration to your Claude Desktop settings.
          </p>
          <div className="ml-8 space-y-2">
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-muted rounded text-sm font-mono whitespace-pre-wrap">{configExample}</code>
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(configExample, "Configuration")}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              3
            </Badge>
            <h3 className="font-semibold">Add Your API Token</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-8">
            Replace "your_token_here" in the configuration with one of your active API tokens from above.
          </p>
        </div>

        {/* Step 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              4
            </Badge>
            <h3 className="font-semibold">Restart Claude Desktop</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-8">
            Restart Claude Desktop to load the new MCP server configuration.
          </p>
        </div>

        {/* Step 5 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />5
            </Badge>
            <h3 className="font-semibold">Start Using SFMC Tools</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-8">
            You can now use SFMC tools directly in Claude Desktop conversations!
          </p>
        </div>

        {/* Help Links */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Need Help?</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/documentation" target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Documentation
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/support" target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Tool } from "@/lib/tools-data"
import Link from "next/link"

interface ToolDetailsDialogProps {
  tool: Tool
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ToolDetailsDialog({ tool, open, onOpenChange }: ToolDetailsDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${tool.color}`}>
              <tool.icon className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="font-playfair text-xl">{tool.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Input Format</p>
                  <Badge variant="outline" className="mt-1">
                    {tool.inputFormat}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Output Format</p>
                  <Badge variant="outline" className="mt-1">
                    {tool.outputFormat}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Schema */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Expected input parameters</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(tool.inputSchema, null, 2), "Input Schema")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{JSON.stringify(tool.inputSchema, null, 2)}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Example Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Input Example</p>
                  <div className="flex items-start justify-between gap-2">
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto flex-1">
                      <code>{JSON.stringify(tool.exampleInput, null, 2)}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(tool.exampleInput, null, 2), "Example Input")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Expected Output</p>
                  <div className="flex items-start justify-between gap-2">
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto flex-1">
                      <code>{JSON.stringify(tool.exampleOutput, null, 2)}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(tool.exampleOutput, null, 2), "Example Output")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm">{useCase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href={`/tools/tester?tool=${tool.id}`}>
                <Play className="h-4 w-4 mr-2" />
                Try This Tool
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/documentation#${tool.id}`}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

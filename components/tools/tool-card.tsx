"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen } from "lucide-react"
import { ToolDetailsDialog } from "./tool-details-dialog"
import type { Tool } from "@/lib/tools-data"
import Link from "next/link"

interface ToolCardProps {
  tool: Tool
  viewMode: "grid" | "list"
}

export function ToolCard({ tool, viewMode }: ToolCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (viewMode === "list") {
    return (
      <>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-lg ${tool.color}`}>
                  <tool.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {tool.inputFormat} → {tool.outputFormat}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tool.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Details
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/tools/tester?tool=${tool.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Try Now
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <ToolDetailsDialog tool={tool} open={showDetails} onOpenChange={setShowDetails} />
      </>
    )
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`p-2 rounded-lg ${tool.color}`}>
              <tool.icon className="h-5 w-5" />
            </div>
            <Badge variant="outline" className="text-xs">
              {tool.inputFormat} → {tool.outputFormat}
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{tool.description}</p>

          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(true)} className="flex-1">
              <BookOpen className="h-4 w-4 mr-2" />
              Details
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link href={`/tools/tester?tool=${tool.id}`}>
                <Play className="h-4 w-4 mr-2" />
                Try Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <ToolDetailsDialog tool={tool} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ToolCard } from "./tool-card"
import type { ToolCategory as ToolCategoryType } from "@/lib/tools-data"

interface ToolCategoryProps {
  category: ToolCategoryType
  viewMode: "grid" | "list"
  searchTerm: string
}

export function ToolCategory({ category, viewMode, searchTerm }: ToolCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const filteredTools = category.tools.filter((tool) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  })

  if (filteredTools.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <category.icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="font-playfair text-xl">{category.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filteredTools.length} tools</Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

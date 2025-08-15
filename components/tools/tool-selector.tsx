"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { toolsData } from "@/lib/tools-data"
import type { Tool } from "@/lib/tools-data"

interface ToolSelectorProps {
  selectedTool: Tool | null
  onToolSelect: (tool: Tool) => void
}

export function ToolSelector({ selectedTool, onToolSelect }: ToolSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allTools = toolsData.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, categoryName: category.name, categoryId: category.id })),
  )

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      searchTerm === "" ||
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || tool.categoryId === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {toolsData.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tool Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tool</label>
        <Select
          value={selectedTool?.id || ""}
          onValueChange={(value) => {
            const tool = filteredTools.find((t) => t.id === value)
            if (tool) onToolSelect(tool)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a tool to test" />
          </SelectTrigger>
          <SelectContent>
            {filteredTools.map((tool) => (
              <SelectItem key={tool.id} value={tool.id}>
                <div className="flex items-center justify-between w-full">
                  <span>{tool.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {tool.categoryName}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Tool Info */}
      {selectedTool && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${selectedTool.color}`}>
              <selectedTool.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{selectedTool.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{selectedTool.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {selectedTool.inputFormat} → {selectedTool.outputFormat}
                </Badge>
                <div className="flex gap-1">
                  {selectedTool.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

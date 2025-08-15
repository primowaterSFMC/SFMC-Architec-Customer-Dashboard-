"use client"

import { useState } from "react"
import { ToolCategory } from "./tool-category"
import { ToolsHeader } from "./tools-header"
import { toolsData } from "@/lib/tools-data"

export function ToolsCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredCategories = toolsData.filter((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) {
      return false
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        category.name.toLowerCase().includes(searchLower) ||
        category.description.toLowerCase().includes(searchLower) ||
        category.tools.some(
          (tool) =>
            tool.name.toLowerCase().includes(searchLower) ||
            tool.description.toLowerCase().includes(searchLower) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
        )
      )
    }

    return true
  })

  return (
    <div className="space-y-8">
      <ToolsHeader onSearchChange={setSearchTerm} onCategoryChange={setSelectedCategory} onViewChange={setViewMode} />

      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <ToolCategory key={category.id} category={category} viewMode={viewMode} searchTerm={searchTerm} />
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

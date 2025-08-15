"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ToolsHeaderProps {
  onSearchChange?: (search: string) => void
  onCategoryChange?: (category: string) => void
  onViewChange?: (view: "grid" | "list") => void
}

export function ToolsHeader({ onSearchChange, onCategoryChange, onViewChange }: ToolsHeaderProps) {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange?.(value)
  }

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView)
    onViewChange?.(newView)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-foreground">SFMC Tools Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Discover and explore all available Salesforce Marketing Cloud tools
          </p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          75 Tools Available
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-1 gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools by name, category, or functionality..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="data-management">Data Management</SelectItem>
              <SelectItem value="subscriber-management">Subscriber Management</SelectItem>
              <SelectItem value="journey-builder">Journey Builder</SelectItem>
              <SelectItem value="content-builder">Content Builder</SelectItem>
              <SelectItem value="automation-studio">Automation Studio</SelectItem>
              <SelectItem value="email-services">Email Services</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="contact-management">Contact Management</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
              <SelectItem value="data-operations">Data Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button variant={view === "grid" ? "default" : "ghost"} size="sm" onClick={() => handleViewChange("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={view === "list" ? "default" : "ghost"} size="sm" onClick={() => handleViewChange("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Plus, HelpCircle } from "lucide-react"
import { useState } from "react"
import { RequestTokenDialog } from "./request-token-dialog"

export function TokensHeader() {
  const [showRequestDialog, setShowRequestDialog] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-foreground">Token Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your API tokens for accessing SFMC tools through Claude Desktop
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Setup
        </Button>
        <Button onClick={() => setShowRequestDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Request New Token
        </Button>
      </div>

      <RequestTokenDialog open={showRequestDialog} onOpenChange={setShowRequestDialog} />
    </div>
  )
}

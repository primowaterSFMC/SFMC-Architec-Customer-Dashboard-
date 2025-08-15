"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Info, X, ExternalLink } from "lucide-react"

export function NotificationsBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            <strong>New Feature:</strong> Journey Builder v2.1 tools are now available with enhanced automation
            capabilities.
          </span>
          <Button variant="link" size="sm" className="p-0 h-auto text-primary">
            Learn more <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

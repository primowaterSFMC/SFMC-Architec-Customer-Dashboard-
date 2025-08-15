"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, MoreHorizontal, Calendar, Activity, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TokenDetailsDialog } from "./token-details-dialog"
import { useToast } from "@/hooks/use-toast"

interface TokenCardProps {
  token: {
    id: string
    name: string
    token: string
    status: "active" | "suspended" | "expired"
    createdAt: Date
    expiresAt: Date
    lastUsedAt: Date
    usageCount: number
    rateLimit: {
      requestsPerMinute: number
      requestsPerDay: number
    }
    description: string
  }
}

export function TokenCard({ token }: TokenCardProps) {
  const [showToken, setShowToken] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token.token)
      toast({
        title: "Token copied",
        description: "API token has been copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy token to clipboard",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "suspended":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const maskToken = (token: string) => {
    if (token.length <= 8) return token
    return `${token.slice(0, 8)}${"•".repeat(32)}${token.slice(-8)}`
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{token.name}</h3>
                <p className="text-sm text-muted-foreground">{token.description}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(token.status)}>
                {token.status}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowDetails(true)}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={copyToClipboard}>Copy Token</DropdownMenuItem>
                <DropdownMenuItem>Regenerate Token</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Suspend Token</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Token Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">API Token</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                {showToken ? token.token : maskToken(token.token)}
              </code>
              <Button variant="outline" size="icon" onClick={() => setShowToken(!showToken)}>
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Token Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{token.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Usage</p>
                <p className="font-medium">{token.usageCount.toLocaleString()} calls</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Last Used</p>
                <p className="font-medium">{token.lastUsedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
              View Details
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Token
            </Button>
          </div>
        </CardContent>
      </Card>

      <TokenDetailsDialog token={token} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}

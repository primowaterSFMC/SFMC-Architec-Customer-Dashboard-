"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TokenCard } from "./token-card"
import { Badge } from "@/components/ui/badge"

// Mock data - in real app this would come from API
const tokens = [
  {
    id: "tok_prod_2024_001",
    name: "Production Token",
    token: "sfmc_prod_ak7j9x2m8n4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0",
    status: "active" as const,
    createdAt: new Date("2024-01-15"),
    expiresAt: new Date("2025-01-15"),
    lastUsedAt: new Date("2024-12-15T10:30:00"),
    usageCount: 15420,
    rateLimit: {
      requestsPerMinute: 100,
      requestsPerDay: 10000,
    },
    description: "Primary token for production environment",
  },
  {
    id: "tok_dev_2024_002",
    name: "Development Token",
    token: "sfmc_dev_bk8j0x3n9o5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1",
    status: "active" as const,
    createdAt: new Date("2024-02-01"),
    expiresAt: new Date("2025-02-01"),
    lastUsedAt: new Date("2024-12-14T16:45:00"),
    usageCount: 8750,
    rateLimit: {
      requestsPerMinute: 50,
      requestsPerDay: 5000,
    },
    description: "Token for development and testing",
  },
  {
    id: "tok_test_2024_003",
    name: "Testing Token",
    token: "sfmc_test_cl9k1x4o0p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2",
    status: "suspended" as const,
    createdAt: new Date("2024-03-10"),
    expiresAt: new Date("2025-03-10"),
    lastUsedAt: new Date("2024-11-20T09:15:00"),
    usageCount: 2340,
    rateLimit: {
      requestsPerMinute: 25,
      requestsPerDay: 2500,
    },
    description: "Suspended due to rate limit violations",
  },
]

export function TokensOverview() {
  const activeTokens = tokens.filter((token) => token.status === "active").length
  const totalUsage = tokens.reduce((sum, token) => sum + token.usageCount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeTokens}</div>
            <p className="text-xs text-muted-foreground">of {tokens.length} total tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">across all tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rate Limit Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                Healthy
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">All limits within range</p>
          </CardContent>
        </Card>
      </div>

      {/* Tokens List */}
      <div className="space-y-4">
        <h2 className="font-playfair text-xl font-semibold text-foreground">Your API Tokens</h2>
        <div className="grid gap-4">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, Wrench, FileText, TestTube, ArrowRight } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Manage Tokens",
    description: "View and manage your API tokens",
    icon: Key,
    href: "/tokens",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Browse Tools",
    description: "Explore SFMC tools catalog",
    icon: Wrench,
    href: "/tools",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Documentation",
    description: "API guides and references",
    icon: FileText,
    href: "/documentation",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    title: "Test Tools",
    description: "Interactive tool testing",
    icon: TestTube,
    href: "/tools/tester",
    color: "bg-chart-5/10 text-chart-5",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Jump to commonly used features</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-muted/50">
              <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

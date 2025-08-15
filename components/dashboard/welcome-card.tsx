"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle } from "lucide-react"

export function WelcomeCard() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-foreground mb-2">Welcome back, John Doe</h1>
            <p className="text-muted-foreground mb-4">Acme Corporation • {currentDate}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last login: {currentTime}</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Systems Operational
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">AC</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

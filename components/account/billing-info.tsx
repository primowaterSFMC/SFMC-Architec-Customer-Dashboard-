"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar, TrendingUp, AlertCircle } from "lucide-react"

export function BillingInfo() {
  const currentPlan = {
    name: "Enterprise",
    price: "$299",
    period: "month",
    status: "active",
    nextBilling: "January 15, 2025",
  }

  const usage = {
    apiCalls: { current: 847500, limit: 1000000 },
    tokens: { current: 3, limit: 5 },
    storage: { current: 2.4, limit: 10 },
  }

  const invoices = [
    { id: "INV-2024-12", date: "Dec 15, 2024", amount: "$299.00", status: "paid" },
    { id: "INV-2024-11", date: "Nov 15, 2024", amount: "$299.00", status: "paid" },
    { id: "INV-2024-10", date: "Oct 15, 2024", amount: "$299.00", status: "paid" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your subscription details and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <p className="text-gray-600">
                  {currentPlan.price}/{currentPlan.period}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {currentPlan.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Next billing date</span>
                <span className="font-medium">{currentPlan.nextBilling}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment method</span>
                <span className="font-medium">•••• •••• •••• 4242</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Manage Subscription
              </Button>
              <Button variant="ghost" className="w-full">
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Usage Overview
            </CardTitle>
            <CardDescription>Current month usage against your plan limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Calls</span>
                <span>
                  {usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                </span>
              </div>
              <Progress value={(usage.apiCalls.current / usage.apiCalls.limit) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Tokens</span>
                <span>
                  {usage.tokens.current} / {usage.tokens.limit}
                </span>
              </div>
              <Progress value={(usage.tokens.current / usage.tokens.limit) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage (GB)</span>
                <span>
                  {usage.storage.current} / {usage.storage.limit}
                </span>
              </div>
              <Progress value={(usage.storage.current / usage.storage.limit) * 100} />
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Usage Alert</p>
                <p className="text-blue-700">You've used 85% of your API calls this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>Download invoices and view payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

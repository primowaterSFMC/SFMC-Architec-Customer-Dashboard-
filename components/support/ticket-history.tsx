"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Clock, CheckCircle, AlertCircle, Search, Eye } from "lucide-react"

export function TicketHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const tickets = [
    {
      id: "TICK-2024-001",
      subject: "API authentication error with Data Extensions",
      category: "Technical Issue",
      status: "open",
      priority: "high",
      created: "2024-12-10",
      lastUpdate: "2024-12-12",
      responses: 3,
    },
    {
      id: "TICK-2024-002",
      subject: "Question about billing cycle",
      category: "Billing Question",
      status: "resolved",
      priority: "medium",
      created: "2024-12-08",
      lastUpdate: "2024-12-09",
      responses: 2,
    },
    {
      id: "TICK-2024-003",
      subject: "Feature request: Bulk token management",
      category: "Feature Request",
      status: "in-progress",
      priority: "low",
      created: "2024-12-05",
      lastUpdate: "2024-12-11",
      responses: 5,
    },
    {
      id: "TICK-2024-004",
      subject: "Unable to access Journey Builder tools",
      category: "Technical Issue",
      status: "resolved",
      priority: "high",
      created: "2024-12-01",
      lastUpdate: "2024-12-02",
      responses: 4,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>View and manage your support ticket history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(ticket.status)}
                      <h3 className="font-medium">{ticket.subject}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Ticket ID: {ticket.id}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Created: {ticket.created}</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                      <span>{ticket.responses} responses</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
                <Badge variant="outline">{ticket.category}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Mail, Clock, Send } from "lucide-react"

export function ContactSupport() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    attachments: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit support ticket
    console.log("Submitting support ticket:", formData)
  }

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM PST",
      responseTime: "< 5 minutes",
      icon: MessageCircle,
      status: "online",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Mon-Fri, 9 AM - 6 PM PST",
      responseTime: "Immediate",
      icon: Phone,
      status: "online",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 4 hours",
      icon: Mail,
      status: "online",
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Options</CardTitle>
            <CardDescription>Choose the best way to reach our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportChannels.map((channel, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <channel.icon className="h-5 w-5 text-sfmc-blue" />
                    <h3 className="font-medium">{channel.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {channel.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{channel.availability}</span>
                  </div>
                  <p>Response time: {channel.responseTime}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-medium text-blue-800 mb-2">Enterprise Support</h3>
            <p className="text-sm text-blue-700 mb-4">
              Get priority support with dedicated account management and faster response times.
            </p>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-transparent">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

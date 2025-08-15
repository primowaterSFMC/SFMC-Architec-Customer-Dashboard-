"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface RequestTokenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RequestTokenDialog({ open, onOpenChange }: RequestTokenDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Token request submitted",
      description:
        "Your token request has been submitted for approval. You'll receive an email notification once it's processed.",
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request New Token</DialogTitle>
          <DialogDescription>
            Submit a request for a new API token. Requests are typically processed within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenName">Token Name</Label>
            <Input id="tokenName" placeholder="e.g., Production Token 2024" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Environment</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rateLimit">Rate Limit Tier</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select rate limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (25/min, 2,500/day)</SelectItem>
                <SelectItem value="standard">Standard (50/min, 5,000/day)</SelectItem>
                <SelectItem value="premium">Premium (100/min, 10,000/day)</SelectItem>
                <SelectItem value="enterprise">Enterprise (Custom limits)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Business Justification</Label>
            <Textarea
              id="justification"
              placeholder="Please explain the business need for this token..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

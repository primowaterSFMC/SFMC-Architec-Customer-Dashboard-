"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, MapPin, Save } from "lucide-react"

export function AccountProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    companyName: "Acme Marketing Solutions",
    contactName: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Marketing Street, San Francisco, CA 94105",
    industry: "E-commerce",
    accountType: "Enterprise",
    joinDate: "March 2023",
  })

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Your organization details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/generic-company-logo.png" />
              <AvatarFallback className="text-lg">AM</AvatarFallback>
            </Avatar>
            <div>
              <Badge variant="secondary" className="mb-2">
                {profile.accountType}
              </Badge>
              <p className="text-sm text-gray-600">Member since {profile.joinDate}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={profile.companyName}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="contactName">Primary Contact</Label>
              <Input
                id="contactName"
                value={profile.contactName}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, contactName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={profile.industry}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Details
          </CardTitle>
          <CardDescription>How we can reach you for important updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">{profile.email}</p>
                <p className="text-sm text-gray-600">Primary email</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">{profile.phone}</p>
                <p className="text-sm text-gray-600">Business phone</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">{profile.address}</p>
                <p className="text-sm text-gray-600">Business address</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            {isEditing ? (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

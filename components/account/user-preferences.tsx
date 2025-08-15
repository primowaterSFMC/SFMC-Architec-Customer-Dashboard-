"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Globe, Save } from "lucide-react"

export function UserPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    timezone: "America/Los_Angeles",
    language: "en",
    theme: "light",
    dateFormat: "MM/DD/YYYY",
  })

  const handleSave = () => {
    // Save preferences
    console.log("Saving preferences:", preferences)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified about account activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-600">Product updates and tips</p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-gray-600">Login and security notifications</p>
            </div>
            <Switch
              checked={preferences.securityAlerts}
              onCheckedChange={(checked) => setPreferences({ ...preferences, securityAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Localization
          </CardTitle>
          <CardDescription>Customize your regional and display preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={preferences.timezone}
              onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => setPreferences({ ...preferences, language: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select
              value={preferences.dateFormat}
              onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Smartphone, Clock, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const recentSessions = [
    { device: "Chrome on Windows", location: "San Francisco, CA", lastActive: "2 minutes ago", current: true },
    { device: "Safari on iPhone", location: "San Francisco, CA", lastActive: "1 hour ago", current: false },
    { device: "Chrome on MacBook", location: "San Francisco, CA", lastActive: "Yesterday", current: false },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password & Authentication
          </CardTitle>
          <CardDescription>Manage your login credentials and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" onClick={() => setShowPasswordForm(!showPasswordForm)}>
              Change Password
            </Button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex gap-2">
                <Button>Update Password</Button>
                <Button variant="outline" onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <p className="font-medium">Two-Factor Authentication</p>
                {twoFactorEnabled && <Badge variant="secondary">Enabled</Badge>}
              </div>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Monitor and manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device}</p>
                    {session.current && <Badge>Current Session</Badge>}
                  </div>
                  <p className="text-sm text-gray-600">{session.location}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.lastActive}
                  </p>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-orange-800">Enable Two-Factor Authentication</p>
              <p className="text-sm text-orange-700">Protect your account with an additional security layer</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-green-800">Strong Password ✓</p>
              <p className="text-sm text-green-700">Your password meets security requirements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

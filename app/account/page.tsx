import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountProfile } from "@/components/account/account-profile"
import { UserPreferences } from "@/components/account/user-preferences"
import { SecuritySettings } from "@/components/account/security-settings"
import { BillingInfo } from "@/components/account/billing-info"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Account Settings", href: "/account" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-sfmc-navy">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <AccountProfile />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <UserPreferences />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingInfo />
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportOverview } from "@/components/support/support-overview"
import { ContactSupport } from "@/components/support/contact-support"
import { KnowledgeBase } from "@/components/support/knowledge-base"
import { TicketHistory } from "@/components/support/ticket-history"
import { SystemStatus } from "@/components/support/system-status"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support Center", href: "/support" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-sfmc-navy">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help with your SFMC portal and tools</p>
        </div>
      </div>

      <SupportOverview />

      <Tabs defaultValue="knowledge" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge" className="space-y-6">
          <KnowledgeBase />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <ContactSupport />
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <TicketHistory />
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <SystemStatus />
        </TabsContent>
      </Tabs>
    </div>
  )
}

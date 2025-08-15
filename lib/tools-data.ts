import {
  Database,
  Users,
  GitBranch,
  FileText,
  Zap,
  Mail,
  BarChart3,
  UserCheck,
  Folder,
  Search,
  type LucideIcon,
} from "lucide-react"

export interface Tool {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  inputFormat: string
  outputFormat: string
  tags: string[]
  inputSchema: Record<string, any>
  exampleInput: Record<string, any>
  exampleOutput: Record<string, any>
  useCases: string[]
}

export interface ToolCategory {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  tools: Tool[]
}

export const toolsData: ToolCategory[] = [
  {
    id: "data-management",
    name: "Data Management",
    description: "Tools for managing data extensions and data operations",
    icon: Database,
    color: "bg-blue-100 text-blue-600",
    tools: [
      {
        id: "create-data-extension",
        name: "Create Data Extension",
        description: "Create a new data extension with specified fields and properties",
        icon: Database,
        color: "bg-blue-100 text-blue-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["data", "create", "extension"],
        inputSchema: {
          name: "string",
          description: "string",
          fields: "array",
          isPrimaryKey: "boolean",
        },
        exampleInput: {
          name: "Customer_Preferences",
          description: "Customer preference data",
          fields: [
            { name: "CustomerID", type: "Text", isPrimaryKey: true },
            { name: "Email", type: "EmailAddress" },
            { name: "Preferences", type: "Text" },
          ],
        },
        exampleOutput: {
          success: true,
          dataExtensionId: "12345",
          message: "Data extension created successfully",
        },
        useCases: [
          "Create customer data storage",
          "Set up preference centers",
          "Build custom data structures",
          "Prepare data for journeys",
        ],
      },
      {
        id: "update-data-extension",
        name: "Update Data Extension",
        description: "Update existing data extension properties and fields",
        icon: Database,
        color: "bg-blue-100 text-blue-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["data", "update", "extension"],
        inputSchema: {
          dataExtensionId: "string",
          name: "string",
          description: "string",
          fields: "array",
        },
        exampleInput: {
          dataExtensionId: "12345",
          name: "Customer_Preferences_Updated",
          description: "Updated customer preference data",
        },
        exampleOutput: {
          success: true,
          message: "Data extension updated successfully",
        },
        useCases: [
          "Modify existing data structures",
          "Add new fields to extensions",
          "Update data extension metadata",
          "Rename data extensions",
        ],
      },
      {
        id: "query-data-extension",
        name: "Query Data Extension",
        description: "Query data from existing data extensions with filters",
        icon: Search,
        color: "bg-blue-100 text-blue-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["data", "query", "search"],
        inputSchema: {
          dataExtensionId: "string",
          fields: "array",
          filter: "object",
          limit: "number",
        },
        exampleInput: {
          dataExtensionId: "12345",
          fields: ["CustomerID", "Email", "Preferences"],
          filter: { Email: "contains @example.com" },
          limit: 100,
        },
        exampleOutput: {
          success: true,
          data: [
            {
              CustomerID: "CUST001",
              Email: "john@example.com",
              Preferences: "newsletter,promotions",
            },
          ],
          totalCount: 1,
        },
        useCases: [
          "Retrieve customer data",
          "Filter data for campaigns",
          "Export data for analysis",
          "Validate data quality",
        ],
      },
    ],
  },
  {
    id: "subscriber-management",
    name: "Subscriber Management",
    description: "Tools for managing subscribers and their data",
    icon: Users,
    color: "bg-green-100 text-green-600",
    tools: [
      {
        id: "create-subscriber",
        name: "Create Subscriber",
        description: "Add a new subscriber to your Marketing Cloud account",
        icon: Users,
        color: "bg-green-100 text-green-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["subscriber", "create", "contact"],
        inputSchema: {
          emailAddress: "string",
          subscriberKey: "string",
          attributes: "object",
          lists: "array",
        },
        exampleInput: {
          emailAddress: "john.doe@example.com",
          subscriberKey: "JOHN001",
          attributes: {
            FirstName: "John",
            LastName: "Doe",
            City: "New York",
          },
          lists: ["Newsletter", "Promotions"],
        },
        exampleOutput: {
          success: true,
          subscriberId: "SUB123456",
          message: "Subscriber created successfully",
        },
        useCases: [
          "Add new customers to lists",
          "Import subscriber data",
          "Create subscriber profiles",
          "Set up preference centers",
        ],
      },
      {
        id: "update-subscriber",
        name: "Update Subscriber",
        description: "Update existing subscriber information and attributes",
        icon: Users,
        color: "bg-green-100 text-green-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["subscriber", "update", "modify"],
        inputSchema: {
          subscriberKey: "string",
          emailAddress: "string",
          attributes: "object",
          status: "string",
        },
        exampleInput: {
          subscriberKey: "JOHN001",
          emailAddress: "john.doe@example.com",
          attributes: {
            FirstName: "John",
            LastName: "Doe",
            City: "San Francisco",
          },
          status: "Active",
        },
        exampleOutput: {
          success: true,
          message: "Subscriber updated successfully",
        },
        useCases: [
          "Update customer information",
          "Change subscriber status",
          "Modify preferences",
          "Update contact details",
        ],
      },
    ],
  },
  {
    id: "journey-builder",
    name: "Journey Builder",
    description: "Tools for creating and managing customer journeys",
    icon: GitBranch,
    color: "bg-purple-100 text-purple-600",
    tools: [
      {
        id: "create-journey",
        name: "Create Journey",
        description: "Create a new customer journey with specified triggers and activities",
        icon: GitBranch,
        color: "bg-purple-100 text-purple-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["journey", "create", "automation"],
        inputSchema: {
          name: "string",
          description: "string",
          entrySource: "object",
          activities: "array",
          goals: "array",
        },
        exampleInput: {
          name: "Welcome Journey",
          description: "Onboarding journey for new customers",
          entrySource: {
            type: "dataExtension",
            id: "12345",
          },
          activities: [
            {
              type: "email",
              name: "Welcome Email",
              templateId: "TEMP001",
            },
          ],
        },
        exampleOutput: {
          success: true,
          journeyId: "JOURNEY123",
          message: "Journey created successfully",
        },
        useCases: [
          "Create welcome sequences",
          "Build nurture campaigns",
          "Set up abandoned cart flows",
          "Design re-engagement journeys",
        ],
      },
      {
        id: "activate-journey",
        name: "Activate Journey",
        description: "Activate a journey to start processing contacts",
        icon: GitBranch,
        color: "bg-purple-100 text-purple-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["journey", "activate", "start"],
        inputSchema: {
          journeyId: "string",
          activationDate: "string",
        },
        exampleInput: {
          journeyId: "JOURNEY123",
          activationDate: "2024-01-01T00:00:00Z",
        },
        exampleOutput: {
          success: true,
          message: "Journey activated successfully",
          status: "Running",
        },
        useCases: [
          "Launch marketing campaigns",
          "Start automated workflows",
          "Begin customer onboarding",
          "Activate seasonal campaigns",
        ],
      },
    ],
  },
  {
    id: "content-builder",
    name: "Content Builder",
    description: "Tools for managing marketing assets and content",
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
    tools: [
      {
        id: "create-email-template",
        name: "Create Email Template",
        description: "Create a new email template with HTML content",
        icon: FileText,
        color: "bg-orange-100 text-orange-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["email", "template", "content"],
        inputSchema: {
          name: "string",
          subject: "string",
          htmlContent: "string",
          textContent: "string",
          folderId: "string",
        },
        exampleInput: {
          name: "Welcome Email Template",
          subject: "Welcome to Our Service!",
          htmlContent: "<html><body><h1>Welcome!</h1></body></html>",
          textContent: "Welcome to our service!",
          folderId: "FOLDER123",
        },
        exampleOutput: {
          success: true,
          templateId: "TEMPLATE123",
          message: "Email template created successfully",
        },
        useCases: [
          "Create email campaigns",
          "Build reusable templates",
          "Design newsletters",
          "Set up transactional emails",
        ],
      },
    ],
  },
  {
    id: "automation-studio",
    name: "Automation Studio",
    description: "Tools for creating and managing automated workflows",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    tools: [
      {
        id: "create-automation",
        name: "Create Automation",
        description: "Create a new automation workflow with specified activities",
        icon: Zap,
        color: "bg-yellow-100 text-yellow-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["automation", "workflow", "schedule"],
        inputSchema: {
          name: "string",
          description: "string",
          schedule: "object",
          activities: "array",
        },
        exampleInput: {
          name: "Daily Data Import",
          description: "Import customer data daily",
          schedule: {
            type: "daily",
            time: "09:00",
          },
          activities: [
            {
              type: "fileTransfer",
              source: "FTP",
              destination: "DataExtension",
            },
          ],
        },
        exampleOutput: {
          success: true,
          automationId: "AUTO123",
          message: "Automation created successfully",
        },
        useCases: [
          "Schedule data imports",
          "Automate file transfers",
          "Set up recurring tasks",
          "Create data processing workflows",
        ],
      },
    ],
  },
  {
    id: "email-services",
    name: "Email Services",
    description: "Tools for email validation and deliverability",
    icon: Mail,
    color: "bg-red-100 text-red-600",
    tools: [
      {
        id: "validate-email",
        name: "Validate Email",
        description: "Validate email addresses for deliverability and format",
        icon: Mail,
        color: "bg-red-100 text-red-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["email", "validation", "deliverability"],
        inputSchema: {
          emailAddress: "string",
          checkDeliverability: "boolean",
        },
        exampleInput: {
          emailAddress: "test@example.com",
          checkDeliverability: true,
        },
        exampleOutput: {
          success: true,
          isValid: true,
          isDeliverable: true,
          reason: "Valid email address",
        },
        useCases: ["Clean email lists", "Validate form submissions", "Improve deliverability", "Reduce bounce rates"],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Tools for tracking and analyzing email performance",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-600",
    tools: [
      {
        id: "get-email-opens",
        name: "Get Email Opens",
        description: "Retrieve email open tracking data for campaigns",
        icon: BarChart3,
        color: "bg-indigo-100 text-indigo-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["analytics", "opens", "tracking"],
        inputSchema: {
          campaignId: "string",
          startDate: "string",
          endDate: "string",
        },
        exampleInput: {
          campaignId: "CAMP123",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
        },
        exampleOutput: {
          success: true,
          totalOpens: 1250,
          uniqueOpens: 980,
          openRate: 0.245,
        },
        useCases: ["Track campaign performance", "Analyze engagement rates", "Generate reports", "Optimize send times"],
      },
    ],
  },
  {
    id: "contact-management",
    name: "Contact Management",
    description: "Tools for managing contacts and contact data",
    icon: UserCheck,
    color: "bg-teal-100 text-teal-600",
    tools: [
      {
        id: "search-contacts",
        name: "Search Contacts",
        description: "Search for contacts based on various criteria",
        icon: UserCheck,
        color: "bg-teal-100 text-teal-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["contact", "search", "filter"],
        inputSchema: {
          searchCriteria: "object",
          fields: "array",
          limit: "number",
        },
        exampleInput: {
          searchCriteria: {
            email: "contains @example.com",
            status: "Active",
          },
          fields: ["ContactID", "Email", "FirstName", "LastName"],
          limit: 50,
        },
        exampleOutput: {
          success: true,
          contacts: [
            {
              ContactID: "CONT001",
              Email: "john@example.com",
              FirstName: "John",
              LastName: "Doe",
            },
          ],
          totalCount: 1,
        },
        useCases: ["Find specific contacts", "Filter contact lists", "Export contact data", "Segment audiences"],
      },
    ],
  },
  {
    id: "organization",
    name: "Organization",
    description: "Tools for managing folders and organizational structure",
    icon: Folder,
    color: "bg-gray-100 text-gray-600",
    tools: [
      {
        id: "browse-folders",
        name: "Browse Folders",
        description: "Browse and navigate the folder structure in Marketing Cloud",
        icon: Folder,
        color: "bg-gray-100 text-gray-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["folder", "browse", "organization"],
        inputSchema: {
          parentFolderId: "string",
          includeSubfolders: "boolean",
        },
        exampleInput: {
          parentFolderId: "ROOT",
          includeSubfolders: true,
        },
        exampleOutput: {
          success: true,
          folders: [
            {
              folderId: "FOLDER001",
              name: "Email Templates",
              type: "Email",
              parentId: "ROOT",
            },
          ],
        },
        useCases: ["Navigate folder structure", "Organize content", "Find assets", "Manage permissions"],
      },
    ],
  },
  {
    id: "data-operations",
    name: "Data Operations",
    description: "Tools for advanced data operations and queries",
    icon: Search,
    color: "bg-cyan-100 text-cyan-600",
    tools: [
      {
        id: "create-query-definition",
        name: "Create Query Definition",
        description: "Create a new SQL query definition for data processing",
        icon: Search,
        color: "bg-cyan-100 text-cyan-600",
        inputFormat: "JSON",
        outputFormat: "JSON",
        tags: ["query", "sql", "data"],
        inputSchema: {
          name: "string",
          description: "string",
          sqlQuery: "string",
          targetDataExtension: "string",
        },
        exampleInput: {
          name: "Active Customers Query",
          description: "Query to find active customers",
          sqlQuery: "SELECT * FROM Customers WHERE Status = 'Active'",
          targetDataExtension: "ActiveCustomers",
        },
        exampleOutput: {
          success: true,
          queryDefinitionId: "QUERY123",
          message: "Query definition created successfully",
        },
        useCases: ["Create data segments", "Process customer data", "Generate reports", "Clean data"],
      },
    ],
  },
]

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trash2, FileText } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SavedTemplate {
  id: string
  name: string
  toolId: string
  input: Record<string, any>
}

interface SavedTemplatesProps {
  templates: SavedTemplate[]
  onLoadTemplate: (template: SavedTemplate) => void
  onDeleteTemplate: (id: string) => void
}

export function SavedTemplates({ templates, onLoadTemplate, onDeleteTemplate }: SavedTemplatesProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  if (templates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Saved Templates</CardTitle>
          <p className="text-sm text-muted-foreground">Save frequently used configurations</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No templates saved yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">Saved Templates</CardTitle>
        <p className="text-sm text-muted-foreground">{templates.length} saved configurations</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {templates.map((template) => (
            <div key={template.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <Badge variant="outline" className="text-xs mt-1">
                    {template.toolId}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onLoadTemplate(template)} className="h-6 px-2">
                    <Play className="h-3 w-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Template</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the template "{template.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteTemplate(template.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {Object.keys(template.input).length} parameters configured
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

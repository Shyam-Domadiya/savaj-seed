"use client"

import { Download, FileText, Image, Video, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface DownloadableResource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'image' | 'video' | 'guide'
  url: string
  fileSize?: string
  downloadCount?: number
  featured?: boolean
}

interface DownloadableResourcesProps {
  resources: DownloadableResource[]
  className?: string
}

const getResourceIcon = (type: DownloadableResource['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4" />
    case 'image':
      return <Image className="h-4 w-4" />
    case 'video':
      return <Video className="h-4 w-4" />
    case 'guide':
      return <BookOpen className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getResourceTypeLabel = (type: DownloadableResource['type']) => {
  switch (type) {
    case 'pdf':
      return 'PDF Document'
    case 'image':
      return 'Image'
    case 'video':
      return 'Video'
    case 'guide':
      return 'Growing Guide'
    default:
      return 'Document'
  }
}

const getResourceTypeColor = (type: DownloadableResource['type']) => {
  switch (type) {
    case 'pdf':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'image':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'video':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'guide':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function DownloadableResources({ resources, className }: DownloadableResourcesProps) {
  if (!resources.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Downloadable Resources</CardTitle>
          <CardDescription>
            No downloadable resources are currently available for this product.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const handleDownload = (resource: DownloadableResource) => {
    // In a real application, this would track downloads and handle the actual download
    window.open(resource.url, '_blank')
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Downloadable Resources</CardTitle>
        <CardDescription>
          Access helpful guides, images, and documentation for this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50",
                resource.featured && "ring-2 ring-primary/20 bg-primary/5"
              )}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{resource.title}</h4>
                    {resource.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getResourceTypeColor(resource.type))}
                    >
                      {getResourceTypeLabel(resource.type)}
                    </Badge>
                    {resource.fileSize && (
                      <span>{resource.fileSize}</span>
                    )}
                    {resource.downloadCount && (
                      <span>{resource.downloadCount.toLocaleString()} downloads</span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(resource)}
                className="shrink-0 ml-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
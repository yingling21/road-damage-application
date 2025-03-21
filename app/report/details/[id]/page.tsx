import Link from "next/link"
import { ChevronLeft, MapPin, Clock, CheckCircle, AlertTriangle, MessageCircle, ThumbsUp, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const reportId = params.id

  // In a real app, you would fetch the report data based on the ID
  const report = {
    id: reportId,
    title: "Pothole on Main Street",
    description:
      "Large pothole approximately 2 feet in diameter and 6 inches deep. Located in the right lane heading north.",
    location: "123 Main Street, New York, NY 10001",
    status: "in-progress",
    dateSubmitted: "June 15, 2023",
    estimatedCompletion: "June 22, 2023",
    progress: 40,
    imageUrl: "/placeholder.svg?height=300&width=500",
    updates: [
      {
        date: "June 16, 2023",
        message: "Report received and assigned to Public Works Department.",
        status: "pending",
      },
      {
        date: "June 18, 2023",
        message: "Inspection completed. Repair scheduled for next week.",
        status: "in-progress",
      },
    ],
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          icon: <AlertTriangle className="h-5 w-5" />,
          text: "Pending",
        }
      case "in-progress":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          icon: <Clock className="h-5 w-5" />,
          text: "In Progress",
        }
      case "completed":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: <CheckCircle className="h-5 w-5" />,
          text: "Completed",
        }
      default:
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          icon: <AlertTriangle className="h-5 w-5" />,
          text: status,
        }
    }
  }

  const statusConfig = getStatusConfig(report.status)

  return (
    <div className="container max-w-3xl py-8">
      <Link href="/reports" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to My Reports
      </Link>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{report.title}</CardTitle>
                <CardDescription className="mt-1">
                  Report ID: RD-2023-{report.id} • Submitted on {report.dateSubmitted}
                </CardDescription>
              </div>
              <div
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
              >
                {statusConfig.icon}
                <span className="ml-1">{statusConfig.text}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="aspect-video overflow-hidden rounded-lg border">
              <img
                src={report.imageUrl || "/placeholder.svg"}
                alt={report.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{report.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Description</div>
                  <div className="text-sm text-muted-foreground">{report.description}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Estimated Completion</div>
                  <div className="text-sm text-muted-foreground">{report.estimatedCompletion}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div>Progress</div>
                <div>{report.progress}%</div>
              </div>
              <Progress value={report.progress} className="h-2" />
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Updates</h3>
              <div className="space-y-4">
                {report.updates.map((update, index) => {
                  const updateStatus = getStatusConfig(update.status)
                  return (
                    <div key={index} className="grid gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-full ${updateStatus.bgColor}`}>{updateStatus.icon}</div>
                          <span className="font-medium">{update.date}</span>
                        </div>
                        <span className={`text-sm ${updateStatus.color}`}>{updateStatus.text}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-9">{update.message}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Add Comment</h3>
              <Textarea placeholder="Add additional information or updates about this issue..." className="mb-2" />
              <Button>Submit Comment</Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


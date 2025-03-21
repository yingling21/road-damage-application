import Link from "next/link"
import { ChevronLeft, Filter, Search, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ReportsPage() {
  // Sample data for reports
  const reports = [
    {
      id: 1,
      title: "Pothole on Main Street",
      location: "123 Main St",
      status: "pending",
      date: "June 15, 2023",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Broken Traffic Light",
      location: "5th Ave & Park St",
      status: "in-progress",
      date: "June 10, 2023",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Road Crack",
      location: "42 Elm Street",
      status: "resolved",
      date: "June 5, 2023",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Damaged Sidewalk",
      location: "78 Oak Avenue",
      status: "pending",
      date: "June 2, 2023",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Missing Street Sign",
      location: "Corner of Pine & Cedar",
      status: "in-progress",
      date: "May 28, 2023",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getStatusIcon = (status:string) => {
    switch (status) {
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Reports</h1>
          <p className="text-muted-foreground">Track and manage your submitted reports</p>
        </div>
        <Link href="/report/new">
          <Button>Report New Issue</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search reports..." className="pl-8" />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-6">
            {reports
              .filter((report) => report.status === "pending")
              .map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid gap-6">
            {reports
              .filter((report) => report.status === "in-progress")
              .map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          <div className="grid gap-6">
            {reports
              .filter((report) => report.status === "resolved")
              .map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReportCard({ report }: { report: { id: number; title: string; location: string; status: string; date: string; imageUrl: string } }) {
  const getStatusConfig = (status:string) => {
    switch (status) {
      case "pending":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          text: "Pending",
          color: "text-red-600 bg-red-100",
        }
      case "in-progress":
        return {
          icon: <Clock className="h-5 w-5" />,
          text: "In Progress",
          color: "text-yellow-600 bg-yellow-100",
        }
      case "completed":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          text: "Completed",
          color: "text-green-600 bg-green-100",
        }
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          text: status,
          color: "text-blue-600 bg-blue-100",
        }
    }
  }

  const statusConfig = getStatusConfig(report.status)

  return (
    <Card>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-48 md:h-auto">
          <img
            src={report.imageUrl || "/placeholder.svg"}
            alt={report.title}
            className="h-full w-full object-cover md:rounded-l-lg"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{report.title}</h2>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{report.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Submitted on {report.date}</span>
              </div>
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
              {statusConfig.icon}
              <span className="ml-1">{statusConfig.text}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end">
            <Link href={`/report/details/${report.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}


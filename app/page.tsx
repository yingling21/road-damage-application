import Link from "next/link"
import { MapPin, AlertTriangle, Clock, CheckCircle, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DashboardMap from "@/app/dashboard-map";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-bold">RoadWatch</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  My Reports
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="sm">Login</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="relative">
          <DashboardMap />
          <div className="absolute bottom-4 right-4 z-10">
            <Link href="/report/new">
              <Button size="lg" className="rounded-full h-14 w-14 p-0">
                <Plus className="h-6 w-6" />
                <span className="sr-only">Report Damage</span>
              </Button>
            </Link>
          </div>
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="mx-auto w-full max-w-md">
              <div className="bg-background rounded-lg shadow-lg p-2">
                <div className="relative">
                  <input
                    className="w-full h-10 pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Search for a location..."
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                    Pending
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                    In Progress
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Resolved
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Recent Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard
              title="Pothole on Main Street"
              location="123 Main St"
              status="pending"
              date="2 hours ago"
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ReportCard
              title="Broken Traffic Light"
              location="5th Ave & Park St"
              status="in-progress"
              date="1 day ago"
              imageUrl="/placeholder.svg?height=200&width=300"
            />
            <ReportCard
              title="Road Crack"
              location="42 Elm Street"
              status="completed"
              date="3 days ago"
              imageUrl="/placeholder.svg?height=200&width=300"
            />
          </div>
          <div className="mt-6 text-center">
            <Link href="/reports">
              <Button variant="outline">View All Reports</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} RoadWatch. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

type ReportCardProps = {
  title: string;
  location: string;
  status: "pending" | "in-progress" | "completed"; // ✅ Correct type
  date: string;
  imageUrl?: string;
};

function ReportCard({title, location, status, date, imageUrl }: ReportCardProps) {
  return (
    <Card>
      <div className="relative">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
        <div className="absolute top-2 right-2">
          <StatusBadge status={status} />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-muted-foreground mt-1">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="mt-4">
          <Link href={`/report/details/1`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

type StatusBadgeProps = {
  status: "pending" | "in-progress" | "completed" ; // Ensure it matches ReportCardProps
};

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<StatusBadgeProps["status"], { color: string; icon: React.ReactNode; text: string }> = {
    pending: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertTriangle className="h-3 w-3 mr-1" />,
      text: "Pending",
    },
    "in-progress": {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <Clock className="h-3 w-3 mr-1" />,
      text: "In Progress",
    },
    completed: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
      text: "Completed",
    },
  }

  const config = statusConfig[status]

  return (
    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon}
      {config.text}
    </div>
  )
}
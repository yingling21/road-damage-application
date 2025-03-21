import Link from "next/link"
import { CheckCircle, ChevronLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="container max-w-md py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Report Submitted!</CardTitle>
          <CardDescription>Your road damage report has been successfully submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-left font-medium">Report ID:</div>
                <div className="text-right">RD-2023-1234</div>
                <div className="text-left font-medium">Submitted:</div>
                <div className="text-right">Just now</div>
                <div className="text-left font-medium">Status:</div>
                <div className="text-right">Pending Review</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation to your email. You can track the status of your report in the "My Reports"
              section.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/reports" className="w-full">
            <Button className="w-full">
              <ChevronLeft className="mr-2 h-4 w-4" />
              View My Reports
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}


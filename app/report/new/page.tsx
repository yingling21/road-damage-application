"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Camera, Upload, MapPin, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function NewReportPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [damageType, setDamageType] = useState("pothole")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining to handle null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Explicitly cast to string
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted successfully",
        description: "Your report has been sent to the local authorities.",
      });
      window.location.href = "/report/confirmation";
    }, 1500);
  }

  const detectLocation = () => {
    // Simulate geolocation
    setLocation("Detecting your location...")

    setTimeout(() => {
      setLocation("123 Main Street, New York, NY 10001")
    }, 1000)
  }

  return (
    <div className="container max-w-md py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-4 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Report Road Damage</CardTitle>
          <CardDescription>Help improve your community by reporting road issues</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Take or upload a photo of the damage</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => {
                        // In a real app, this would open the camera
                        // For this prototype, we'll just simulate an upload
                        document.getElementById("image-upload").click()
                      }}
                    >
                      <Camera className="h-6 w-6 mb-1" />
                      <span className="text-xs">Take Photo</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => document.getElementById("image-upload").click()}
                    >
                      <Upload className="h-6 w-6 mb-1" />
                      <span className="text-xs">Upload Photo</span>
                    </Button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {imagePreview && (
                    <div className="mt-4">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Damage preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button type="button" className="w-full" disabled={!imagePreview} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="damage-type">Type of damage</Label>
                  <RadioGroup
                    id="damage-type"
                    value={damageType}
                    onValueChange={setDamageType}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="pothole" id="pothole" className="peer sr-only" />
                      <Label
                        htmlFor="pothole"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <AlertTriangle className="mb-3 h-6 w-6" />
                        Pothole
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="traffic-light" id="traffic-light" className="peer sr-only" />
                      <Label
                        htmlFor="traffic-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <AlertTriangle className="mb-3 h-6 w-6" />
                        Traffic Light
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="road-crack" id="road-crack" className="peer sr-only" />
                      <Label
                        htmlFor="road-crack"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <AlertTriangle className="mb-3 h-6 w-6" />
                        Road Crack
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="other" id="other" className="peer sr-only" />
                      <Label
                        htmlFor="other"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <AlertTriangle className="mb-3 h-6 w-6" />
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={detectLocation}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={!location || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


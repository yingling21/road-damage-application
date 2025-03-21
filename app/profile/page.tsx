"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, User, Bell, Shield, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    reportUpdates: true,
    nearbyReports: false,
    emergencyAlerts: true,
    emailNotifications: true,
    pushNotifications: true,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
                <User className="h-24 w-24 p-4" />
              </div>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-center">
                <div className="text-sm text-muted-foreground">Member since June 2023</div>
                <div className="text-sm font-medium">5 Reports Submitted</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        ) : (
                          <div className="text-sm">{profileData.name}</div>
                        )}
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        ) : (
                          <div className="text-sm">{profileData.email}</div>
                        )}
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        ) : (
                          <div className="text-sm">{profileData.phone}</div>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="report-updates">Report Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive updates when your reports change status
                            </p>
                          </div>
                          <Switch
                            id="report-updates"
                            checked={notificationSettings.reportUpdates}
                            onCheckedChange={() => handleNotificationToggle("reportUpdates")}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="nearby-reports">Nearby Reports</Label>
                            <p className="text-sm text-muted-foreground">Get notified about new reports in your area</p>
                          </div>
                          <Switch
                            id="nearby-reports"
                            checked={notificationSettings.nearbyReports}
                            onCheckedChange={() => handleNotificationToggle("nearbyReports")}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts about major road hazards</p>
                          </div>
                          <Switch
                            id="emergency-alerts"
                            checked={notificationSettings.emergencyAlerts}
                            onCheckedChange={() => handleNotificationToggle("emergencyAlerts")}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Notification settings saved",
                        description: "Your notification preferences have been updated.",
                      })
                    }}
                  >
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy settings and account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="location-sharing">Location Sharing</Label>
                            <p className="text-sm text-muted-foreground">Allow the app to access your location</p>
                          </div>
                          <Switch id="location-sharing" defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="anonymous-reports">Anonymous Reports</Label>
                            <p className="text-sm text-muted-foreground">Submit reports without showing your name</p>
                          </div>
                          <Switch id="anonymous-reports" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Two-Factor Authentication
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out of All Devices
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 text-red-500">Danger Zone</h3>
                      <div className="space-y-4">
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


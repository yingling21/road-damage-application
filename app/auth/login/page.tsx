"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Github, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"; // If using absolute imports


export default function LoginPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    // Fix TypeScript error by specifying event types
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
  
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
  
        // Redirect to dashboard after successful login
        window.location.href = "/";
      }, 1500);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <a href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-lg font-medium">
          <AlertTriangle className="mr-2 h-6 w-6" />
          <span className="font-bold">RoadWatch</span>
        </a>
  
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="/auth/forgot-password" className="text-sm text-muted-foreground hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
  
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" type="button">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
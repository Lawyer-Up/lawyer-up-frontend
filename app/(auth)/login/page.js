"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    setIsOtpSent(true)
    // In a real app, you would send an OTP to the phone number here
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    // Handle signup logic here
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    // Handle forgot password logic here
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">Sign Up</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700">
                      Password
                    </Label>
                    <Button
                      variant="link"
                      className="px-0 text-xs font-normal text-blue-600"
                      onClick={() => document.getElementById("forgot-password-modal")?.showModal()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 border-slate-200"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10 text-slate-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Create an account</CardTitle>
              <CardDescription>Enter your details to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="name" placeholder="John Doe" className="pl-10 border-slate-200" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 border-slate-200"
                      required
                    />
                  </div>
                </div>

                {!isOtpSent ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-slate-700">
                      OTP
                    </Label>
                    <Input id="otp" placeholder="Enter OTP sent to your phone" className="border-slate-200" required />
                  </div>
                )}

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={!isOtpSent}>
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Forgot Password Modal */}
      <dialog id="forgot-password-modal" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-slate-600"
              onClick={() => document.getElementById("forgot-password-modal")?.close()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold text-slate-800">Reset Password</h3>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 border-slate-200"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Send Reset Link
            </Button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

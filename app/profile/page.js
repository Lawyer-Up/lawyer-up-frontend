"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, Mail, MapPin, Phone, User, 
  Briefcase, Calendar, Trophy, Target,
  Clock, CheckCircle2, AlertCircle, Users
} from "lucide-react";

export default function Home() {
  const user = {
    name: "Sarah Anderson",
    role: "Senior Criminal Lawyer",
    email: "sarah.anderson@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    department: "Product",
    status: "Active",
    bio: "Experienced product manager with 8+ years in tech, specializing in B2B SaaS products and team leadership.",
    skills: ["Product Strategy", "Team Leadership", "Agile Management", "User Research", "Data Analysis"],
    pastWork: [
      {
        title: "Customer Analytics Platform",
        company: "DataTech Solutions",
        period: "2020-2022",
        achievements: [
          "Led development of analytics dashboard used by 500+ enterprise clients",
          "Increased user engagement by 45%",
          "Managed team of 12 developers and designers"
        ]
      },
      {
        title: "E-commerce Mobile App",
        company: "ShopWise Inc.",
        period: "2018-2020",
        achievements: [
          "Launched successful mobile app with 1M+ downloads",
          "Achieved 4.8/5 star rating on App Store",
          "Generated $2.5M in first-year revenue"
        ]
      }
    ],
    metrics: {
      projectsCompleted: 24,
      teamsLed: 8,
      successRate: "94%"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} className="object-cover object-top"/>
              <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-xl text-muted-foreground">{user.role}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{user.status}</Badge>
                <Badge variant="outline">{user.department}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Projects Completed</span>
                  </div>
                  <span className="font-semibold">{user.metrics.projectsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Teams Led</span>
                  </div>
                  <span className="font-semibold">{user.metrics.teamsLed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span>Success Rate</span>
                  </div>
                  <span className="font-semibold">{user.metrics.successRate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle and Right Columns */}
          <div className="lg:col-span-2 space-y-6">


            <Card>
              <CardHeader>
                <CardTitle>Past Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user.pastWork.map((work, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{work.title}</h4>
                        <Badge variant="outline">{work.period}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{work.company}</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {work.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                      {index < user.pastWork.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
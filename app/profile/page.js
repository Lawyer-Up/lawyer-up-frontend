"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail, Phone, User, CheckCircle2, Users, Target
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      console.log("Retrieved token:", token);

      if (!token) {
        console.warn("No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/workspaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API status:", response.status);

        const text = await response.text();
        console.log("Raw API response:", text);

        if (response.ok) {
          const data = JSON.parse(text);
          setUser(data);
        } else {
          console.error("Failed to fetch profile:", text);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading user profile...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center text-red-500">User not found or not logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-xl text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{user.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{user.phone || "N/A"}</span>
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
                  <span className="font-semibold">{user.metrics?.projectsCompleted || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Teams Led</span>
                  </div>
                  <span className="font-semibold">{user.metrics?.teamsLed || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span>Success Rate</span>
                  </div>
                  <span className="font-semibold">{user.metrics?.successRate || "N/A"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.length ? user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  )) : <p className="text-sm text-muted-foreground">No skills listed</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Past Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user.pastWork?.length ? user.pastWork.map((work, index) => (
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
                  )) : <p className="text-sm text-muted-foreground">No work history available</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

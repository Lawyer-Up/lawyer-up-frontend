import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Scale,
  FileText,
  Shield,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 rounded-full bg-slate-800 flex items-center justify-center">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold">LawyerUP</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700">
              Legal Excellence Made Simple
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Your AI-Powered Legal Assistant
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Streamline your legal workflow, analyze cases efficiently, and make informed decisions with our intelligent legal platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto text-2xl py-6 px-12">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Key Features</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to enhance your legal practice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Case Analysis</h3>
                <p className="text-slate-600">
                  Analyze legal documents and cases with AI assistance to identify key points and precedents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Legal Compliance</h3>
                <p className="text-slate-600">
                  Ensure your documents and processes meet regulatory requirements with automated checks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Insights</h3>
                <p className="text-slate-600">
                  Track your legal performance metrics and gain insights to improve your practice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">Simple steps to get started with LawyerUP</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step, index) => {
              const steps = [
                {
                  title: "Create Your Account",
                  desc: "Sign up for a LawyerUP account to access our powerful legal tools."
                },
                {
                  title: "Upload Your Documents",
                  desc: "Upload your legal documents or create new cases directly in the platform."
                },
                {
                  title: "Get AI-Powered Insights",
                  desc: "Receive intelligent analysis and recommendations to enhance your legal work."
                }
              ];

              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center mb-4">
                      {step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{steps[index].title}</h3>
                    <p className="text-slate-600">{steps[index].desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Join thousands of legal professionals who are already using LawyerUP to streamline their workflow and improve outcomes.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white text-slate-900">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Privacy Policy</h2>
    <div className="space-y-8 text-base sm:text-lg leading-relaxed text-slate-700 shadow rounded-2xl p-4">
      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Data Collection</h3>
        <p>
          We collect only the necessary personal and document-related information to provide you with AI-assisted legal services.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Data Usage</h3>
        <p>
          Your information is used solely to enhance your experience on LawyerUP — from document analysis to personalized recommendations.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Data Security</h3>
        <p>
          We use secure encryption, authentication, and storage mechanisms to ensure your legal data remains confidential and protected.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Third-Party Sharing</h3>
        <p>
          We do not share your data with third parties, unless legally required or with your explicit consent.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Your Control</h3>
        <p>
          You can access, update, or delete your data at any time through your account settings. For help, contact us at 
          <a href="mailto:privacy@lawyerup.ai" className="text-blue-600 underline ml-1">privacy@lawyerup.ai</a>.
        </p>
      </div>
    </div>
  </div>
</section>

      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 mr-2 rounded-full bg-slate-800 flex items-center justify-center">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold">LawyerUP</h2>
            </div>

            <div className="flex gap-6">
              <Link href="/login" className="text-slate-600 hover:text-slate-900">
                Log in
              </Link>
              <Link href="/signup" className="text-slate-600 hover:text-slate-900">
                Sign up
              </Link>
              <Link href="/profile" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

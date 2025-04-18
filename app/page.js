import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Grid,
  List,
  ChevronDown,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function NotebookLM() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-800"></div>
          <h1 className="text-xl font-semibold">Lawyer</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-8 h-8 rounded-full bg-purple-600 text-white p-0"
            >
              H
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Sign Up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile">Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
          Welcome to Lawyer
          <span className="text-gray-800">, your AI-powered legal assistant</span>
        </h1>

        <div>
          <h2 className="text-2xl font-medium mb-4">My notebooks</h2>
          <div className="border-b border-gray-200 mb-4"></div>

          <div className="flex items-center justify-between mb-6">
          <Link href="/case-inputs">
            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Create new
            </Button>
            </Link>

            <div className="flex items-center">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2 h-9">
                    Most recent
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Most recent</DropdownMenuItem>
                  <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                  <DropdownMenuItem>Last modified</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Fully clickable notebook card */}
          <Link href="/workspace">
            <div className="w-64 h-48 bg-[#f8f3e2] rounded-md p-4 relative cursor-pointer hover:shadow-md transition">
              <div className="absolute top-4 left-4">
                <div className="w-6 h-6 bg-yellow-200 border border-yellow-400 flex items-center justify-center text-yellow-800">
                  📁
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-medium text-gray-800 mb-1">Untitled notebook</h3>
                <p className="text-sm text-gray-600">18 Apr 2025 · 0 sources</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}


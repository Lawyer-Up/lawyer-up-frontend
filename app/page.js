import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Plus,
  Grid,
  List,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

export default function NotebookLM() {
  return (
    <div className="min-h-screen bg-white">
      {/* NotebookLM Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-800"></div>
          <h1 className="text-xl font-semibold">LawyerUP</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-500" />
              ))}
            </div>
            <span className="sr-only">Apps</span>
          </Button>
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
            H
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
          Welcome to LawyerUP
        </h1>

        <div>
          <h2 className="text-2xl font-medium mb-4">My workspaces</h2>
          <div className="border-b border-gray-200 mb-4"></div>

          <div className="flex items-center justify-between mb-6">
            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Create new
            </Button>

            <div className="flex items-center">
              <div className="flex border rounded-l-md overflow-hidden">
                <Button
                  variant="ghost"
                  className="rounded-none border-r h-9 px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-none border-r h-9 px-3"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button variant="ghost" className="rounded-none h-9 px-3">
                  <List className="w-5 h-5" />
                </Button>
              </div>

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

          {/* Notebook Card */}
          <div className="w-64 h-48 bg-[#f8f3e2] rounded-md p-4 relative">
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
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                Untitled notebook
              </h3>
              <p className="text-sm text-gray-600">18 Apr 2025 · 0 sources</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

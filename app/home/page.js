"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, MoreVertical, Scale } from "lucide-react";
import Link from "next/link";

export default function WorkspaceGrid() {
  const [isLogin, setIsLogin] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
      
      if (token) {
        fetchWorkspaces(token);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchWorkspaces = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/workspaces', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
      } else {
        console.error('Failed to fetch workspaces');
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setIsLogin(false);
      setWorkspaces([]);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-slate-800 flex items-center justify-center">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">LawyerUP</h1>
        </div>

        {isLogin && (
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
                <Link href="/profile">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
          Your Workspaces
          <span className="text-gray-800">, legal matters organized</span>
        </h1>

        <div>
          <h2 className="text-2xl font-medium mb-4">My workspaces</h2>
          <div className="border-b border-gray-200 mb-4"></div>

          <div className="flex items-center justify-between mb-6">
            <Link href="/case-inputs">
              <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Create workspace
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

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p>Loading workspaces...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {workspaces.length > 0 ? (
                workspaces.map((workspace) => (
                  <Link href={`/workspace/${workspace.id}`} key={workspace.id}>
                    <div className="h-48 bg-[#f8f3e2] rounded-md p-4 relative cursor-pointer hover:shadow-md transition">
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
                        <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">
                          {workspace.name || "Untitled workspace"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(workspace.createdAt)} · 
                          {workspace.documents ? ` ${workspace.documents.length} docs` : ' 0 docs'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No workspaces found. Create your first workspace!</p>
                </div>
              )}
              
              {/* Always show "Create New" tile */}
              <Link href="/case-inputs">
                <div className="h-48 bg-gray-100 rounded-md p-4 relative cursor-pointer hover:shadow-md transition border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-blue-700" />
                    </div>
                    <p className="text-blue-700 font-medium">Create workspace</p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
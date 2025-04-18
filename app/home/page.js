"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  ChevronDown, 
  MoreVertical, 
  Scale, 
  User, 
  Briefcase, 
  LogOut, 
  SortDesc, 
  FolderPlus, 
  Clock,
  AlignLeft
} from "lucide-react";
import Link from "next/link";

export default function WorkspaceGrid() {
  const [isLogin, setIsLogin] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Most recent");

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
      const response = await fetch("http://localhost:3001/api/workspaces", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
      } else {
        console.error("Failed to fetch workspaces");
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3 rounded-lg bg-blue-600 flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">LawyerUP</h1>
            </div>

            {isLogin && (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                      <div className="bg-blue-100 text-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-1">
                    <DropdownMenuItem className="py-2" asChild>
                      <Link href="/profile" className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 text-red-600" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Your Workspaces</h1>
          <p className="text-gray-600 text-lg">Organize and manage your legal matters efficiently</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">My workspaces</h2>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9 bg-white">
                    <SortDesc className="mr-2 h-4 w-4" />
                    {sortOption}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption("Most recent")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Most recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("Alphabetical")}>
                    <AlignLeft className="mr-2 h-4 w-4" />
                    Alphabetical
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("Last modified")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Last modified
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Workspace Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Create Workspace Card */}
            <Link href="/case-inputs">
              <div className="group h-52 bg-white rounded-lg relative cursor-pointer transition-all hover:shadow-md border-2 border-dashed border-gray-300 hover:border-blue-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <FolderPlus className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-blue-600 font-medium text-lg">Create workspace</p>
                </div>
              </div>
            </Link>

            {loading ? (
              <div className="col-span-full flex justify-center items-center h-52 p-6">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                  <p className="text-gray-600">Loading workspaces...</p>
                </div>
              </div>
            ) : workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <Link href={`/workspace/${workspace.id}`} key={workspace.id}>
                  <div className="group h-52 bg-white rounded-lg p-5 relative cursor-pointer transition-all border border-gray-200 hover:shadow-md hover:border-blue-200">
                    <div className="absolute top-5 left-5">
                      <div className="w-8 h-8 bg-amber-100 border border-amber-200 rounded-md flex items-center justify-center text-amber-700">
                        📁
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-lg font-medium text-gray-800 mb-1 truncate group-hover:text-blue-700 transition-colors">
                        {workspace.name || "Untitled workspace"}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {formatDate(workspace.createdAt)} · 
                          {workspace.documents
                            ? ` ${workspace.documents.length} docs`
                            : " 0 docs"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg py-16 px-6">
                <div className="text-center">
                  <FolderPlus className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No workspaces found</h3>
                  <p className="mt-2 text-gray-500">Create your first workspace to get started.</p>
                  <div className="mt-6">
                    <Link href="/case-inputs">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create workspace
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
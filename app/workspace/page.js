import {
  Upload,
  Search,
  Plus,
  Share,
  Settings,
  Info,
  MoreVertical,
  FileText,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function NotebookApp() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-lg font-medium">Untitled case</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-gray-100">
            <Share className="w-4 h-4" />
            Share
          </button>
          <button className="p-1.5 rounded-md hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
            R
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sources Panel */}
        <div className="w-[400px] border-r flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium">Sources</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
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
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <line x1="9" x2="15" y1="3" y2="3"></line>
                <line x1="9" x2="15" y1="21" y2="21"></line>
                <line x1="3" x2="3" y1="9" y2="15"></line>
                <line x1="21" x2="21" y1="9" y2="15"></line>
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50">
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50">
                <Search className="w-4 h-4" />
                Discover
              </button>
            </div>

            <div className="space-y-3">
              {/* Example Source 1 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium">Case Brief: Smith v. Jones</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    2023 Supreme Court ruling on intellectual property rights
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600"
                />
              </div>

              {/* Example Source 2 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium">Legal Memo: Contract Analysis</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Detailed review of client&apos;s employment agreement terms
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600"
                />
              </div>

              {/* Example Source 3 */}
              <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium">Statute: Title VII</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Civil Rights Act of 1964, employment discrimination
                    provisions
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600"
                />
              </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <div className="w-16 h-16 mb-4 text-gray-300">
                <FileText className="w-full h-full" />
              </div>
              <p className="font-medium mb-1">Saved sources will appear here</p>
              <p className="text-sm">
                Click Add source above to add PDFs, websites, text, videos, or
                audio files. Or import a file directly from Google Drive.
              </p>
            </div> */}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-medium">Chat</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-4 mb-16">
            <div className="flex flex-col items-center justify-center max-w-md text-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                Add a source to get started
              </h3>
              <button className="px-5 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50 mb-40">
                Upload a source
              </button>
            </div>
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center gap-2 border rounded-full p-1 pr-2">
              <input
                type="text"
                placeholder="Upload a source to get started"
                className="flex-1 px-3 py-1.5 text-sm bg-transparent outline-none"
                disabled
              />
              <span className="text-xs text-gray-500">0 sources</span>
              <button
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white disabled:bg-blue-300"
                disabled
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Studio Panel */}
        <div className="w-[400px] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium">Studio</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
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
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <line x1="9" x2="15" y1="3" y2="3"></line>
                <line x1="9" x2="15" y1="21" y2="21"></line>
                <line x1="3" x2="3" y1="9" y2="15"></line>
                <line x1="21" x2="21" y1="9" y2="15"></line>
              </svg>
            </button>
          </div>

          {/* <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Audio Overview</h3>
                <Info className="w-5 h-5 text-gray-400" />
              </div>
  
              <div className="border rounded-xl p-4">
                <div className="flex gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M9 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Deep Dive conversation</p>
                    <p className="text-sm text-gray-500">Two hosts (English only)</p>
                  </div>
                </div>
  
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 border rounded-full text-sm font-medium hover:bg-gray-50">
                    Customize
                  </button>
                  <button className="flex-1 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300">
                    Generate
                  </button>
                </div>
              </div>
   */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Notes</h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              Add note
            </button>

            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Key Facts</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Plaintiff claims breach of contract</li>
                  <li>Defendant alleges misrepresentation</li>
                  <li>Contract signed on 15/03/2022</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Legal Issues</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Was there a valid contract?</li>
                  <li>Did defendant materially breach?</li>
                  <li>Applicable remedies</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Case Strategy</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Focus on defendant&apos;s admissions</li>
                  <li>Request internal communications</li>
                  <li>Prepare for summary judgment</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Next Steps</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Draft discovery requests</li>
                  <li>Schedule client meeting</li>
                  <li>Research similar cases</li>
                </ul>
              </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
              <div className="w-16 h-16 mb-4 text-gray-300">
                <FileText className="w-full h-full" />
              </div>
              <p className="font-medium mb-1">Saved notes will appear here</p>
              <p className="text-sm">
                Save a chat message to create a new note, or click Add note
                above.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 right-0 text-center py-1 text-xs text-gray-500 bg-gray-100">
        case can be inaccurate; please double check its responses.
      </div> */}
    </div>
  );
}

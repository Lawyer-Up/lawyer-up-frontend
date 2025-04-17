"use client"

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
    File,
    Folder,
    FolderOpen,
    X,
    ChevronDown,
  } from "lucide-react";
  import { useState } from "react";
  
  export default function NotebookApp() {
    const [showFileExplorer, setShowFileExplorer] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    const fileStructure = [
      {
        name: "Case",
        type: "folder",
        isOpen: true,
        children: [
          { name: "FIR", type: "file", content: "" },
          { name: "Past Crimes", type: "file", content: "" },
          { name: "Client Details", type: "file", content: "" },
        ]
      },
    ];
    
    const toggleFileExplorer = () => {
      if (selectedFile) {
        setSelectedFile(null);
      } else {
        setShowFileExplorer(!showFileExplorer);
      }
    };
    
    const openFile = (file) => {
      setSelectedFile(file);
    };

    const handleSendMessage = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        setMessages([...messages, { sender: 'user', text: inputValue }]);
        setInputValue('');
        
        // Add simulated response after 1 second
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'system', text: 'I\'m analyzing your request...' }]);
        }, 1000);
      }
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMessages([...messages, { sender: 'system', text: `Uploaded file: ${file.name}` }]);
      }
    };

    const FileExplorer = ({ items }) => {
      const [expandedFolders, setExpandedFolders] = useState({
        src: true
      });
      
      const toggleFolder = (folderName) => {
        setExpandedFolders({
          ...expandedFolders,
          [folderName]: !expandedFolders[folderName]
        });
      };
      
      return (
        <div className="p-2 space-y-1">
          {items.map((item, index) => (
            <div key={index}>
              {item.type === 'folder' ? (
                <div>
                  <div 
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => toggleFolder(item.name)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedFolders[item.name] ? '' : '-rotate-90'}`} />
                    {expandedFolders[item.name] ? 
                      <FolderOpen className="w-4 h-4 text-blue-500" /> : 
                      <Folder className="w-4 h-4 text-blue-500" />
                    }
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {expandedFolders[item.name] && item.children && (
                    <div className="ml-6">
                      <FileExplorer items={item.children} />
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ml-6"
                  onClick={() => openFile(item)}
                >
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };
  
    const FileModal = ({ file, onClose }) => {
      return (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">{file.name}</h3>
            </div>
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 font-mono text-sm bg-gray-50 overflow-auto">
            <pre>{file.content}</pre>
          </div>
        </div>
      );
    };
  
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
  
        <div className="flex h-[calc(100vh-64px)] relative">
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
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50"
                  onClick={toggleFileExplorer}
                >
                  {showFileExplorer ? <X className="w-4 h-4" /> : <File className="w-4 h-4" />}
                  {showFileExplorer ? "Close" : "Files"}
                </button>
              </div>
  
              {/* File explorer or sources */}
              {showFileExplorer && !selectedFile ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-2 border-b">
                    <span className="text-sm font-medium">File Explorer</span>
                  </div>
                  <FileExplorer items={fileStructure} />
                </div>
              ) : !selectedFile ? (
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
              ) : (
                <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
              )}
            </div>
          </div>
  
          {/* Chat Panel */}
          <div className="flex-1 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-medium">Chat</h2>
            </div>
  
            <div className="flex-1 flex flex-col p-4 mb-16 overflow-y-auto">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      id="file-upload"
                    />
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-lg font-medium mb-2">Upload a document to get started</p>
                    <p className="text-sm text-gray-500 mb-4">PDFs, Word docs, or text files</p>
                    <button 
                      className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      Select File
                    </button>
                  </label>
                </div>
              )}
            </div>
  
            <form onSubmit={handleSendMessage} className="p-3 border-t">
              <div className="flex items-center gap-2 border rounded-full p-1 pr-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-1.5 text-sm bg-transparent outline-none"
                />
                <button
                  type="submit"
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
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
  
            {/* Studio Content */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Notes</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
  
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50 mb-4">
                <Plus className="w-4 h-4" />
                Add note
              </button>
  
              <div className="grid grid-cols-2 gap-3">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
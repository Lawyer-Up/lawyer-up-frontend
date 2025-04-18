"use client";

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
  Edit,
  Save,
  FileInput,
  FilePlus,
  Trash2,
  Gavel,
  Calendar,
  Check,
  ChevronUp,
  Loader,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function NotebookApp() {
  const params = useParams();
  const workspaceId = params?.id;

  // State for file explorer and documents
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(null);
  const [fileStructure, setFileStructure] = useState([
    {
      name: "Case",
      type: "folder",
      isOpen: true,
      children: [
        { name: "Bail", type: "file", content: "This is the Bail Template." },
        {
          name: "Client Intake Form",
          type: "file",
          content: "Crime scene photographs.",
        },
        {
          name: "Civil Suit",
          type: "file",
          content: "Relevant legal documents.",
        },
        {
          name: "Writ Petition",
          type: "file",
          content: "Detailed forensic analysis.",
        },
        {
          name: "Power of Attorney",
          type: "file",
          content: "Detailed forensic analysis.",
        },
      ],
    },
    {
      name: "Generated Documents",
      type: "folder",
      isOpen: false,
      children: [],
    },
  ]);

  // Document generation states
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [documentType, setDocumentType] = useState("LegalNotice");
  const [recipient, setRecipient] = useState("");
  const [jurisdiction, setJurisdiction] = useState("State Specific");
  const [tone, setTone] = useState("Formal");
  const [customInstructions, setCustomInstructions] = useState("");
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);

  // CIBC states
  const [cibcList, setCibcList] = useState([]);
  const [selectedCibcId, setSelectedCibcId] = useState("");
  const [currentCibc, setCurrentCibc] = useState(null);
  const [isGeneratingCIBC, setIsGeneratingCIBC] = useState(false);

  // Fetch CIBC list when workspace changes
  useEffect(() => {
    if (workspaceId) {
      fetchCibcList();
    }
  }, [workspaceId]);

  const fetchCibcList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/cibc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCibcList(data);
        if (data.length > 0) {
          setSelectedCibcId(data[0].id);
          setCurrentCibc(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching CIBC list:", error);
    }
  };

  const generateCIBC = async () => {
    setIsGeneratingCIBC(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/cibc`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const cibc = await response.json();
        setCibcList([cibc, ...cibcList]);
        setSelectedCibcId(cibc.id);
        setCurrentCibc(cibc);
        setShowDocumentGenerator(true);
      }
    } catch (error) {
      console.error("Error generating CIBC:", error);
    } finally {
      setIsGeneratingCIBC(false);
    }
  };

  const generateDocument = async () => {
    if (!selectedCibcId || !recipient) return;

    setIsGeneratingDocument(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        documentType,
        recipient,
        jurisdiction,
        tone,
        customInstructions,
        cibcId: selectedCibcId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/generate-document`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const document = await response.json();

        // Create a name for the document
        const docName = `${documentType
          .replace(/([A-Z])/g, " $1")
          .trim()} - ${recipient}`;

        // Add to generated documents folder
        const updatedFileStructure = [...fileStructure];
        const generatedFolder = updatedFileStructure.find(
          (f) => f.name === "Generated Documents"
        );

        if (generatedFolder) {
          generatedFolder.children.push({
            name: docName,
            type: "file",
            content: document.content,
            isGenerated: true,
          });

          setFileStructure(updatedFileStructure);

          // Open the generated document
          openFile({
            name: docName,
            type: "file",
            content: document.content,
            isGenerated: true,
          });
        }

        setShowDocumentGenerator(false);
        setRecipient("");
        setCustomInstructions("");
      }
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setIsGeneratingDocument(false);
    }
  };

  const openFile = (file) => {
    const existingIndex = openFiles.findIndex((f) => f.name === file.name);

    if (existingIndex >= 0) {
      setActiveFileIndex(existingIndex);
    } else {
      setOpenFiles([...openFiles, file]);
      setActiveFileIndex(openFiles.length);
    }
  };

  const closeFile = (index) => {
    const newOpenFiles = [...openFiles];
    newOpenFiles.splice(index, 1);
    setOpenFiles(newOpenFiles);

    if (activeFileIndex === index) {
      setActiveFileIndex(
        newOpenFiles.length > 0 ? newOpenFiles.length - 1 : null
      );
    } else if (activeFileIndex > index) {
      setActiveFileIndex(activeFileIndex - 1);
    }
  };

  const FileExplorer = ({ items, path = [] }) => {
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleFolder = (folderName) => {
      setExpandedFolders({
        ...expandedFolders,
        [folderName]: !expandedFolders[folderName],
      });
    };

    return (
      <div className="p-2 space-y-1">
        {items.map((item, index) => (
          <div key={index}>
            {item.type === "folder" ? (
              <div>
                <div
                  className="group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => toggleFolder(item.name)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFolders[item.name] ? "" : "-rotate-90"
                      }`}
                    />
                    {expandedFolders[item.name] ? (
                      <FolderOpen className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Folder className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-sm">{item.name}</span>
                  </div>
                </div>
                {expandedFolders[item.name] && item.children && (
                  <div className="ml-6 relative">
                    <FileExplorer
                      items={item.children}
                      path={[...path, item.name]}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ml-6"
                onClick={() => openFile(item)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{item.name}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-lg font-medium">Workspace: {workspaceId}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
            R
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Left Sidebar */}
        <div className="w-[400px] border-r flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium">Sources</h2>
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={generateCIBC}
              disabled={isGeneratingCIBC}
            >
              {isGeneratingCIBC ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Gavel className="w-4 h-4" />
                  <span>Generate CIBC</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                <span className="text-sm font-medium">File Explorer</span>
                <button
                  onClick={() => setShowFileExplorer(!showFileExplorer)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {showFileExplorer ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <File className="w-4 h-4" />
                  )}
                </button>
              </div>
              {showFileExplorer && <FileExplorer items={fileStructure} />}
            </div>

            {/* CIBC List */}
            {cibcList.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">CIBC Documents</span>
                  <button
                    className="p-1 hover:bg-gray-200 rounded text-xs"
                    onClick={() =>
                      setShowDocumentGenerator(!showDocumentGenerator)
                    }
                  >
                    {showDocumentGenerator ? "Hide" : "Generate Document"}
                  </button>
                </div>
                <div className="p-2 space-y-1 max-h-40 overflow-y-auto">
                  {cibcList.map((cibc) => (
                    <div
                      key={cibc.id}
                      className={`group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                        selectedCibcId === cibc.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedCibcId(cibc.id);
                        setCurrentCibc(cibc);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Gavel className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{cibc.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(cibc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Document Generator Panel */}
            {showDocumentGenerator && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Document Generator
                  </span>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => setShowDocumentGenerator(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Document Type
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    >
                      <option value="LegalNotice">Legal Notice</option>
                      <option value="BailApplication">Bail Application</option>
                      <option value="ClientEmail">Client Email</option>
                      <option value="CourtReply">Court Reply</option>
                      <option value="Affidavit">Affidavit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Recipient
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="e.g., Court, Client, Opposition"
                      className="w-full p-2 border rounded text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jurisdiction
                    </label>
                    <input
                      type="text"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      placeholder="e.g., Delhi High Court"
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    >
                      <option value="Formal">Formal</option>
                      <option value="Assertive">Assertive</option>
                      <option value="Conciliatory">Conciliatory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Custom Instructions (Optional)
                    </label>
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="Any specific requirements..."
                      className="w-full p-2 border rounded text-sm h-20"
                    />
                  </div>

                  <button
                    onClick={generateDocument}
                    disabled={!recipient || isGeneratingDocument}
                    className={`w-full py-2 rounded text-sm font-medium text-white ${
                      !recipient || isGeneratingDocument
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isGeneratingDocument ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </div>
                    ) : (
                      "Generate Document"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 border-r flex flex-col">
          {activeFileIndex !== null ? (
            <>
              <div className="flex items-center border-b overflow-x-auto">
                {openFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-3 py-2 border-r hover:bg-gray-50 cursor-pointer ${
                      activeFileIndex === index ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setActiveFileIndex(index)}
                  >
                    <FileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{file.name}</span>
                    <button
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(index);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col h-full">
                <div className="p-2 border-b flex justify-end gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 text-sm rounded hover:bg-gray-100">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="p-4 flex-1 font-mono text-sm bg-gray-50 overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {openFiles[activeFileIndex].content}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">No document open</p>
              <p className="text-sm">
                Select a file from the explorer or generate a new document
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-[400px] flex flex-col border-l">
          <div className="p-4 border-b">
            <h2 className="font-medium">Document Details</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {activeFileIndex !== null ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Document Information</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">
                      {openFiles[activeFileIndex].name}
                    </p>
                    {openFiles[activeFileIndex].isGenerated && (
                      <p className="text-xs text-gray-500 mt-1">
                        AI Generated Document
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 border rounded text-sm hover:bg-gray-50">
                      <div className="flex items-center justify-center gap-2">
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </div>
                    </button>
                    <button className="p-2 border rounded text-sm hover:bg-gray-50">
                      <div className="flex items-center justify-center gap-2">
                        <FilePlus className="w-4 h-4" />
                        <span>Save As</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Info className="w-8 h-8 mb-2" />
                <p>No document selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

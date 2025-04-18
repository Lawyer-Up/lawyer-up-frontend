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
  // Get the workspace ID from URL params
  const params = useParams();
  const workspaceId = params?.id;

  // File explorer and document states
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
 
  // File structure and management states
  const [fileStructure, setFileStructure] = useState([
    {
      name: "Case",
      type: "folder",
      isOpen: true,
      children: [
        { name: "Bail", type: "file", content: "This is the Bail Template." },
        { name: "Client Intake Form", type: "file", content: "Crime scene photographs." },
        { name: "Civil Suit", type: "file", content: "Relevant legal documents." },
        { name: "Writ Petition", type: "file", content: "Detailed forensic analysis." },
        { name: "Power of Attorney", type: "file", content: "Detailed forensic analysis." }
      ]
    }
  ]);
  const [addedFiles, setAddedFiles] = useState([]);
  const [showFileOptions, setShowFileOptions] = useState(false);
 
  // CIBC and document generation states
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGeneratingCIBC, setIsGeneratingCIBC] = useState(false);
  const [cibcList, setCibcList] = useState([]);
  const [selectedCibcId, setSelectedCibcId] = useState("");
  const [currentCibc, setCurrentCibc] = useState(null);
  
  // Document generation form states
  const [documentType, setDocumentType] = useState('LegalNotice');
  const [recipient, setRecipient] = useState('');
  const [jurisdiction, setJurisdiction] = useState('State Specific');
  const [tone, setTone] = useState('Formal');
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);
  
  // Argument generator states
  const [showArgumentGenerator, setShowArgumentGenerator] = useState(false);
  const [argumentPoints, setArgumentPoints] = useState([]);
  const [isGeneratingArguments, setIsGeneratingArguments] = useState(false);
 
  // Sidebar states
  const [showFullSummary, setShowFullSummary] = useState(false);
 
  // Notes states
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
 
  // Timeline states
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  // Case summary content
  const [caseSummary, setCaseSummary] = useState(
    "This is a comprehensive summary of the ongoing case. It includes all key points, relevant laws, and important dates. " +
    "The client is accused of violating section 420 of the IPC. The defense will argue lack of intent based on the evidence collected. " +
    "Key witnesses include John Doe and Jane Smith who were present at the scene. The next hearing is scheduled for November 15th. " +
    "The prosecution is expected to present forensic evidence and call their first witness. Our strategy will focus on challenging " +
    "the chain of custody for the evidence and establishing reasonable doubt about our client's involvement. " +
    "\n\nImportant deadlines:\n- Submit motion to suppress: October 30\n- Expert witness disclosure: November 5\n- Pretrial conference: November 10"
  );

  useEffect(() => {
    if (workspaceId) {
      fetchNotes();
      fetchTimelineEvents();
      fetchCibcList();
    }
  }, [workspaceId]);

  // Fetch CIBC list from API
  const fetchCibcList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/cibc`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCibcList(data);
        if (data.length > 0) {
          setSelectedCibcId(data[0].id);
          setCurrentCibc(data[0]);
        }
      } else {
        console.error('Failed to fetch CIBC list');
      }
    } catch (error) {
      console.error('Error fetching CIBC list:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/notes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Generate CIBC for the case
  const generateCIBC = async () => {
    setIsGeneratingCIBC(true);
    setShowGenerateModal(false);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/cibc`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const cibc = await response.json();
        setCibcList([cibc, ...cibcList]);
        setSelectedCibcId(cibc.id);
        setCurrentCibc(cibc);
        setMessages([...messages, { 
          sender: 'system', 
          text: 'CIBC generated successfully!' 
        }]);
        setShowDocumentGenerator(true);
      } else {
        const error = await response.json();
        setMessages([...messages, { 
          sender: 'system', 
          text: `Failed to generate CIBC: ${error.error}` 
        }]);
      }
    } catch (error) {
      console.error('Error generating CIBC:', error);
      setMessages([...messages, { 
        sender: 'system', 
        text: 'Error generating CIBC. Please try again.' 
      }]);
    } finally {
      setIsGeneratingCIBC(false);
    }
  };

  useEffect(() => {
    const fetchCaseSummary = async () => {
      if (!workspaceId) return;
      
      setIsLoadingSummary(true);
      setSummaryError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/case`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const caseData = await response.json();
          // Format the case data into a summary string
          const summary = formatCaseSummary(caseData);
          setCaseSummary(summary);
        } else {
          throw new Error('Failed to fetch case data');
        }
      } catch (error) {
        console.error('Error fetching case summary:', error);
        setSummaryError(error.message);
        // Set a default summary if there's an error
        setCaseSummary(
          "This is a comprehensive summary of the ongoing case. It includes all key points, relevant laws, and important dates."
        );
      } finally {
        setIsLoadingSummary(false);
      }
    };
  
    fetchCaseSummary();
  }, [workspaceId]);
  
  // Helper function to format case data into a summary
  const formatCaseSummary = (caseData) => {
    return `
      Client: ${caseData.clientName || 'Not provided'}
      Case Type: ${caseData.caseType || 'Not specified'}
      
      Description:
      ${caseData.description || 'No description available'}
      
      Key Facts:
      - Date: ${caseData.factsDate ? new Date(caseData.factsDate).toLocaleDateString() : 'Not specified'}
      - Location: ${caseData.factsPlace || 'Not specified'}
      - Witnesses: ${caseData.factsWitnesses || 'None listed'}
      
      Police Station: ${caseData.policeStation || 'Not specified'}
      Opposing Party: ${caseData.opposingParty || 'Not specified'}
      
      Urgency: ${caseData.urgency || 'Standard'}
    `;
  };

  // Generate document based on CIBC
  const generateDocument = async () => {
    if (!selectedCibcId) {
      setMessages([...messages, { 
        sender: 'system', 
        text: 'Please select a CIBC first' 
      }]);
      return;
    }

    setIsGeneratingDocument(true);
    
    try {
      const token = localStorage.getItem('token');
      const payload = {
        documentType,
        recipient,
        jurisdiction,
        tone,
        customInstructions,
        cibcId: selectedCibcId
      };
      
      const response = await fetch(`/api/workspaces/${workspaceId}/generate-document`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const document = await response.json();
        
        // Add the generated document to files
        const newFile = {
          name: `${documentType}_${recipient}.txt`,
          type: 'file',
          content: document.content
        };
        
        setAddedFiles([...addedFiles, newFile]);
        openFile(newFile);
        
        setMessages([...messages, { 
          sender: 'system', 
          text: 'Document generated successfully!' 
        }]);
        
        setShowDocumentGenerator(false);
      } else {
        const error = await response.json();
        setMessages([...messages, { 
          sender: 'system', 
          text: `Failed to generate document: ${error.error}` 
        }]);
      }
    } catch (error) {
      console.error('Error generating document:', error);
      setMessages([...messages, { 
        sender: 'system', 
        text: 'Error generating document. Please try again.' 
      }]);
    } finally {
      setIsGeneratingDocument(false);
    }
  };

  // Choose a CIBC from the list
  const selectCibc = (cibcId) => {
    setSelectedCibcId(cibcId);
    const selected = cibcList.find(cibc => cibc.id === cibcId);
    if (selected) {
      setCurrentCibc(selected);
    }
  };

// Generate arguments from API
const generateArguments = async () => {
  setIsGeneratingArguments(true);
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/generate-arguments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        documentContent: openFiles[activeFileIndex]?.content || ''
      })
    });

    if (response.ok) {
      const data = await response.json();
      setArgumentPoints(data.arguments);
    } else {
      throw new Error('Failed to generate arguments');
    }
  } catch (error) {
    console.error('Error generating arguments:', error);
    // Fallback mock arguments
    setArgumentPoints([
      "Establish duty of care between the parties based on contractual relationship",
      "Demonstrate breach of duty through documented communications",
      "Show causation between breach and financial harm with accounting records",
      "Quantify damages using financial statements and expert testimony"
    ]);
  } finally {
    setIsGeneratingArguments(false);
  }
};

  const fetchTimelineEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/timeline`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTimelineEvents(data);
      }
    } catch (error) {
      console.error('Error fetching timeline events:', error);
    }
  };

  // Add argument to notes
  const addArgumentToNotes = (point) => {
    const newNote = {
      id: Date.now(),
      content: point,
      createdAt: new Date()
    };
    setNotes([...notes, newNote]);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newNote })
      });
  
      if (response.ok) {
        const note = await response.json();
        setNotes([note, ...notes]);
        setNewNote('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

// Add timeline event to API
const addTimelineEvent = async () => {
  if (!newEventTitle.trim() || !newEventDate) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/timeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newEventTitle,
        date: newEventDate,
        completed: false
      })
    });

    if (response.ok) {
      const event = await response.json();
      setTimelineEvents([...timelineEvents, event]);
      setNewEventTitle('');
      setNewEventDate('');
    }
  } catch (error) {
    console.error('Error adding timeline event:', error);
  }
};

// Delete timeline event from API
const deleteTimelineEvent = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/timeline/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      setTimelineEvents(timelineEvents.filter(event => event.id !== id));
    }
  } catch (error) {
    console.error('Error deleting timeline event:', error);
  }
};


  const toggleEventCompletion = async (id) => {
    try {
      const event = timelineEvents.find(e => e.id === id);
      if (!event) return;
  
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/timeline/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !event.completed })
      });
  
      if (response.ok) {
        setTimelineEvents(timelineEvents.map(e =>
          e.id === id ? { ...e, completed: !e.completed } : e
        ));
      }
    } catch (error) {
      console.error('Error updating timeline event:', error);
    }
  };

  // Toggle file explorer visibility
  const toggleFileExplorer = () => {
    setShowFileExplorer(!showFileExplorer);
  };
 
  // Open a file in the editor
  const openFile = (file) => {
    // Check if this is already open
    const existingFileIndex = openFiles.findIndex(f => 
      (f.isCibc && file.isCibc && f.cibcId === file.cibcId) || 
      (!f.isCibc && !file.isCibc && f.name === file.name)
    );
    
    if (existingFileIndex >= 0) {
      setActiveFileIndex(existingFileIndex);
      setEditedContent(openFiles[existingFileIndex].content);
    } else {
      setOpenFiles([...openFiles, file]);
      setActiveFileIndex(openFiles.length);
      setEditedContent(file.content);
    }
    setEditMode(false);
  };

  // Close a file
  const closeFile = (index, e) => {
    e?.stopPropagation();
   
    const newOpenFiles = [...openFiles];
    newOpenFiles.splice(index, 1);
    setOpenFiles(newOpenFiles);
   
    if (activeFileIndex === index) {
      if (newOpenFiles.length > 0) {
        setActiveFileIndex(index >= newOpenFiles.length ? newOpenFiles.length - 1 : index);
        setEditedContent(newOpenFiles[index >= newOpenFiles.length ? newOpenFiles.length - 1 : index].content);
      } else {
        setActiveFileIndex(null);
        setEditedContent('');
      }
    } else if (activeFileIndex > index) {
      setActiveFileIndex(activeFileIndex - 1);
    }
  };

  // Handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');
     
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'system', text: 'I\'m analyzing your request...' }]);
      }, 1000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a .txt file
      if (!file.name.endsWith('.txt')) {
        alert('Please select a .txt file');
        return;
      }
     
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const newFile = {
          name: file.name,
          type: 'file',
          content: content
        };
       
        setAddedFiles([...addedFiles, newFile]);
        setMessages([...messages, { sender: 'system', text: `Uploaded file: ${file.name}` }]);
      };
      reader.readAsText(file);
    }
    setShowFileOptions(false);
  };

  // Regenerate arguments
  const regenerateArguments = async () => {
    setIsGeneratingArguments(true);
    await generateArguments();
  };

  // Create new text file
  const createNewTextFile = () => {
    const fileName = `New Document ${addedFiles.length + 1}.txt`;
    const newFile = {
      name: fileName,
      type: 'file',
      content: ''
    };
   
    setAddedFiles([...addedFiles, newFile]);
    setShowFileOptions(false);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      const updatedFiles = [...openFiles];
      updatedFiles[activeFileIndex].content = editedContent;
      setOpenFiles(updatedFiles);
    }
    setEditMode(!editMode);
  };

  const FileExplorer = ({ items, path = [] }) => {
    const [expandedFolders, setExpandedFolders] = useState({
      Case: true,
      "Legal Research": false,
      "Correspondence": false
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
                <div className="group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                  <div
                    className="flex items-center gap-2 flex-1"
                    onClick={() => toggleFolder(item.name)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedFolders[item.name] ? '' : '-rotate-90'}`} />
                    {expandedFolders[item.name] ?
                      <FolderOpen className="w-4 h-4 text-blue-500" /> :
                      <Folder className="w-4 h-4 text-blue-500" />
                    }
                    <span className="text-sm">{item.name}</span>
                  </div>
                </div>
                {expandedFolders[item.name] && item.children && (
                  <div className="ml-6 relative">
                    <FileExplorer items={item.children} path={[...path, item.name]} />
                  </div>
                )}
              </div>
            ) : (
              <div className="group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ml-6">
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={() => openFile(item)}
                >
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

          <div className="p-4 space-y-4">
            <div className="flex gap-3">
            </div>

            {showFileExplorer && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">File Explorer</span>
                </div>
                <FileExplorer items={fileStructure} />
              </div>
            )}

            <div className="flex gap-3">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50"
                onClick={() => setShowFileOptions(!showFileOptions)}
              >
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

            {showFileOptions && (
              <div className="border rounded-lg p-4 space-y-3">
                <label className="w-full flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <FileInput className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <h3 className="font-medium">Upload Document</h3>
                    <p className="text-sm text-gray-500">Upload an existing document</p>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt"
                  />
                </label>
              </div>
            )}

            {/* CIBC List */}
            {cibcList.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">CIBC Documents</span>
                  <button
                    className="p-1 hover:bg-gray-200 rounded text-xs"
                    onClick={() => setShowDocumentGenerator(!showDocumentGenerator)}
                  >
                    {showDocumentGenerator ? "Hide" : "Generate Document"}
                  </button>
                </div>
                <div className="p-2 space-y-1 max-h-40 overflow-y-auto">
                  {cibcList.map((cibc) => (
                    <div
                      key={cibc.id}
                      className={`group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                        selectedCibcId === cibc.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        selectCibc(cibc.id);
                        // Open the CIBC in a new tab
                        const cibcFile = {
                          name: cibc.title,
                          type: 'file',
                          content: cibc.content,
                          isCibc: true,
                          cibcId: cibc.id
                        };
                        openFile(cibcFile);
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
                  <span className="text-sm font-medium">Document Generator</span>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => setShowDocumentGenerator(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Document Type</label>
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
                    <label className="block text-xs font-medium text-gray-700 mb-1">Recipient</label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="e.g., Court, Client, Opposition"
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Jurisdiction</label>
                    <input
                      type="text"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      placeholder="e.g., Delhi High Court"
                      className="w-full p-2 border rounded text-sm"
                      defaultValue="State Specific"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tone</label>
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
                    <label className="block text-xs font-medium text-gray-700 mb-1">Custom Instructions (Optional)</label>
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
                      !recipient || isGeneratingDocument ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {isGeneratingDocument ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </div>
                    ) : (
                      'Generate Document'
                    )}
                  </button>
                </div>
              </div>
            )}

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
              <span className="text-sm font-medium">Case Summary</span>
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={() => setShowFullSummary(!showFullSummary)}
              >
                {showFullSummary ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className={`p-3 ${showFullSummary ? '' : 'max-h-[120px] overflow-hidden'} relative`}>
              {isLoadingSummary ? (
                <div className="flex items-center justify-center py-4">
                  <Loader className="w-5 h-5 animate-spin text-gray-500" />
                </div>
              ) : summaryError ? (
                <div className="text-sm text-red-500">
                  Error loading summary: {summaryError}
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {caseSummary}
                  </p>
                  {!showFullSummary && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                      <button
                        className="text-xs text-blue-500 hover:text-blue-700 mb-1"
                        onClick={() => setShowFullSummary(true)}
                      >
                        Expand
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

            {/* Added Files Section */}
            {addedFiles.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">Added Files</span>
                </div>
                <div className="p-2 space-y-1">
                  {addedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => openFile(file)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddedFiles(addedFiles.filter((_, i) => i !== index));
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 border-r flex flex-col">
          {activeFileIndex !== null ? (
            <>
              <div className="flex items-center border-b overflow-x-auto">
                {openFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-3 py-2 border-r hover:bg-gray-50 cursor-pointer ${
                      activeFileIndex === index ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setActiveFileIndex(index)}
                  >
                    {file.isCibc ? (
                      <Gavel className="w-4 h-4 text-blue-500 mr-2" />
                    ) : (
                      <FileText className="w-4 h-4 text-gray-500 mr-2" />
                    )}
                    <span className="text-sm">{file.name}</span>
                    <button
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                      onClick={(e) => closeFile(index, e)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
             
              <div className="flex flex-col h-full">
                <div className="p-2 border-b flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowArgumentGenerator(!showArgumentGenerator);
                      if (!showArgumentGenerator) {
                        generateArguments();
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded hover:bg-gray-100"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Arguments</span>
                  </button>
                  <button
                    onClick={toggleEditMode}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded hover:bg-gray-100"
                  >
                    {editMode ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 flex-1 font-mono text-sm bg-gray-50 overflow-auto">
                  {editMode ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-full p-2 border rounded bg-white"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap">{openFiles[activeFileIndex].content}</pre>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="font-medium">Chat</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <MessageSquare className="w-10 h-10 mb-4" />
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start a conversation by typing below</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
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
          )}
        </div>

{/* Right Sidebar */}
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

  <div className="p-4 space-y-4 overflow-y-auto flex-1">
    {showArgumentGenerator ? (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Argument Generator</h3>
          <button
            onClick={() => setShowArgumentGenerator(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
       
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2">Analyzing: {openFiles[activeFileIndex]?.name || 'Current Document'}</h4>
          <p className="text-sm text-gray-600 mb-3">
            Based on the document content, here are potential legal arguments:
          </p>
         
          {isGeneratingArguments ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {argumentPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="flex-1 p-3 bg-white border rounded text-sm">
                    {point}
                  </div>
                  <button
                    onClick={() => addArgumentToNotes(point)}
                    className="p-2 text-blue-500 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
       
        <div className="border-t pt-4">
          <button
            onClick={regenerateArguments}
            className="w-full py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          >
            Regenerate Arguments
          </button>
        </div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notes</h3>
          <button
            onClick={() => {
              setShowArgumentGenerator(true);
              if (activeFileIndex !== null) {
                generateArguments();
              }
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded hover:bg-gray-100"
          >
            <Gavel className="w-4 h-4" />
            <span>Arguments</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="flex-1 p-2 border rounded text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
            />
            <button
              onClick={addNote}
              disabled={!newNote.trim()}
              className={`px-3 py-2 rounded text-sm font-medium ${!newNote.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No notes yet</p>
            ) : (
              notes
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((note) => (
                  <div key={note.id} className="border rounded-lg p-3 bg-white group">
                    <div className="flex justify-between">
                      <p className="text-sm">{note.content}</p>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>
      </>
    )}
  </div>

  {/* Timeline Section */}
  <div className="border-t p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-medium">Case Timeline</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder="Event title"
          className="p-2 border rounded text-sm w-32"
          onKeyDown={(e) => e.key === 'Enter' && addTimelineEvent()}
        />
        <input
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="p-2 border rounded text-sm w-32"
        />
        <button
          onClick={addTimelineEvent}
          disabled={!newEventTitle.trim() || !newEventDate}
          className={`p-2 rounded text-sm ${!newEventTitle.trim() || !newEventDate ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>

    <ul className="space-y-1">
      {timelineEvents.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No events yet</p>
      ) : (
        timelineEvents
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((event) => (
            <li
              key={event.id}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${event.completed ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              onClick={() => toggleEventCompletion(event.id)}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${event.completed ? 'bg-green-100 border-green-300' : 'border-gray-300'}`}>
                {event.completed && <Check className="w-3 h-3 text-green-500" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${event.completed ? 'line-through text-gray-500' : ''}`}>
                  {event.title}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTimelineEvent(event.id);
                }}
                className="p-1 text-red-500 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))
      )}
    </ul>
  </div>
</div>
</div>
</div>
)}
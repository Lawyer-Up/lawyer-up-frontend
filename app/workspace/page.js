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
} from "lucide-react";
import { useState } from "react";

export default function NotebookApp() {
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
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
  const [newItemType, setNewItemType] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [addingItemPath, setAddingItemPath] = useState([]);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showArgumentGenerator, setShowArgumentGenerator] = useState(false);
  const [argumentPoints, setArgumentPoints] = useState([]);
  const [isGeneratingArguments, setIsGeneratingArguments] = useState(false);
  
  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, content: "Client meeting scheduled for next week", createdAt: new Date() },
    { id: 2, content: "Review evidence documents", createdAt: new Date() }
  ]);
  const [newNote, setNewNote] = useState('');
  
  // Timeline state
  const [timelineEvents, setTimelineEvents] = useState([
    { 
      id: 1, 
      title: "First Hearing", 
      date: "2023-11-15", 
      completed: false 
    },
    { 
      id: 2, 
      title: "Evidence Submission", 
      date: "2023-12-01", 
      completed: false 
    }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const generateArguments = () => {
    setIsGeneratingArguments(true);
    
    setTimeout(() => {
      const exampleArguments = [
        "Establish duty of care between the parties based on contractual relationship",
        "Demonstrate breach of duty through documented communications",
        "Show causation between breach and financial harm with accounting records",
        "Quantify damages using financial statements and expert testimony"
      ];
      
      setArgumentPoints(exampleArguments);
      setIsGeneratingArguments(false);
    }, 1500);
  };

  const addArgumentToNotes = (point) => {
    const newNote = {
      id: Date.now(),
      content: point,
      createdAt: new Date()
    };
    setNotes([...notes, newNote]);
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        createdAt: new Date()
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const addTimelineEvent = () => {
    if (newEventTitle.trim() && newEventDate) {
      const event = {
        id: Date.now(),
        title: newEventTitle,
        date: newEventDate,
        completed: false
      };
      setTimelineEvents([...timelineEvents, event]);
      setNewEventTitle('');
      setNewEventDate('');
    }
  };

  const deleteTimelineEvent = (id) => {
    setTimelineEvents(timelineEvents.filter(event => event.id !== id));
  };

  const toggleEventCompletion = (id) => {
    setTimelineEvents(timelineEvents.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const toggleFileExplorer = () => {
    setShowFileExplorer(!showFileExplorer);
    cancelAddingItem();
  };
  
  const openFile = (file) => {
    const existingFileIndex = openFiles.findIndex(f => f.name === file.name);
    
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
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const newFile = {
          name: file.name,
          type: 'file',
          content: content
        };
        
        setOpenFiles([...openFiles, newFile]);
        setActiveFileIndex(openFiles.length);
        setEditedContent(content);
        setFileStructure([...fileStructure, newFile]);
        setMessages([...messages, { sender: 'system', text: `Uploaded file: ${file.name}` }]);
      };
      reader.readAsText(file);
    }
    setShowFileOptions(false);
  };

  const createNewTextFile = () => {
    const fileName = `New Document ${openFiles.length + 1}.txt`;
    const newFile = {
      name: fileName,
      type: 'file',
      content: ''
    };
    
    setOpenFiles([...openFiles, newFile]);
    setActiveFileIndex(openFiles.length);
    setEditedContent('');
    setFileStructure([...fileStructure, newFile]);
    setEditMode(true);
    setShowFileOptions(false);
  };

  const toggleEditMode = () => {
    if (editMode) {
      const updatedFiles = [...openFiles];
      updatedFiles[activeFileIndex].content = editedContent;
      setOpenFiles(updatedFiles);
    }
    setEditMode(!editMode);
  };

  const startAddingItem = (type, path = []) => {
    setNewItemType(type);
    setNewItemName('');
    setAddingItemPath(path);
  };

  const cancelAddingItem = () => {
    setNewItemType(null);
    setNewItemName('');
    setAddingItemPath([]);
  };

  const confirmAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem = {
      name: newItemName.trim(),
      type: newItemType,
      ...(newItemType === 'file' ? { content: '' } : { children: [] })
    };

    const updateStructure = (items, pathIndex = 0) => {
      return items.map(item => {
        if (pathIndex < addingItemPath.length && item.name === addingItemPath[pathIndex]) {
          if (item.type === 'folder') {
            return {
              ...item,
              children: pathIndex === addingItemPath.length - 1 
                ? [...(item.children || []), newItem] 
                : updateStructure(item.children || [], pathIndex + 1)
            };
          }
        }
        return item;
      });
    };

    if (addingItemPath.length === 0) {
      setFileStructure([...fileStructure, newItem]);
    } else {
      setFileStructure(updateStructure(fileStructure));
    }

    cancelAddingItem();
  };

  const deleteItem = (item, path = []) => {
    const updateStructure = (items) => {
      return items.filter(i => {
        if (i.name === item.name && i.type === item.type) {
          const fileIndex = openFiles.findIndex(f => f.name === item.name);
          if (fileIndex >= 0) {
            closeFile(fileIndex);
          }
          return false;
        }
        if (i.type === 'folder' && i.children) {
          i.children = updateStructure(i.children);
        }
        return true;
      });
    };

    if (path.length === 0) {
      setFileStructure(updateStructure(fileStructure));
    } else {
      const updateNestedStructure = (items, pathIndex = 0) => {
        return items.map(i => {
          if (pathIndex < path.length && i.name === path[pathIndex]) {
            if (i.type === 'folder') {
              return {
                ...i,
                children: pathIndex === path.length - 1 
                  ? updateStructure(i.children || [])
                  : updateNestedStructure(i.children || [], pathIndex + 1)
              };
            }
          }
          return i;
        });
      };
      setFileStructure(updateNestedStructure(fileStructure));
    }

    setItemToDelete(null);
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
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <button 
                      className="p-1 hover:bg-gray-200 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        startAddingItem('folder', [...path, item.name]);
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-200 rounded text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete({ item, path: [...path, item.name] });
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {expandedFolders[item.name] && item.children && (
                  <div className="ml-6 relative">
                    <FileExplorer items={item.children} path={[...path, item.name]} />
                    {addingItemPath.length === path.length + 1 && 
                     addingItemPath.every((name, i) => name === [...path, item.name][i]) && (
                      <div className="flex items-center gap-1 ml-6 mt-1">
                        <button 
                          className="p-1 hover:bg-gray-200 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            startAddingItem('file', [...path, item.name]);
                          }}
                        >
                          <FileText className="w-3 h-3" />
                        </button>
                      </div>
                    )}
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
                <button 
                  className="p-1 hover:bg-gray-200 rounded text-red-500 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemToDelete({ item, path: [...path, item.name] });
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
        
        {newItemType && addingItemPath.length === path.length && 
         addingItemPath.every((name, i) => name === path[i]) && (
          <div className="ml-6 mt-1 flex items-center gap-2">
            {newItemType === 'folder' ? (
              <Folder className="w-4 h-4 text-blue-500" />
            ) : (
              <FileText className="w-4 h-4 text-gray-500" />
            )}
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`${newItemType} name...`}
              className="flex-1 text-sm px-2 py-1 border rounded outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmAddItem();
                if (e.key === 'Escape') cancelAddingItem();
              }}
            />
            <button 
              onClick={confirmAddItem}
              className="p-1 text-green-600 hover:bg-gray-100 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={cancelAddingItem}
              className="p-1 text-red-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
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
              <button 
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50"
                onClick={() => startAddingItem('folder')}
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

            {showFileExplorer ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">File Explorer</span>
                  {!newItemType && (
                    <button 
                      className="p-1 hover:bg-gray-200 rounded"
                      onClick={() => startAddingItem('folder')}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <FileExplorer items={fileStructure} />
              </div>
            ) : (
              <div className="space-y-3"></div>
            )}
          </div>
          {openFiles.length > 0 && (
              <form onSubmit={handleSendMessage} className="border rounded-lg p-3">
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
            )}
        </div>

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
                    <FileText className="w-4 h-4 text-gray-500 mr-2" />
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
                    <pre>{openFiles[activeFileIndex].content}</pre>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="font-medium">Files</h2>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-4 mb-16 overflow-y-auto">
                {showFileOptions ? (
                  <div className="w-full max-w-md space-y-4">
                    <button
                      onClick={createNewTextFile}
                      className="w-full flex items-center justify-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <FilePlus className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <h3 className="font-medium">Create New Text File</h3>
                        <p className="text-sm text-gray-500">Start with a blank document</p>
                      </div>
                    </button>
                    <label className="w-full flex items-center justify-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <FileInput className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <h3 className="font-medium">Upload from Device</h3>
                        <p className="text-sm text-gray-500">Upload an existing document</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        id="file-upload"
                      />
                    </label>
                    <button
                      onClick={() => setShowFileOptions(false)}
                      className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-lg font-medium mb-2">Upload a document to get started</p>
                    <p className="text-sm text-gray-500 mb-4">PDFs, Word docs, or text files</p>
                    <button 
                      className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
                      onClick={() => setShowFileOptions(true)}
                    >
                      Select File
                    </button>
                  </>
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
          )}
        </div>

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
                    onClick={generateArguments}
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
                    onClick={() => setShowArgumentGenerator(true)}
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
                      className="px-3 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {notes
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
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Simplified Timeline at the bottom */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Case Timeline</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="Add event"
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
                  className="p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ul className="space-y-1">
              {timelineEvents
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
                ))}
            </ul>
          </div>
        </div>
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="font-medium mb-4">Delete {itemToDelete.item.type}</h3>
            <p className="mb-6">Are you sure you want to delete "{itemToDelete.item.name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteItem(itemToDelete.item, itemToDelete.path)}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
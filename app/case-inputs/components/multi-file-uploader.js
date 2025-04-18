"use client"

import React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"



export function MultiFileUploader({ id, accept, onFilesSelect, currentFiles }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      onFilesSelect([...currentFiles, ...newFiles])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      onFilesSelect([...currentFiles, ...newFiles])
    }
  }

  const handleRemoveFile = (index) => {
    const updatedFiles = [...currentFiles]
    updatedFiles.splice(index, 1)
    onFilesSelect(updatedFiles)
  }

  return (
    <div className="mt-1 space-y-3">
      <div
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mb-2 h-6 w-6 text-gray-400" />
        <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
        <input
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          multiple
        />
      </div>

      {currentFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files ({currentFiles.length})</p>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            {currentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-2"
              >
                <span className="truncate text-sm">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFile(index)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

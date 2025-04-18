"use client"

import React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"


export function FileUploader({ id, accept, onFileSelect, currentFile }) {
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
      const file = e.dataTransfer.files[0]
      onFileSelect(file)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onFileSelect(file)
    }
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="mt-1">
      {!currentFile ? (
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
          <p className="text-sm text-gray-600">Drag and drop a file here or click to browse</p>
          <input
            id={id}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3">
          <span className="truncate text-sm">{currentFile.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFile()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

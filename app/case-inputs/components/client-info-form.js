"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploader } from "./file-uploader"



export function ClientInfoForm({ data, updateData, onNext }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, file) => {
    updateData({ [name]: file })
  }

  const validate = () => {
    const newErrors = {}

    if (!data.name) newErrors.name = "Name is required"
    if (!data.age) newErrors.age = "Age is required"
    if (!data.contact) newErrors.contact = "Contact number is required"
    if (!data.firReport) newErrors.firReport = "FIR report is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Client Information</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Client Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" value={data.name} onChange={handleChange} placeholder="Full legal name" />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">
            Age <span className="text-red-500">*</span>
          </Label>
          <Input
            id="age"
            name="age"
            value={data.age}
            onChange={handleChange}
            placeholder="Client's age"
            type="number"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">
            Contact Number <span className="text-red-500">*</span>
          </Label>
          <Input id="contact" name="contact" value={data.contact} onChange={handleChange} placeholder="Mobile number" />
          {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email address"
            type="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            name="occupation"
            value={data.occupation}
            onChange={handleChange}
            placeholder="Client's occupation"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="address">Residential Address</Label>
        <Textarea
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Complete residential address"
          rows={3}
        />
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">Document Uploads</h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="firReport">
                FIR Report <span className="text-red-500">*</span>
              </Label>
              <FileUploader
                id="firReport"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onFileSelect={(file) => handleFileChange("firReport", file)}
                currentFile={data.firReport}
              />
              {errors.firReport && <p className="text-sm text-red-500">{errors.firReport}</p>}
              <p className="mt-1 text-xs text-gray-500">Upload a soft copy of the FIR report (PDF, Word, or Image)</p>
            </div>

            <div>
              <Label htmlFor="idProof">ID Proof</Label>
              <FileUploader
                id="idProof"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onFileSelect={(file) => handleFileChange("idProof", file)}
                currentFile={data.idProof}
              />
              <p className="mt-1 text-xs text-gray-500">Upload client's ID proof (Aadhaar, PAN, Voter ID, etc.)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button type="submit">Next: Case Details</Button>
      </div>
    </form>
  )
}

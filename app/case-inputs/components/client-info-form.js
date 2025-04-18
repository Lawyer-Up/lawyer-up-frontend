"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploader } from "./file-uploader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";




export function ClientInfoForm({ data, updateData, onNext }) {

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, file) => {
    updateData({ [name]: file })
  }

  const handleUrgencyChange = (value) => {
    updateData({ urgency: value })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
      onNext()
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">
            Contact Number <span className="text-red-500">*</span>
          </Label>
          <Input id="contact" name="contact" value={data.contact} onChange={handleChange} placeholder="Mobile number" />
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

      <div className="space-y-2 mt-4">
          <Label>
            Case Urgency <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={data.urgency} onValueChange={handleUrgencyChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="critical" id="critical" />
              <Label htmlFor="critical" className="font-normal">
                Critical (Immediate attention required)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="font-normal">
                High (Urgent but not immediate)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="font-normal">
                Medium (Standard timeline)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="font-normal">
                Low (No immediate deadlines)
              </Label>
            </div>
          </RadioGroup>
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
                accept=".txt"
                onFileSelect={(file) => handleFileChange("firReport", file)}
                currentFile={data.firReport}
              />
              <p className="mt-1 text-xs text-gray-500">Upload a soft copy of the FIR report ( Word or txt file)</p>
            </div>

            {/* <div>
              <Label htmlFor="idProof">ID Proof</Label>
              <FileUploader
                id="idProof"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onFileSelect={(file) => handleFileChange("idProof", file)}
                currentFile={data.idProof}
              />
              <p className="mt-1 text-xs text-gray-500">Upload client's ID proof (Aadhaar, PAN, Voter ID, etc.)</p>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button type="submit">Next: Case Details</Button>
      </div>
    </form>
  )
}

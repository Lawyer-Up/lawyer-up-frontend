"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { MultiFileUploader } from "./multi-file-uploader"

export function DocumentsForm({ data, updateData, onNext, onPrev }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleUrgencyChange = (value) => {
    updateData({ urgency: value })
  }

  const handleFilesChange = (name,files) => {
    updateData({ [name]: files })
  }

  const validate = () => {
    const newErrors = {}

    if (!data.urgency) newErrors.urgency = "Please select case urgency"

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
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Documents & Additional Information</h2>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-medium">Court Orders & Supporting Documents</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="courtOrders">Court Orders (if any)</Label>
                <MultiFileUploader
                  id="courtOrders"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onFilesSelect={(files) => handleFilesChange("courtOrders", files)}
                  currentFiles={data.courtOrders}
                />
                <p className="mt-1 text-xs text-gray-500">Upload any previous court orders related to this case</p>
              </div>

              <div>
                <Label htmlFor="supportingDocs">Supporting Documents</Label>
                <MultiFileUploader
                  id="supportingDocs"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onFilesSelect={(files) => handleFilesChange("supportingDocs", files)}
                  currentFiles={data.supportingDocs}
                />
                <p className="mt-1 text-xs text-gray-500">Upload any supporting documents, evidence, or exhibits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="legalHistory">Legal History</Label>
          <Textarea
            id="legalHistory"
            name="legalHistory"
            value={data.legalHistory}
            onChange={handleChange}
            placeholder="Previous legal proceedings, judgments, or settlements related to this case"
            rows={4}
          />
        </div>

        <div className="space-y-2">
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
          {errors.urgency && <p className="text-sm text-red-500">{errors.urgency}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes for Lawyer</Label>
          <Textarea
            id="notes"
            name="notes"
            value={data.notes}
            onChange={handleChange}
            placeholder="Any additional information or special instructions for the lawyer"
            rows={5}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous: Case Details
        </Button>
        <Button type="submit">Submit Case Information</Button>
      </div>
    </form>
  )
}

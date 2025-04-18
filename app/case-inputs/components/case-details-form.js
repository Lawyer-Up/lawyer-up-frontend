"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"


export function CaseDetailsForm({ data, updateData, onNext, onPrev }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFactsChange = (e) => {
    const { name, value } = e.target
    updateData({
      facts: {
        ...data.facts,
        [name]: value,
      },
    })
  }

  const handleSelectChange = (value) => {
    updateData({ caseType: value })
  }

  const validate = () => {
    const newErrors = {}

    if (!data.caseType) newErrors.caseType = "Case type is required"
    if (!data.description) newErrors.description = "Case description is required"
    if (!data.facts.date) newErrors.date = "Incident date is required"
    if (!data.facts.place) newErrors.place = "Incident place is required"

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
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Case Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="caseType">
            Type of Case <span className="text-red-500">*</span>
          </Label>
          <Select value={data.caseType} onValueChange={handleSelectChange}>
            <SelectTrigger id="caseType" className="w-full">
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="criminal">Criminal</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
              <SelectItem value="family">Family Law</SelectItem>
              <SelectItem value="property">Property Dispute</SelectItem>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="consumer">Consumer Protection</SelectItem>
              <SelectItem value="labor">Labor Law</SelectItem>
              <SelectItem value="tax">Tax Dispute</SelectItem>
              <SelectItem value="intellectual">Intellectual Property</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.caseType && <p className="text-sm text-red-500">{errors.caseType}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Brief Description of the Case <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Provide a brief description of the case"
            rows={4}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-medium">Facts of the Case</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Date of Incident <span className="text-red-500">*</span>
                </Label>
                <Input id="date" name="date" type="date" value={data.facts.date} onChange={handleFactsChange} />
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">
                  Place of Incident <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="place"
                  name="place"
                  value={data.facts.place}
                  onChange={handleFactsChange}
                  placeholder="Location where incident occurred"
                />
                {errors.place && <p className="text-sm text-red-500">{errors.place}</p>}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="witnesses">Witnesses (if any)</Label>
              <Textarea
                id="witnesses"
                name="witnesses"
                value={data.facts.witnesses}
                onChange={handleFactsChange}
                placeholder="Names and contact details of witnesses"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="policeStation">Police Station</Label>
            <Input
              id="policeStation"
              name="policeStation"
              value={data.policeStation}
              onChange={handleChange}
              placeholder="Name of police station where FIR was filed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="opposingParty">Opposing Party</Label>
            <Input
              id="opposingParty"
              name="opposingParty"
              value={data.opposingParty}
              onChange={handleChange}
              placeholder="Name of opposing party/defendant"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="previousCounsel">Previous Legal Counsel (if any)</Label>
          <Input
            id="previousCounsel"
            name="previousCounsel"
            value={data.previousCounsel}
            onChange={handleChange}
            placeholder="Details of any previous legal representation"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous: Client Info
        </Button>
        <Button type="submit">Next: Documents & Notes</Button>
      </div>
    </form>
  )
}

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

  

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Case Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Select value={data.caseType} onValueChange={handleSelectChange}>
            <SelectTrigger id="caseType" className="w-full">
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CRIMINAL">Criminal</SelectItem>
              <SelectItem value="CIVIL">Civil</SelectItem>
              <SelectItem value="FAMILY">Family Law</SelectItem>
              <SelectItem value="PROPERTY">Property Dispute</SelectItem>
              <SelectItem value="CORPORATE">Corporate Law</SelectItem>
              <SelectItem value="CONSUMER">Consumer Protection</SelectItem>
              <SelectItem value="LABOR">Labor Law</SelectItem>
              <SelectItem value="TAX">Tax Dispute</SelectItem>
              <SelectItem value="INTELLECTUAL">Intellectual Property</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Provide a brief description of the case"
            rows={4}
          />
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-medium">Facts of the Case</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                
                <Input id="date" name="date" type="date" value={data.facts.date} onChange={handleFactsChange} />
              </div>

              <div className="space-y-2">
                
                <Input
                  id="place"
                  name="place"
                  value={data.facts.place}
                  onChange={handleFactsChange}
                  placeholder="Location where incident occurred"
                />
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

"use client"

import { useState } from "react"
import { ClientInfoForm } from "./client-info-form"
import { CaseDetailsForm } from "./case-details-form"
import { DocumentsForm } from "./documents-form"
import { FormSummary } from "./form-summary"
import { Progress } from "@/components/ui/progress"



export default function CaseForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    clientInfo: {
      name: "",
      age: "",
      contact: "",
      address: "",
      email: "",
      occupation: "",
      firReport: null,
      idProof: null,
    },
    caseDetails: {
      caseType: "",
      description: "",
      facts: {
        date: "",
        place: "",
        witnesses: "",
      },
      policeStation: "",
      opposingParty: "",
      previousCounsel: "",
    },
    documents: {
      courtOrders: [],
      supportingDocs: [],
      legalHistory: "",
      urgency: "",
      notes: "",
    },
  })

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // For demonstration, we just move to the summary step
    nextStep()
  }

  const progressPercentage = (((step - 1) / 3) * 100).toFixed(0)

  return (
    <div className="mx-auto max-w-4xl rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-700">Step {step} of 4</span>
          <span className="text-sm font-medium text-gray-700">{progressPercentage}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {step === 1 && (
        <ClientInfoForm
          data={formData.clientInfo}
          updateData={(data) => updateFormData("clientInfo", data)}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <CaseDetailsForm
          data={formData.caseDetails}
          updateData={(data) => updateFormData("caseDetails", data)}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {step === 3 && (
        <DocumentsForm
          data={formData.documents}
          updateData={(data) => updateFormData("documents", data)}
          onNext={handleSubmit}
          onPrev={prevStep}
        />
      )}

      {step === 4 && <FormSummary data={formData} onPrev={prevStep} />}
    </div>
  )
}

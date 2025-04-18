"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"



export function FormSummary({ data, onPrev }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">Case Information Submitted</h2>
        <p className="text-muted-foreground">
          Your case information has been successfully submitted. Here's a summary of the details provided.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.clientInfo.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.clientInfo.age}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Contact</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.clientInfo.contact}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.clientInfo.email || "Not provided"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.clientInfo.address || "Not provided"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">FIR Report</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.clientInfo.firReport ? data.clientInfo.firReport.name : "Not uploaded"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Case Type</dt>
              <dd className="mt-1 capitalize text-sm text-gray-900">{data.caseDetails.caseType}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Incident Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.caseDetails.facts.date}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Incident Place</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.caseDetails.facts.place}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Police Station</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.caseDetails.policeStation || "Not provided"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Case Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.caseDetails.description}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents & Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Court Orders</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.documents.courtOrders.length > 0
                  ? `${data.documents.courtOrders.length} document(s) uploaded`
                  : "None uploaded"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Supporting Documents</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.documents.supportingDocs.length > 0
                  ? `${data.documents.supportingDocs.length} document(s) uploaded`
                  : "None uploaded"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Case Urgency</dt>
              <dd className="mt-1 capitalize text-sm text-gray-900">{data.documents.urgency || "Not specified"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Legal History</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.documents.legalHistory || "Not provided"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Additional Notes</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.documents.notes || "No additional notes"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Edit Information
        </Button>
        <Link href="/workspace">
        <Button type="button">
          Done
        </Button>
        </Link>
      </div>
    </div>
  )
}

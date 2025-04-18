"use client"

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClientInfoForm } from "./client-info-form"
import { CaseDetailsForm } from "./case-details-form"
import { DocumentsForm } from "./documents-form"
import { FormSummary } from "./form-summary"
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

export default function CaseForm({ workspaceId }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientInfo: {
      name: "",
      age: "",
      contact: "",
      address: "",
      email: "",
      occupation: "",
      firReport: "",
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
  });

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Get token from localStorage or your auth state
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You must be logged in to create a case.");
        return;
      }

      // Process and upload files first
      const processedFormData = { ...formData };
      const uploadedFileUrls = {
        idProof: null,
        courtOrders: [],
        supportingDocs: [],
      };

      // Handle ID proof upload
      if (formData.clientInfo.idProof instanceof File) {
        try {
          const formDataObj = new FormData();
          formDataObj.append('file', formData.clientInfo.idProof);
          formDataObj.append('title', 'ID Proof');
          formDataObj.append('type', 'CLIENT_DOCUMENT');
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/documents`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formDataObj
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload ID proof: ${response.statusText}`);
          }
          
          const result = await response.json();
          uploadedFileUrls.idProof = result.fileUrl;
        } catch (error) {
          console.error("Error uploading ID proof:", error);
          toast.error("Failed to upload ID proof.");
          // Continue with other uploads
        }
      }
      
      // Handle court orders uploads
      if (formData.documents.courtOrders.length > 0) {
        const courtOrderPromises = formData.documents.courtOrders.map(async (file) => {
          if (file instanceof File) {
            try {
              const formDataObj = new FormData();
              formDataObj.append('file', file);
              formDataObj.append('title', file.name || 'Court Order');
              formDataObj.append('type', 'COURT_ORDER');
              
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/documents`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formDataObj
              });
              
              if (!response.ok) {
                throw new Error(`Failed to upload court order: ${response.statusText}`);
              }
              
              const result = await response.json();
              return result.fileUrl;
            } catch (error) {
              console.error("Error uploading court order:", error);
              return null;
            }
          } else if (typeof file === 'string') {
            return file; // Already a URL
          }
          return null;
        });
        
        const courtOrderResults = await Promise.all(courtOrderPromises);
        uploadedFileUrls.courtOrders = courtOrderResults.filter(url => url !== null);
      }
      
      // Handle supporting docs uploads
      if (formData.documents.supportingDocs.length > 0) {
        const supportingDocsPromises = formData.documents.supportingDocs.map(async (file) => {
          if (file instanceof File) {
            try {
              const formDataObj = new FormData();
              formDataObj.append('file', file);
              formDataObj.append('title', file.name || 'Supporting Document');
              formDataObj.append('type', 'SUPPORTING_DOC');
              
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/documents`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formDataObj
              });
              
              if (!response.ok) {
                throw new Error(`Failed to upload supporting document: ${response.statusText}`);
              }
              
              const result = await response.json();
              return result.fileUrl;
            } catch (error) {
              console.error("Error uploading supporting document:", error);
              return null;
            }
          } else if (typeof file === 'string') {
            return file; // Already a URL
          }
          return null;
        });
        
        const supportingDocResults = await Promise.all(supportingDocsPromises);
        uploadedFileUrls.supportingDocs = supportingDocResults.filter(url => url !== null);
      }

      // Prepare the final data for case creation
      const finalFormData = {
        clientInfo: {
          ...formData.clientInfo,
          idProof: uploadedFileUrls.idProof || formData.clientInfo.idProof
        },
        caseDetails: formData.caseDetails,
        documents: {
          ...formData.documents,
          courtOrders: uploadedFileUrls.courtOrders,
          supportingDocs: uploadedFileUrls.supportingDocs
        }
      };
      
      // Create case with all the data
      const caseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/case`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalFormData)
      });
      
      if (!caseResponse.ok) {
        const errorData = await caseResponse.json();
        throw new Error(errorData.error || 'Failed to create case');
      }
      
      const caseData = await caseResponse.json();
      
      toast.success("Case has been created successfully.");
      
      // Navigate to the workspace page
      router.push(`/workspace/${workspaceId}`);
      
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error(error.message || "Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
      nextStep(); // Show summary even if there was an error
    }
  };

  const progressPercentage = (((step - 1) / 3) * 100).toFixed(0);

  return (
    <div className="mx-auto max-w-4xl rounded-lg border bg-white p-6 shadow-md">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-700">Step {step} of 4</span>
          <span className="text-sm font-medium text-gray-700">{progressPercentage}% Complete</span>
        </div>
        <Progress value={parseInt(progressPercentage)} className="h-2" />
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
          isSubmitting={isSubmitting}
        />
      )}

      {step === 4 && <FormSummary data={formData} onPrev={prevStep} />}
    </div>
  );
}
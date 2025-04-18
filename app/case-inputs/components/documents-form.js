"use client"

import { useState, useEffect } from "react";

export function DocumentsForm({ data, updateData, onNext, onPrev, isSubmitting }) {
  const [courtOrderFiles, setCourtOrderFiles] = useState([]);
  const [supportingDocFiles, setSupportingDocFiles] = useState([]);

  useEffect(() => {
    // Initialize file lists if data is provided
    if (data.courtOrders && data.courtOrders.length > 0) {
      setCourtOrderFiles(data.courtOrders);
    }
    if (data.supportingDocs && data.supportingDocs.length > 0) {
      setSupportingDocFiles(data.supportingDocs);
    }
  }, []);

  const handleCourtOrderUpload = (e) => {
    const files = Array.from(e.target.files);
    setCourtOrderFiles((prev) => [...prev, ...files]);
    updateData({ courtOrders: [...courtOrderFiles, ...files] });
  };

  const handleSupportingDocUpload = (e) => {
    const files = Array.from(e.target.files);
    setSupportingDocFiles((prev) => [...prev, ...files]);
    updateData({ supportingDocs: [...supportingDocFiles, ...files] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-bold">Documents & Additional Information</h2>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Court Orders</label>
        <input
          type="file"
          multiple
          onChange={handleCourtOrderUpload}
          className="w-full rounded border border-gray-300 p-2"
        />
        {courtOrderFiles.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Selected files:</p>
            <ul className="list-disc pl-5">
              {courtOrderFiles.map((file, index) => (
                <li key={index}>{file.name || file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Supporting Documents</label>
        <input
          type="file"
          multiple
          onChange={handleSupportingDocUpload}
          className="w-full rounded border border-gray-300 p-2"
        />
        {supportingDocFiles.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Selected files:</p>
            <ul className="list-disc pl-5">
              {supportingDocFiles.map((file, index) => (
                <li key={index}>{file.name || file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Legal History</label>
        <textarea
          name="legalHistory"
          value={data.legalHistory}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
          rows="3"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Urgency</label>
        <select
          name="urgency"
          value={data.urgency}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        >
          <option value="">Select Urgency</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Additional Notes</label>
        <textarea
          name="notes"
          value={data.notes}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
          rows="4"
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
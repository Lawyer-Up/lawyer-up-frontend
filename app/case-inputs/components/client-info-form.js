import { useState, useEffect } from "react";

export function ClientInfoForm({ data, updateData, onNext }) {
  const [idProofFile, setIdProofFile] = useState(null);

  useEffect(() => {
    if (data.idProof instanceof File) {
      setIdProofFile(data.idProof);
    }
  }, [data.idProof]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdProofFile(file);
      updateData({ idProof: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-bold">Client Information</h2>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Contact Number</label>
        <input
          type="tel"
          name="contact"
          value={data.contact}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Address</label>
        <textarea
          name="address"
          value={data.address}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
          rows="3"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">Occupation</label>
        <input
          type="text"
          name="occupation"
          value={data.occupation}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">FIR Report (if applicable)</label>
        <textarea
          name="firReport"
          value={data.firReport || ""}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
          rows="3"
        />
      </div>
      
      <div className="mb-4">
        <label className="mb-2 block font-medium">ID Proof</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full rounded border border-gray-300 p-2"
        />
        {idProofFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected file: {idProofFile.name}
          </p>
        )}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}
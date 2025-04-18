import CaseForm from "./components/case-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Legal Case Management System</h1>
        <CaseForm />
      </div>
    </main>
  )
}

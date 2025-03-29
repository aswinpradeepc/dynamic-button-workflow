import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import ConfigForm from './components/ConfigForm'
import DynamicButton from './components/DynamicButton'
import logo from './assets/logo.png'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-4 items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                  Dynamic Button Workflow
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <Button variant="ghost">Config</Button>
                </Link>
                <Link to="/output">
                  <Button variant="outline">Output</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ConfigPage />} />
            <Route path="/output" element={<OutputPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Config Page Component
function ConfigPage() {
  const handleSave = (config) => {
    localStorage.setItem('buttonConfig', JSON.stringify(config))
    alert('Configuration saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Button Configuration</h2>
        <ConfigForm onSave={handleSave} />
      </div>
    </div>
  )
}

// Output Page Component
function OutputPage() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const savedConfig = localStorage.getItem('buttonConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Dynamic Button</h2>
        <DynamicButton config={config} />
      </div>
    </div>
  )
}

export default App

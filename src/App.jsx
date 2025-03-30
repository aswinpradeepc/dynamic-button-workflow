import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import ConfigForm from './components/ConfigForm'
import DynamicButton from './components/DynamicButton'
import SavedConfigs from './components/SavedConfigs'
import logo from './assets/logo.png'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-100 to-emerald-50 bg-gradient-animate">
        <div className="fixed w-full top-4 px-4 z-10">
          <nav className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg mx-auto max-w-7xl">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="text-black hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200"
                    >
                      Config
                    </Button>
                  </Link>
                  <Link to="/output">
                    <Button
                      variant="outline"
                      className="text-black hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200"
                    >
                      Output
                    </Button>
                  </Link>
                  <Link to="/saved">
                    <Button
                      variant="outline"
                      className="text-black hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200"
                    >
                      Saved Configs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto py-24 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ConfigPage />} />
            <Route path="/output" element={<OutputPage />} />
            <Route path="/saved" element={<SavedConfigs />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Config Page Component
function ConfigPage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSave = (config) => {
    // Save current config
    localStorage.setItem('buttonConfig', JSON.stringify(config));
    
    // Save to saved configs list
    const savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '[]');
    savedConfigs.push(config);
    localStorage.setItem('savedConfigs', JSON.stringify(savedConfigs));
    
    alert('Configuration saved successfully!');
    navigate('/output'); // Redirect to the output page
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Button Configuration</h2>
        <ConfigForm onSave={handleSave} />
      </div>
    </div>
  );
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

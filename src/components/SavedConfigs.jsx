import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Trash2, Play, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SavedConfigs = () => {
  const [configs, setConfigs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedConfigs = localStorage.getItem('savedConfigs')
    if (savedConfigs) {
      setConfigs(JSON.parse(savedConfigs))
    }
  }, [])

  const handleDelete = (index) => {
    const newConfigs = configs.filter((_, i) => i !== index)
    setConfigs(newConfigs)
    localStorage.setItem('savedConfigs', JSON.stringify(newConfigs))
  }

  const handleLoad = (config) => {
    localStorage.setItem('buttonConfig', JSON.stringify(config))
    navigate('/output')
    window.location.reload()
  }

  const handleEdit = (config) => {
    // Store the config to edit
    localStorage.setItem('buttonConfig', JSON.stringify(config))
    // Clear any previous config after storing it
    const savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '[]')
    const updatedConfigs = savedConfigs.filter(c => 
      c.buttonLabel !== config.buttonLabel || 
      JSON.stringify(c.actions) !== JSON.stringify(config.actions)
    )
    localStorage.setItem('savedConfigs', JSON.stringify(updatedConfigs))
    // Navigate to config page
    navigate('/')
  }

  return (
    <div>
      <main>
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-black font-bold mb-8">Saved Configurations</h1>
            {configs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No saved configurations yet</p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  Create New Configuration
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configs.map((config, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{config.buttonLabel || 'Unnamed Configuration'}</h3>
                      <div className="space-y-2">
                        <p className="text-gray-600">Actions: {config.actions.length}</p>
                        <div className="flex flex-wrap gap-2">
                          {config.actions.map((action, actionIndex) => (
                            <span key={actionIndex} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                              {action.type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => handleLoad(config)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Load
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(config)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SavedConfigs

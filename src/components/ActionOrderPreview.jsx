import { ArrowDown } from 'lucide-react'

const ActionOrderPreview = ({ actions }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-start p-4 border-l min-h-[200px] space-y-4">
      <h3 className="text-lg font-semibold mb-4">Action Flow</h3>
      {actions.map((action, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-32 h-16 border rounded-lg flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow">
            <span className="text-sm text-center px-2">{action.type}</span>
          </div>
          {index < actions.length - 1 && (
            <ArrowDown className="my-2 text-gray-400" />
          )}
        </div>
      ))}
      {actions.length === 0 && (
        <div className="text-gray-400 italic">No actions added yet</div>
      )}
    </div>
  )
}

export default ActionOrderPreview

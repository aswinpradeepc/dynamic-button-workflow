import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

const MobileActionPreview = ({ actions }) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Action Order</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-3 border-b last:border-b-0"
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span>{action.type}</span>
              </div>
            ))}
            {actions.length === 0 && (
              <div className="text-gray-400 italic">No actions added yet</div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileActionPreview

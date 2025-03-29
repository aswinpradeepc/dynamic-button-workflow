import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { executeAction } from '../utils/actions'

const DynamicButton = ({ config }) => {
  const [output, setOutput] = useState('')
  const [disabled, setDisabled] = useState(false)
  const buttonRef = useRef(null)

  const handleClick = async () => {
    setOutput('')
    for (const action of config.actions) {
      await executeAction(action, setOutput, buttonRef, setDisabled)
    }
  }

  if (!config) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No configuration found. Please set up the button first.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className="transition-all duration-300"
      >
        {config.buttonLabel}
      </Button>
      {output && (
        <Card className="p-6 min-h-[100px] bg-muted/50">
          <div dangerouslySetInnerHTML={{ __html: output }} className="prose max-w-none" />
        </Card>
      )}
    </div>
  )
}

export default DynamicButton

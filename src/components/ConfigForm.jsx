import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card } from './ui/card'
import { GripVertical } from 'lucide-react'
import { ACTION_TYPES, getActionConfig } from '../utils/actions'

const ConfigForm = ({ onSave }) => {
  const [buttonLabel, setButtonLabel] = useState('')
  const [actions, setActions] = useState([])

  const handleAddAction = () => {
    setActions([...actions, {
      type: ACTION_TYPES.ALERT,
      ...getActionConfig(ACTION_TYPES.ALERT)
    }])
  }

  const handleRemoveAction = (index) => {
    setActions(actions.filter((_, i) => i !== index))
  }

  const handleActionTypeChange = (index, type) => {
    const newActions = [...actions]
    newActions[index] = {
      type,
      ...getActionConfig(type)
    }
    setActions(newActions)
  }

  const handleActionConfigChange = (index, key, value) => {
    const newActions = [...actions]
    newActions[index] = {
      ...newActions[index],
      [key]: value
    }
    setActions(newActions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      buttonLabel,
      actions
    })
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
    e.target.closest('.action-card').classList.add('dragging')
  }

  const handleDragEnd = (e) => {
    e.target.closest('.action-card').classList.remove('dragging')
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    const dragCard = document.querySelector('.dragging')
    const cards = [...document.querySelectorAll('.action-card:not(.dragging)')]
    
    const card = cards.find(card => {
      const box = card.getBoundingClientRect()
      const draggedY = e.clientY
      return draggedY < box.bottom
    })

    if (card) {
      card.parentNode.insertBefore(dragCard, card)
    }
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
    if (dragIndex === dropIndex) return

    const newActions = [...actions]
    const [removed] = newActions.splice(dragIndex, 1)
    newActions.splice(dropIndex, 0, removed)
    setActions(newActions)
  }

  const renderActionConfig = (action, index) => {
    switch (action.type) {
      case ACTION_TYPES.ALERT:
      case ACTION_TYPES.SHOW_TEXT:
        return (
          <div className="space-y-2">
            <Label>{action.type === ACTION_TYPES.ALERT ? 'Alert Message' : 'Text to Show'}</Label>
            <Input
              type="text"
              value={action.message || action.text || ''}
              onChange={(e) => handleActionConfigChange(index, action.type === ACTION_TYPES.ALERT ? 'message' : 'text', e.target.value)}
              placeholder={action.type === ACTION_TYPES.ALERT ? 'Alert message' : 'Text to show'}
            />
          </div>
        )

      case ACTION_TYPES.SHOW_IMAGE:
        return (
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              type="url"
              value={action.url || ''}
              onChange={(e) => handleActionConfigChange(index, 'url', e.target.value)}
              placeholder="Image URL"
            />
          </div>
        )

      case ACTION_TYPES.SET_STORAGE:
        return (
          <div className="space-y-2">
            <Label>Storage Key</Label>
            <Input
              type="text"
              value={action.key || ''}
              onChange={(e) => handleActionConfigChange(index, 'key', e.target.value)}
              placeholder="Storage key"
              className="mb-2"
            />
            <Label>Storage Value</Label>
            <Input
              type="text"
              value={action.value || ''}
              onChange={(e) => handleActionConfigChange(index, 'value', e.target.value)}
              placeholder="Storage value"
            />
          </div>
        )

      case ACTION_TYPES.GET_STORAGE:
        return (
          <div className="space-y-2">
            <Label>Storage Key</Label>
            <Input
              type="text"
              value={action.key || ''}
              onChange={(e) => handleActionConfigChange(index, 'key', e.target.value)}
              placeholder="Storage key to fetch"
            />
          </div>
        )

      case ACTION_TYPES.PROMPT_SHOW:
        return (
          <div className="space-y-2">
            <Label>Prompt Message</Label>
            <Input
              type="text"
              value={action.prompt || ''}
              onChange={(e) => handleActionConfigChange(index, 'prompt', e.target.value)}
              placeholder="Prompt message"
              className="mb-2"
            />
            <Label>Template</Label>
            <Input
              type="text"
              value={action.template || ''}
              onChange={(e) => handleActionConfigChange(index, 'template', e.target.value)}
              placeholder="Template (use [response] for user input)"
            />
          </div>
        )

      case ACTION_TYPES.CHANGE_COLOR:
        return (
          <div className="space-y-2">
            <Label>Button Color</Label>
            <Input
              type="color"
              value={action.color || '#000000'}
              onChange={(e) => handleActionConfigChange(index, 'color', e.target.value)}
              className="h-10"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Button Label</Label>
        <Input
          type="text"
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          placeholder="Enter button label"
          required
        />
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <Card 
            key={index} 
            className="p-4 relative action-card transition-transform duration-200 hover:cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 px-2 flex items-center hover:bg-gray-100 border-r"
            >
              <GripVertical className="h-6 w-4" />
            </div>
            <div className="ml-8 space-y-4">
              <div className="space-y-2">
                <Label>Action Type</Label>
                <Select
                  value={action.type}
                  onValueChange={(value) => handleActionTypeChange(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ACTION_TYPES).map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {renderActionConfig(action, index)}
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => handleRemoveAction(index)}
                  variant="destructive"
                >
                  Remove Action
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          onClick={handleAddAction}
          variant="outline"
        >
          Add Action
        </Button>
        <Button type="submit">
          Save Configuration
        </Button>
      </div>
    </form>
  )
}

export default ConfigForm

import { useState } from 'react'
import styled from '@emotion/styled'
import { ACTION_TYPES, getActionConfig } from '../utils/actions'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ActionItem = styled.div`
  border: 1px solid #eef1f6;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8fafc;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &.secondary {
    background: #f1f5f9;
    color: #344767;

    &:hover {
      background: #e2e8f0;
    }
  }

  &.remove {
    background: #fee2e2;
    color: #ef4444;

    &:hover {
      background: #fecaca;
    }
  }
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`

const Label = styled.label`
  color: #344767;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

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

  const renderActionConfig = (action, index) => {
    switch (action.type) {
      case ACTION_TYPES.ALERT:
      case ACTION_TYPES.SHOW_TEXT:
        return (
          <Input
            type="text"
            value={action.message || action.text || ''}
            onChange={(e) => handleActionConfigChange(index, action.type === ACTION_TYPES.ALERT ? 'message' : 'text', e.target.value)}
            placeholder={action.type === ACTION_TYPES.ALERT ? 'Alert message' : 'Text to show'}
          />
        )

      case ACTION_TYPES.SHOW_IMAGE:
        return (
          <Input
            type="url"
            value={action.url || ''}
            onChange={(e) => handleActionConfigChange(index, 'url', e.target.value)}
            placeholder="Image URL"
          />
        )

      case ACTION_TYPES.SET_STORAGE:
        return (
          <>
            <Input
              type="text"
              value={action.key || ''}
              onChange={(e) => handleActionConfigChange(index, 'key', e.target.value)}
              placeholder="Storage key"
            />
            <Input
              type="text"
              value={action.value || ''}
              onChange={(e) => handleActionConfigChange(index, 'value', e.target.value)}
              placeholder="Storage value"
            />
          </>
        )

      case ACTION_TYPES.GET_STORAGE:
        return (
          <Input
            type="text"
            value={action.key || ''}
            onChange={(e) => handleActionConfigChange(index, 'key', e.target.value)}
            placeholder="Storage key to fetch"
          />
        )

      case ACTION_TYPES.PROMPT_SHOW:
        return (
          <>
            <Input
              type="text"
              value={action.prompt || ''}
              onChange={(e) => handleActionConfigChange(index, 'prompt', e.target.value)}
              placeholder="Prompt message"
            />
            <Input
              type="text"
              value={action.template || ''}
              onChange={(e) => handleActionConfigChange(index, 'template', e.target.value)}
              placeholder="Template (use [response] for user input)"
            />
          </>
        )

      case ACTION_TYPES.CHANGE_COLOR:
        return (
          <Input
            type="color"
            value={action.color || '#000000'}
            onChange={(e) => handleActionConfigChange(index, 'color', e.target.value)}
          />
        )

      default:
        return null
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label>Button Label</Label>
        <Input
          type="text"
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          placeholder="Enter button label"
          required
        />
      </div>

      <ActionList>
        {actions.map((action, index) => (
          <ActionItem key={index}>
            <Label>Action Type</Label>
            <Select
              value={action.type}
              onChange={(e) => handleActionTypeChange(index, e.target.value)}
            >
              {Object.values(ACTION_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
            {renderActionConfig(action, index)}
            <ButtonGroup>
              <Button 
                type="button" 
                onClick={() => handleRemoveAction(index)}
                className="remove"
              >
                Remove Action
              </Button>
            </ButtonGroup>
          </ActionItem>
        ))}
      </ActionList>

      <ButtonGroup>
        <Button 
          type="button" 
          onClick={handleAddAction}
          className="secondary"
        >
          Add Action
        </Button>
        <Button type="submit">
          Save Configuration
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default ConfigForm

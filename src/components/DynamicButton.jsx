import { useState, useRef } from 'react'
import styled from '@emotion/styled'
import { executeAction } from '../utils/actions'

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`

const OutputContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #eef1f6;
  border-radius: 10px;
  min-height: 100px;
  background: #f8fafc;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  background: #f8fafc;
  border: 1px dashed #e2e8f0;
  border-radius: 10px;
`

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
      <EmptyState>
        No configuration found. Please set up the button first.
      </EmptyState>
    )
  }

  return (
    <div>
      <StyledButton
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
      >
        {config.buttonLabel}
      </StyledButton>
      {output && (
        <OutputContainer dangerouslySetInnerHTML={{ __html: output }} />
      )}
    </div>
  )
}

export default DynamicButton

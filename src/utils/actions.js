export const ACTION_TYPES = {
  ALERT: 'Alert',
  SHOW_TEXT: 'Show Text',
  SHOW_IMAGE: 'Show Image',
  REFRESH_PAGE: 'Refresh Page',
  SET_STORAGE: 'Set LocalStorage',
  GET_STORAGE: 'Get LocalStorage',
  INCREASE_SIZE: 'Increase Button Size',
  CLOSE_WINDOW: 'Close Window',
  PROMPT_SHOW: 'Prompt and Show',
  CHANGE_COLOR: 'Change Button Color',
  DISABLE_BUTTON: 'Disable Button'
}

export const executeAction = async (action, setOutput, buttonRef, setDisabled) => {
  switch (action.type) {
    case ACTION_TYPES.ALERT:
      alert(action.message)
      break

    case ACTION_TYPES.SHOW_TEXT:
      setOutput(action.text)
      break

    case ACTION_TYPES.SHOW_IMAGE:
      setOutput(`<img src="${action.url}" alt="Dynamic content" style="max-width: 100%; height: auto;" />`)
      break

    case ACTION_TYPES.REFRESH_PAGE:
      window.location.reload()
      break

    case ACTION_TYPES.SET_STORAGE:
      localStorage.setItem(action.key, action.value)
      break

    case ACTION_TYPES.GET_STORAGE:
      const value = localStorage.getItem(action.key)
      setOutput(`Value for ${action.key}: ${value || 'Not found'}`)
      break

    case ACTION_TYPES.INCREASE_SIZE:
      if (buttonRef.current) {
        const currentWidth = buttonRef.current.offsetWidth
        const currentHeight = buttonRef.current.offsetHeight
        buttonRef.current.style.width = `${currentWidth * 1.2}px`
        buttonRef.current.style.height = `${currentHeight * 1.2}px`
      }
      break

    case ACTION_TYPES.CLOSE_WINDOW:
      window.close()
      break

    case ACTION_TYPES.PROMPT_SHOW:
      const response = prompt(action.prompt)
      if (response) {
        setOutput(action.template.replace('[response]', response))
      }
      break

    case ACTION_TYPES.CHANGE_COLOR:
      if (buttonRef.current && action.color) {
        buttonRef.current.style.backgroundColor = action.color
      }
      break

    case ACTION_TYPES.DISABLE_BUTTON:
      setDisabled(true)
      break
  }
}

export const getActionConfig = (type) => {
  switch (type) {
    case ACTION_TYPES.ALERT:
      return { message: '' }
    case ACTION_TYPES.SHOW_TEXT:
      return { text: '' }
    case ACTION_TYPES.SHOW_IMAGE:
      return { url: '' }
    case ACTION_TYPES.SET_STORAGE:
      return { key: '', value: '' }
    case ACTION_TYPES.GET_STORAGE:
      return { key: '' }
    case ACTION_TYPES.PROMPT_SHOW:
      return { prompt: '', template: 'Response: [response]' }
    case ACTION_TYPES.CHANGE_COLOR:
      return { color: '#000000' }
    default:
      return {}
  }
}

import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('');
  }

  return {
    clear,
    type,
    value,
    onChange,
  }
}

// module can have several named exports
export const useAnotherHook = () => {
  // ...
}
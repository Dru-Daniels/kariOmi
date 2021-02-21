import React, { useState, useEffect } from 'react'

export const Context = React.createContext()


export function ContextController({ children }) {
  let intialState = {
    track_list: [],
    heading: ''
  }

  const [state, setState] = useState(intialState)


  useEffect(() => {
  }, [])

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )
}

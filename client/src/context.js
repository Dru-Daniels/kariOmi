import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Context = React.createContext()

const REACT_APP_MM_KEY='1f3681a93333f848e78152032bee26e7'

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

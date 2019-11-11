import React, { createContext, useReducer } from 'react'
import reducer from '../reducers/reducer'

const initState = {}

export const Context = createContext()

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={{
      ...state,
      dispatch: input => (
        input instanceof Function ? input(dispatch, state) : dispatch(input)
      )
    }}>
      { children }
    </Context.Provider>
  )
}
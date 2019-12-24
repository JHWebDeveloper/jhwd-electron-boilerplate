import React, { createContext, useReducer } from 'react'
import { arrayOf, element, oneOfType } from 'prop-types'
import reducer from '../reducer'

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

Provider.propTypes = {
  children: oneOfType([element, arrayOf(element)]).isRequired
}

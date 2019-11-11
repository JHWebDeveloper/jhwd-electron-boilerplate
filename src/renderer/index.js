import React from 'react'
import { render } from 'react-dom'
import { remote } from 'electron'
import App from './components/App'

render(<App />, document.querySelector('#root'))

if (process.env.NODE_ENV === 'development') {
  let pos = {}
  const menu = new remote.Menu()

  menu.append(new remote.MenuItem({
    label: 'Inspect Element',
    click() {
      remote.getCurrentWindow().inspectElement(pos.x, pos.y)
    }
  }))

  window.addEventListener('contextmenu', e => {
    e.preventDefault()
    pos = { x: e.x, y: e.y }
    menu.popup(remote.getCurrentWindow())
  })
}
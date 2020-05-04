import remote from require('electron')
import sendMessage from './sendMessage'

const interop = {}

const textElements = 'input[type="text"], textarea'

interop.setContextMenu = () => {
  const menu = new remote.Menu()

  if (process.env.NODE_ENV === 'development') {
    let pos = {}
    
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
  } else {
    const menuItems = [
      new remote.MenuItem({ role: 'cut' }),
      new remote.MenuItem({ role: 'copy' }),
      new remote.MenuItem({ role: 'paste' }),
      new remote.MenuItem({ type: 'separator' }),
      new remote.MenuItem({ role: 'selectAll' })
    ]
  
    menuItems.forEach(item => menu.append(item))
  
    window.addEventListener('contextmenu', e => {
      e.preventDefault()
  
      if (e.target.matches(textElements) && !e.target.disabled) {
        menu.popup(remote.getCurrentWindow())
      }
    })
  }
}

window.REPLACE_WITH_NAMESPACE = Object.freeze({
  interop: Object.freeze(interop)
})

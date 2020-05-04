import { ipcRenderer } from 'electron'

const sendMessage = ({ sendMsg, recieveMsg, errMsg, data }) => new Promise((resolve, reject) => {
  ipcRenderer.once(recieveMsg, (evt, res) => {
    ipcRenderer.removeAllListeners(errMsg)
    resolve(res)
  })

  ipcRenderer.once(errMsg, (evt, err) => {
    ipcRenderer.removeAllListeners(recieveMsg)
    reject(err)
  })

  ipcRenderer.send(sendMsg, data)
})

export default sendMessage

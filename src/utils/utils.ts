import { Notification } from 'element-ui'

interface NotifyObj {
  title: string
  message: string
  type: 'success' | 'warning' | 'info' | 'error' | undefined
}
function notify(data: NotifyObj) {
  Notification({
    title: data.title,
    message: data.message,
    type: data.type,
    offset: 100,
    duration: 5000
  })
}

export { notify }

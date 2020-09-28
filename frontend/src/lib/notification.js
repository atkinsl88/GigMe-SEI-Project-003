import { notify } from 'react-notify-toast'

const popupStyles = { background: '#f73434', text: '#000' }

export const popupNotification = message => {
  notify.show(message, 'custom', 2500, popupStyles)
}	

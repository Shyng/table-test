import React from 'react'
import ReactDOM from 'react-dom'
import Notification from '../notification'
import './toast.css'

function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification />, div)
    return {
        addNotice(notice) {
            return notification.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

let notification
const notice = (type, content, duration = 2000, onClose, className) => {
    if (!notification) notification = createNotification()
    return notification.addNotice({ type, content, duration, onClose, className })
}

export default {
    info(content, duration, onClose, className) {
        return notice('info', content, duration, onClose, className)
    },
    success(content, duration, onClose, className) {
        return notice('success', content, duration, onClose, className)
    },
    warning(content, duration, onClose, className) {
        return notice('warning', content, duration, onClose, className)
    },
    error(content, duration, onClose, className) {
        return notice('error', content, duration, onClose, className)
    },
    loading(content, duration = 0, onClose, className) {
        return notice('loading', content, duration, onClose, className)
    },

}
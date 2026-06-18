import { createContext, useState } from "react"
import { Snackbar, Alert } from "@mui/material"

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    })

    const showNotification = (
        message,
        severity = "success"
    ) => {
        setNotification({
            open: true,
            message,
            severity
        })
    }

    const handleClose = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }))
    }

    return (
        <NotificationContext
            value={{ showNotification }}
        >
            {children}

            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    severity={notification.severity}
                    variant="filled"
                    onClose={handleClose}
                >
                    {notification.message}
                </Alert>
            </Snackbar>

        </NotificationContext>
    )
}
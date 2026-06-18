// TokenContext y CurrentUserContext se mantienen en React Context (datos de sesión).
// CartContext y CategoryContext fueron migrados a Redux (ver store/slices/).
import { createContext, useState, useEffect } from "react";
import { NotificationProvider } from "./NotificationProvider";

export const TokenContext = createContext("")

export const CurrentUserContext = createContext({})

export function ContextProvider({ children }) {
    // Inicializa el token desde localStorage para que persista entre recargas
    const [tokenContext, setTokenContextState] = useState(localStorage.getItem('token') || "")

    const [currentUser, setCurrentUser] = useState(null)

    // Wrapper que sincroniza el token con localStorage cada vez que cambia
    const setTokenContext = (token) => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
        setTokenContextState(token)
    }

    // Al montar la app, si hay token guardado recupera el usuario desde el servidor
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(user => setCurrentUser(user))
            .catch(() => {
                // Token expirado o inválido: limpiar sesión
                localStorage.removeItem('token')
                setTokenContextState("")
            })
    }, [])

    return (
        <NotificationProvider>
            <TokenContext
                value={{
                    tokenContext,
                    setTokenContext
                }}
            >
                <CurrentUserContext
                    value={{
                        currentUser,
                        setCurrentUser
                    }}
                >
                    {children}
                </CurrentUserContext>
            </TokenContext>
        </NotificationProvider>
    )
}

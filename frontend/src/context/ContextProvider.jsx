// TokenContext y CurrentUserContext se mantienen en React Context (datos de sesión).
// CartContext y CategoryContext fueron migrados a Redux (ver store/slices/).
import { createContext, useState } from "react";
import { NotificationProvider } from "./NotificationProvider";

export const TokenContext = createContext("")

export const CurrentUserContext = createContext({})

export function ContextProvider({ children }) {
    const [tokenContext, setTokenContext] = useState("")

    const [currentUser, setCurrentUser] = useState(null)

    return (
        // NotificationProvider envuelve todo para que cualquier componente
        // pueda acceder a showNotification y mostrar Snackbars globales
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

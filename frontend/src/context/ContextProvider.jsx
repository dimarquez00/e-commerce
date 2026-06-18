// TokenContext y CurrentUserContext se mantienen en React Context porque son datos de sesión.
// CartContext y CategoryContext fueron migrados a Redux (ver store/slices/).
import { createContext, useState } from "react";

export const TokenContext = createContext("")

export const CurrentUserContext = createContext({})

export function ContextProvider({ children }) {
    const [tokenContext, setTokenContext] = useState("")

    const [currentUser, setCurrentUser] = useState({})

    return (
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
    )
}

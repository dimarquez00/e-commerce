import { createContext, useState } from "react";

export const TokenContext = createContext("")

export const CurrentUserContext = createContext({})

export const CartContext = createContext({})

export function ContextProvider({children}) {
    const [tokenContext, setTokenContext] = useState("")

    const [currentUser, setCurrentUser] = useState({})

    const [cart, setCart] = useState({})

    return (
        <TokenContext
            value ={{
                tokenContext,
                setTokenContext
            }}
        >
            <CartContext
                value={{
                    cart,
                    setCart
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
            </CartContext>
        </TokenContext>
    )
}
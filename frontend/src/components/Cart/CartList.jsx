import { Box, Button, Container, Typography } from "@mui/material"
import CartCard from "./CartCard"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/ContextProvider"

const CartList = () => {
    const {cart, setCart} = useContext(CartContext)
    console.log(cart)

    return (
        <Container>
            <Typography variant="h3">Carrito:</Typography>
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            }}>
                {Object.entries(cart).map(([id, quantity]) => (
                    <CartCard
                        key={id}
                        id={id}
                        quantityProp={quantity}
                    />
                ))}
            </Box>
            {/* <Typography>{Object.keys(cart).length}</Typography> */}
            <Button variant="contained" sx={{mt: 2}}>Finalizar compra</Button>
        </Container>
    )
}

export default CartList
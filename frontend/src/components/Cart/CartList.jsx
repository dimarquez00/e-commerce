import { Box, Button, Container, Typography } from "@mui/material"
import CartCard from "./CartCard"
import { useEffect, useState } from "react"

const CartList = () => {
    // const [cart, setCart] = useState({})
    // useEffect(()=>{
    //     const cartBefore = JSON.parse(localStorage.getItem("cart")) || []
    //     setCart(cartBefore)
    // }, [])
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    console.log(cart)

    return (
        <Container>
            <Typography variant="h3">Carrito:</Typography>
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            }}>
            {
                cart.map((product) => (
                    <CartCard 
                    key={product.id}
                    id={product.id}
                    quantityProp={product.quantity}
                    />
                ))
            }
            </Box>
            {/* <Typography>{cart}</Typography> */}
            <Button variant="contained" sx={{mt: 2}}>Finalizar compra</Button>
        </Container>
    )
}

export default CartList
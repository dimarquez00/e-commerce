import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import CartCard from "./CartCard"
import { useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"
// useSelector lee datos del store; useDispatch envía acciones al store
import { useSelector, useDispatch } from "react-redux"
// clearCart es la acción del cartSlice para vaciar el carrito tras confirmar el pedido
import { clearCart } from "../../store/slices/cartSlice"
import { useNavigate } from "react-router-dom";

const CartList = () => {
    // useSelector se suscribe al store y devuelve el objeto de items del carrito
    // { [productId]: quantity } — cada vez que cambie, CartList se re-renderiza automáticamente
    const cart = useSelector((state) => state.cart.items)

    // useDispatch devuelve la función dispatch para enviar acciones al store
    const dispatch = useDispatch()

    const { tokenContext } = useContext(TokenContext)
    const { currentUser } = useContext(CurrentUserContext)

    const [loading, setLoading] = useState(false)
    const [subtotals, setSubtotals] = useState({})

    const navigate = useNavigate()

    const userId = currentUser?.id

    const isLoggedIn = !!tokenContext;
    const isCartEmpty = Object.keys(cart).length === 0;

    const handleSubtotalChange = (id, subtotal) => {
        setSubtotals((prev) => ({
            ...prev,
            [id]: subtotal
        }))
    }

    const total = Object.keys(cart).reduce((acc, id) => {
        return acc + (subtotals[id] || 0)
    }, 0)

    const handleOrder = async () => {
        if (isCartEmpty) return

        setLoading(true);
        try {
            // 1. Crear orden
            const createOrderResponse = await fetch(
                "api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenContext}`
                    },
                    body: JSON.stringify({ "userId": userId })
                }
            );

            if (!createOrderResponse.ok) {
                throw new Error("Error al crear la orden");
            }

            const order = await createOrderResponse.json();
            const orderId = order.id;

            // 2. Agregar productos
            for (const [productId, quantity] of Object.entries(cart)) {
                for (let i = 0; i < quantity; i++) {
                    const addProductResponse = await fetch(
                        `api/orders/${orderId}/products/${productId}`,
                        {
                            method: "POST",
                            headers: { "Authorization": `Bearer ${tokenContext}` }
                        }
                    );

                    if (!addProductResponse.ok) {
                        throw new Error(`Error agregando producto ${productId}`);
                    }
                }
            }

            // 3. Confirmar orden
            const confirmResponse = await fetch(
                `api/orders/${orderId}`,
                {
                    method: "PUT",
                    headers: { "Authorization": `Bearer ${tokenContext}` }
                }
            );

            if (!confirmResponse.ok) {
                throw new Error("Error confirmando la orden");
            }

            const orderData = await confirmResponse.json();

            // 4. Vaciar el carrito en el store de Redux
            dispatch(clearCart())

            // 5. Ir a la vista de confirmación de pedido
            navigate("/confirmedorder", { state: { order: orderData } })

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h3">Carrito:</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {Object.entries(cart).map(([id, quantity]) => (
                    <CartCard
                        key={id}
                        id={id}
                        quantityProp={quantity}
                        onSubtotalChange={handleSubtotalChange}
                    />
                ))}
            </Box>

            {!isCartEmpty && (
                <Box
                    sx={{
                        mt: 3,
                        mb: 2,
                        p: 2,
                        borderTop: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Total del carrito: ${total.toFixed(2)}
                    </Typography>
                </Box>
            )}
            
            <Button
                onClick={handleOrder}
                variant="contained"
                disabled={loading || isCartEmpty || !isLoggedIn}
                sx={{ mt: 2 }}
            >
                {loading ? (
                    <CircularProgress size={24} />
                ) : isCartEmpty ? (
                    "Carrito vacío"
                ) : !isLoggedIn ? (
                    "Inicia sesión para comprar"
                ) : (
                    "Confirmar pedido"
                )}
            </Button>
        </Container>
    )
}

export default CartList

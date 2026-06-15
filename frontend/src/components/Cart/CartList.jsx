import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Snackbar, Typography, Divider, Chip } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CartCard from "./CartCard"
import { useContext, useEffect, useState } from "react"
import { CartContext, CurrentUserContext, TokenContext } from "../../context/ContextProvider"

const CartList = () => {
    const {cart, setCart} = useContext(CartContext)
    const {tokenContext} = useContext(TokenContext)
    const {currentUser} = useContext(CurrentUserContext)

    const [confirmedOrder, setConfirmedOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    console.log(cart)
    const userId = currentUser.id

    const handleOrder = async () => {
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
                    body: JSON.stringify({
                        "userId": userId
                    })
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
                            headers: {
                                "Authorization": `Bearer ${tokenContext}`
                            }
                        }
                    );

                    if (!addProductResponse.ok) {
                        throw new Error(
                            `Error agregando producto ${productId}`
                        );
                    }
                }
            }

            // 3. Confirmar orden
            const confirmResponse = await fetch(
                `api/orders/${orderId}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${tokenContext}`
                    }
                }
            );

            if (!confirmResponse.ok) {
                throw new Error("Error confirmando la orden");
            }

            const orderData = await confirmResponse.json();
            setConfirmedOrder(orderData);

            // 4. Mostrar confirmación
            console.log(orderData);
            // alert("Pedido confirmado");

            // 5. Vaciar carrito
            setCart({});
            setSuccess(true);

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
            <Button 
                onClick={handleOrder}
                variant="contained"
                disabled={loading}
                sx={{mt: 2}}
            >
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    "Confirmar pedido"
                )}
            </Button>

            {!loading && confirmedOrder && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: 500
                            },
                            textAlign: "center",
                            p: 2
                        }}
                    >
                        <CardContent>

                            <CheckCircleIcon
                                color="success"
                                sx={{
                                    fontSize: 80,
                                    mb: 2
                                }}
                            />

                            <Typography
                                variant="h4"
                                gutterBottom
                            >
                                ¡Pedido confirmado!
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Gracias por tu compra.
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2
                                }}
                            >
                                <Typography>
                                    <strong>Pedido</strong>
                                </Typography>

                                <Typography>
                                    #{confirmedOrder.id}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2
                                }}
                            >
                                <Typography>
                                    <strong>Fecha</strong>
                                </Typography>

                                <Typography>
                                    {confirmedOrder.date}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2
                                }}
                            >
                                <Typography>
                                    <strong>Productos</strong>
                                </Typography>

                                <Typography>
                                    {confirmedOrder.products.length}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2
                                }}
                            >
                                <Typography>
                                    <strong>Total</strong>
                                </Typography>

                                <Typography
                                    variant="h6"
                                    color="primary"
                                >
                                    ${confirmedOrder.total}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Button
                                variant="contained"
                                sx={{ mt: 3 }}
                                onClick={() => setConfirmedOrder(null)}
                            >
                                Continuar comprando
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    )
}

export default CartList
import { useEffect, useState, useContext } from "react"
import {
    Container, Typography, Box, CircularProgress,
    Alert, Card, CardContent, Chip, Divider
} from "@mui/material"
import { TokenContext } from "../context/ContextProvider"
import { CurrentUserContext } from "../context/ContextProvider"

const OrdersView = () => {
    const { tokenContext } = useContext(TokenContext)
    const { currentUser } = useContext(CurrentUserContext)

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect obtiene los pedidos del usuario al montar la vista
    useEffect(() => {
        if (!tokenContext) return

        fetch("/api/orders", {
            headers: { Authorization: `Bearer ${tokenContext}` }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener pedidos")
                return res.json()
            })
            .then((data) => {
                // Filtra solo los pedidos del usuario actual usando el userId del DTO
                const mine = data.filter((order) => order.userId === currentUser?.id)
                // Ordena del más reciente al más antiguo
                mine.sort((a, b) => new Date(b.date) - new Date(a.date))
                setOrders(mine)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [tokenContext, currentUser])

    const stateColor = (state) => {
        if (state === "CONFIRMED") return "success"
        if (state === "PENDING") return "warning"
        return "default"
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        )
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Mis pedidos</Typography>

            {orders.length === 0 ? (
                <Typography color="text.secondary">No tenés pedidos realizados.</Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {orders.map((order) => (
                        <Card key={order.id} variant="outlined">
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Pedido #{order.id}
                                    </Typography>
                                    <Chip
                                        label={order.state}
                                        color={stateColor(order.state)}
                                        size="small"
                                    />
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body2" color="text.secondary">
                                    Fecha: {order.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Productos: {order.products?.length ?? 0}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }} fontWeight="bold">
                                    Total: ${order.total}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    )
}

export default OrdersView

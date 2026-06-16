import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmedOrder = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const order = location.state?.order;
    
    if (!order) {
        return <Typography variant="h4">No se encontró la orden.</Typography>
    }

    return (
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
                            #{order.id}
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
                            {order.date}
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
                            {order.products.length}
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
                            ${order.total}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={() => navigate("/")}
                    >
                        Continuar comprando
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}
export default ConfirmedOrder
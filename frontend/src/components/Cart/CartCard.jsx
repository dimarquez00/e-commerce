import { Card, CardActions, CardContent, IconButton, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import NumberSpinner from "../NumberSpinner"
// useDispatch envía acciones al store global de Redux
import { useDispatch } from "react-redux"
// Acciones del cartSlice para modificar el carrito
import { updateQuantity, removeFromCart } from "../../store/slices/cartSlice"
import DeleteIcon from '@mui/icons-material/Delete';

const CartCard = ({ id, quantityProp, onSubtotalChange }) => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(quantityProp)

    // useDispatch devuelve la función dispatch para enviar acciones al store
    const dispatch = useDispatch()

    const URL = `/api/products/${id}`

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error al cargar los productos.", error))
    }, [])

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity)
        // dispatch envía la acción updateQuantity al store con el id y la nueva cantidad
        dispatch(updateQuantity({ id, quantity: newQuantity }))
    }

    const handleRemoveCart = () => {
        // dispatch envía la acción removeFromCart al store con el id del producto a eliminar
        dispatch(removeFromCart(id))
    }

    const imageSrc = product.imageUrl || product.image || product.img || product.photo
    const priceNumber = Number(String(product.price || 0).replace("$", "").replace(",", "."))
    const subtotal = priceNumber * quantity

    useEffect(() => {
        if (onSubtotalChange) {
            onSubtotalChange(id, subtotal)
        }
    }, [id, subtotal])

    return (
        <Card
            elevation={2}
            sx={{
                width: "100%",
                mb: 2,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1
                }}
            >
                {imageSrc && (
                    <Box
                        component="img"
                        src={
                            String(imageSrc).startsWith("http") || String(imageSrc).startsWith("/api")
                                ? imageSrc
                                : `/api/images/${imageSrc}`
                        }
                        alt={product.name}
                        sx={{
                            width: 110,
                            height: 110,
                            objectFit: "contain",
                            borderRadius: 1
                        }}
                    />
                )}

                <Box>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        {product.name}
                    </Typography>

                    <NumberSpinner
                        value={quantity}
                        onValueChange={handleQuantityChange}
                        min={1}
                        label="Cantidad"
                        size="small"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <IconButton onClick={handleRemoveCart} aria-label="delete" size="small">
                    <DeleteIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    sx={{
                        minWidth: 120,
                        textAlign: "right"
                    }}
                >
                    ${subtotal.toFixed(2)}
                </Typography>
            </Box>
        </Card>
    )
}

export default CartCard

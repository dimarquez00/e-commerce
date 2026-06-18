import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import NumberSpinner from "../NumberSpinner"
// useDispatch envía acciones al store global de Redux
import { useDispatch } from "react-redux"
// Acciones del cartSlice para modificar el carrito
import { updateQuantity, removeFromCart } from "../../store/slices/cartSlice"
import DeleteIcon from '@mui/icons-material/Delete';

const CartCard = ({ id, quantityProp }) => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(quantityProp)

    // useDispatch devuelve la función dispatch para enviar acciones al store
    const dispatch = useDispatch()

    const URL = `/api/products/${id}`

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data)
                console.log(data)
            })
            .catch((error) => console.error("Error al cargar los productos.", error))
    }, [])

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity)
        // dispatch envía la acción updateQuantity al store con el id y la nueva cantidad
        // Antes: setCart((prevCart) => ({ ...prevCart, [id]: newQuantity }))
        dispatch(updateQuantity({ id, quantity: newQuantity }))
    }

    const handleRemoveCart = () => {
        // dispatch envía la acción removeFromCart al store con el id del producto a eliminar
        // Antes: setCart((prevCart) => { const newCart = {...prevCart}; delete newCart[id]; return newCart })
        dispatch(removeFromCart(id))
    }

    return (
        <Card elevation={3} sx={{ flex: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">{product.name}</Typography>

                <Typography variant="h6">${product.price}</Typography>
            </CardContent>

            <CardActions>
                <NumberSpinner value={quantity} onValueChange={handleQuantityChange} min={1} label="Cantidad" size="small" />
                <IconButton onClick={handleRemoveCart} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CartCard

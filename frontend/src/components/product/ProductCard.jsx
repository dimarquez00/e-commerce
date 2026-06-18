import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia } from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import NumberSpinner from "../NumberSpinner"
// useSelector lee datos del store global; useDispatch envía acciones al store
import { useSelector, useDispatch } from "react-redux"
// addToCart es la acción del cartSlice para agregar un producto al carrito
import { addToCart } from "../../store/slices/cartSlice"
// showNotification muestra un Snackbar global al agregar al carrito
import { NotificationContext } from "../../context/NotificationProvider"

const ProductCard = ({ product }) => {
    const { id, name, description, price, stock, categories, image } = product

    const [quantity, setQuantity] = useState(1)

    const navigate = useNavigate()

    // useDispatch devuelve la función dispatch para enviar acciones al store
    const dispatch = useDispatch()

    // useSelector se suscribe al store y devuelve el mapa de categorías
    // Cada vez que state.category.categoriesMap cambie, este componente se re-renderiza
    const categoriesMap = useSelector((state) => state.category.categoriesMap)

    const { showNotification } = useContext(NotificationContext)

    const handleAddCart = () => {
        // dispatch envía la acción addToCart al store con el id y la cantidad
        dispatch(addToCart({ id, quantity }))
        showNotification("Producto agregado al carrito")
    }

    return (
        <Card
            elevation={3}
            sx={{
                flex: "1 1 300",
                maxWidth: 350
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={image || img}
                alt={name}
            />
            <CardContent>
                <Typography variant="h5" component="div">{name}</Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>

                <Typography variant="h6">${price}</Typography>

                <Typography variant="body2">Stock: {stock}</Typography>

                <Typography sx={{ mt: 2 }}>Categorías:</Typography>

                {categories?.map((categoryId) => (
                    <Chip
                        key={categoryId}
                        label={categoriesMap?.[categoryId]}
                        size="small"
                        sx={{ mr: 1, mt: 1 }}
                    />
                ))}
            </CardContent>

            <CardActions sx={{ flexDirection: "column", alignItems: "flex-start", gap: 1, px: 2, pb: 2, "& > *": { ml: "0 !important" } }}>
                <NumberSpinner
                    value={quantity}
                    onValueChange={setQuantity}
                    min={1}
                    max={stock}
                    label="Cantidad"
                    size="small"
                />
                <Button
                    onClick={handleAddCart}
                    variant="contained"
                    disabled={stock === 0}
                    fullWidth
                >
                    Agregar al carrito
                </Button>
                {/* useNavigate navega a la ruta /products/:id con el id del producto */}
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/products/${id}`)}
                >
                    Ver detalle
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard

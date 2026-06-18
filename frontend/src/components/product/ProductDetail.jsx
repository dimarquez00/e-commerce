import { useEffect, useState, useContext } from "react"
// useParams extrae el parámetro :id de la URL (ej: /products/5 → id = "5")
import { useParams, useNavigate } from "react-router-dom"
import {
    Box, Typography, Chip, Button, CircularProgress,
    Alert, CardMedia, Divider
} from "@mui/material"
import img from "../../assets/emptyImg.png"
// useSelector lee el estado global del store; useDispatch envía acciones
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../../store/slices/cartSlice"
import { NotificationContext } from "../../context/NotificationProvider"
import NumberSpinner from "../NumberSpinner"

const ProductDetail = () => {
    // useParams devuelve los parámetros de la ruta actual como objeto
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)

    // useDispatch devuelve la función dispatch para enviar acciones al store
    const dispatch = useDispatch()

    // useSelector se suscribe al store y devuelve el mapa de categorías
    const categoriesMap = useSelector((state) => state.category.categoriesMap)

    const { showNotification } = useContext(NotificationContext)

    // useEffect ejecuta el fetch cuando el componente monta o cuando cambia el id de la URL
    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Producto no encontrado")
                return res.json()
            })
            .then((data) => setProduct(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    const handleAddCart = () => {
        // dispatch envía la acción addToCart con el id y la cantidad seleccionada
        dispatch(addToCart({ id: product.id, quantity }))
        showNotification("Producto agregado al carrito")
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
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button sx={{ mt: 2 }} onClick={() => navigate("/products")}>
                    Volver a productos
                </Button>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
            <Button variant="text" onClick={() => navigate("/products")} sx={{ mb: 2 }}>
                ← Volver a productos
            </Button>

            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {/* Imagen del producto */}
                <CardMedia
                    component="img"
                    image={product.image || img}
                    alt={product.name}
                    sx={{ width: 350, height: 350, objectFit: "cover", borderRadius: 2 }}
                    onError={(e) => { e.target.src = img }}
                />

                {/* Información y acciones */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                    <Typography variant="h4" gutterBottom>{product.name}</Typography>

                    <Typography variant="h5" color="primary" gutterBottom>
                        ${product.price}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Stock disponible: {product.stock}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    {/* Categorías */}
                    {product.categories?.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>Categorías:</Typography>
                            {product.categories.map((categoryId) => (
                                <Chip
                                    key={categoryId}
                                    label={categoriesMap?.[categoryId] || categoryId}
                                    size="small"
                                    sx={{ mr: 1, mb: 1 }}
                                />
                            ))}
                        </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Selector de cantidad y botón agregar */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                        <NumberSpinner
                            value={quantity}
                            onValueChange={setQuantity}
                            min={1}
                            max={product.stock}
                            label="Cantidad"
                            size="small"
                        />
                        <Button
                            variant="contained"
                            size="large"
                            disabled={product.stock === 0}
                            onClick={handleAddCart}
                        >
                            {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductDetail

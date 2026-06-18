import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Box, CircularProgress, Container, Typography } from "@mui/material"
// useDispatch permite despachar acciones al store global de Redux
import { useDispatch } from "react-redux"
// setCategories es la acción del categorySlice para cargar el mapa de categorías
import { setCategories } from "../../store/slices/categorySlice"

const ProductList = () => {
    // useDispatch devuelve la función dispatch del store global
    // Se usa para enviar acciones a Redux en lugar de llamar a setCategories del contexto
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch("/api/products"),
                    fetch("/api/categories")
                ])

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error("Error al obtener datos del servidor")
                }

                const productsData = await productsResponse.json()
                const categoriesData = await categoriesResponse.json()

                const categoriesMap = Object.fromEntries(
                    categoriesData.map(category => [category.id, category.name])
                )

                setProducts(productsData)
                // dispatch envía la acción setCategories al store con el mapa de categorías
                // Antes: setCategories(categoriesMap) desde el contexto
                // Ahora: dispatch(setCategories(categoriesMap)) al store de Redux
                dispatch(setCategories(categoriesMap))

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [dispatch])

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        )

    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Container>
            <Typography variant="h3">Lista de productos:</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 4
                }}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </Box>
        </Container>
    )
}

export default ProductList

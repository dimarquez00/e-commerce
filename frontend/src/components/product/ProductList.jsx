import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import ProductFilter from "./ProductFilter"
import { Box, CircularProgress, Container, Typography } from "@mui/material"
// useDispatch permite despachar acciones al store global de Redux
import { useDispatch } from "react-redux"
// setCategories es la acción del categorySlice para cargar el mapa de categorías
import { setCategories } from "../../store/slices/categorySlice"

const ProductList = () => {
    // useDispatch devuelve la función dispatch del store global
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estado local para el filtro y el orden (no necesitan ser globales)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortOrder, setSortOrder] = useState("asc")

    // Filtra los productos según las categorías seleccionadas
    const filteredProducts =
        selectedCategories.length === 0
            ? products
            : products.filter((product) =>
                product.categories.some((categoryId) =>
                    selectedCategories.includes(categoryId)
                )
            )

    // Ordena los productos filtrados por precio
    const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )

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

    if (error) {
        return <Typography color="error">{error}</Typography>
    }

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 3,
                    flexDirection: { xs: "column", md: "row" }
                }}
            >
                <ProductFilter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 2
                    }}
                >
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

export default ProductList

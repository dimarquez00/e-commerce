import { useContext, useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Box, CircularProgress, Container, Typography } from "@mui/material"
import { CategoryContext } from "../../context/ContextProvider"

const ProductList = () => {
    const {setCategories} = useContext(CategoryContext)

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
                setCategories(categoriesMap)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [setCategories])

    if (loading) 
        return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4
            }}
        >
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
        {
            products.map((product) => (
                <ProductCard 
                key={product.id}
                product={product}
                />
            ))
        }
        </Box>
    </Container>
    )
}

export default ProductList
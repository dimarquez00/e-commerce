import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Box, Container, Typography } from "@mui/material"

const ProductList = () => {
    const [products, setProducts] = useState([])

    const URL = "/api/products"

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error al cargar los productos.", error))
    }, [])

    return (
    <Container>
        <Typography variant="h3">Lista de productos:</Typography>
        <Box sx={{
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
        justifyContent: "space-between",
        gap: 4,
        }}>
        {
            products.map((product) => (
                <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                categories={product.categories}
                />
            ))
        }
        </Box>
    </Container>
    )
}

export default ProductList
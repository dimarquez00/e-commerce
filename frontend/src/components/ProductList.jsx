import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

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
    <>
        <h1>Lista de productos:</h1>
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
    </>
    )
}

export default ProductList
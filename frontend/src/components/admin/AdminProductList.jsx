import { useContext, useState, useEffect } from "react"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { CategoryContext, CurrentUserContext, TokenContext } from "../../context/ContextProvider"
import ProductFilter from "../product/ProductFilter"
import { Navigate } from "react-router-dom"
import AdminProductCard from "./AdminProductCard"
import AdminCategoryManager from "./AdminCategoryManager"
import { NotificationContext } from "../../context/NotificationProvider"

const AdminProductList = () => {
    const {currentUser} = useContext(CurrentUserContext)
    const {tokenContext} = useContext(TokenContext)
    const [creatingProduct, setCreatingProduct] = useState(false)

    if (currentUser?.role !== "ADMIN") {
        return <Navigate to="/" replace />
    }

    const { showNotification } = useContext(NotificationContext)
    const {setCategories} = useContext(CategoryContext)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortOrder, setSortOrder] = useState("asc")

    const filteredProducts =
        selectedCategories.length === 0
            ? products
            : products.filter((product) =>
                product.categories.some((categoryId) =>
                    selectedCategories.includes(categoryId)
                )
            );
    
    const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === "asc"
            ? a.price - b.price
            : b.price - a.price
    );

    const emptyProduct = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        categories: []
    }

    const handleCreate = () => {
        setCreatingProduct(true)
    }

    const handleCreateProduct = async (productData) => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenContext}`
                },
                body: JSON.stringify({
                    name: productData.name,
                    description: productData.description,
                    price: Number(productData.price),
                    stock: Number(productData.stock),
                    categories: productData.categories
                })
            })

            if (!response.ok) {
                throw new Error("Error al crear producto")
            }

            const createdProduct = await response.json()

            setProducts(prev => [...prev, createdProduct])
            setCreatingProduct(false)
            showNotification("Producto creado correctamente")

        } catch (error) {
            setError(error.message)
        }
    }

    const handleUpdateProduct = async (productData) => {
        try {
            const response = await fetch(
                `/api/products/${productData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenContext}`
                    },
                    body: JSON.stringify({
                        name: productData.name,
                        description: productData.description,
                        price: Number(productData.price),
                        stock: Number(productData.stock),
                        categories: productData.categories
                    })
                }
            )

            if (!response.ok) {
                throw new Error("Error al actualizar producto")
            }

            const updatedProduct = await response.json()

            setProducts(prev =>
                prev.map(product =>
                    product.id === updatedProduct.id
                        ? updatedProduct
                        : product
                )
            )

            showNotification("Producto actualizado correctamente")


        } catch (error) {
            setError(error.message)
        }
    }

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenContext}`
                }
            })

            if (!response.ok) {
                throw new Error("Error al eliminar producto")
            }

            setProducts(prev =>
                prev.filter(product => product.id !== productId)
            )

            showNotification("Producto eliminado correctamente")

        } catch (error) {
            setError(error.message)
        }
    }

    const handleCreateCategory = async (name) => {
        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenContext}`
                },
                body: JSON.stringify({ name })
            })

            if (!response.ok) {
                throw new Error("Error al crear categoría")
            }

            const newCategory = await response.json()

            setCategories(prev => ({
                ...prev,
                [newCategory.id]: newCategory.name
            }))

            showNotification("Categoría creada correctamente")

        } catch (error) {
            setError(error.message)
        }
    }

    const handleUpdateCategory = async (id, name) => {
        try {
            const response = await fetch(
                `/api/categories/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenContext}`
                    },
                    body: JSON.stringify({ name })
                }
            )

            if (!response.ok) {
                throw new Error("Error al actualizar categoría")
            }

            const updatedCategory = await response.json()

            setCategories(prev => ({
                ...prev,
                [updatedCategory.id]: updatedCategory.name
            }))

            showNotification("Categoría actualizada")

        } catch (error) {
            setError(error.message)
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(
                `/api/categories/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenContext}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error("Error al eliminar categoría")
            }

            setCategories(prev => {
                const copy = { ...prev }
                delete copy[id]
                return copy
            })

            showNotification("Categoría eliminada")

        } catch (error) {
            setError(error.message)
        }
    }

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
            <AdminCategoryManager
                products={products}
                onCreate={handleCreateCategory}
                onUpdate={handleUpdateCategory}
                onDelete={handleDeleteCategory}
            />

            <Typography
                variant="h6"
                sx={{ mb: 2 }}
            >
                Productos
            </Typography>

            <ProductFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <Button
                variant="contained"
                sx={{ mb: 3 }}
                onClick={handleCreate}
            >
                Nuevo producto
            </Button>

            <Box 
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 4
                }}
            >

                {
                    creatingProduct && (
                        <AdminProductCard
                            product={emptyProduct}
                            onUpdate={handleCreateProduct}
                        />
                    )
                }

                {
                    sortedProducts.map((product) => (
                        <AdminProductCard 
                            key={product.id}
                            product={product}
                            onUpdate={handleUpdateProduct}
                            onDelete={handleDeleteProduct}
                        />
                    ))
                }
            </Box>
        </Container>
    )
}

export default AdminProductList
import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia} from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useState } from "react"
import NumberSpinner from "../NumberSpinner"

const ProductCard = ({id, name, description, price, stock, categories, image}) => {
    const [quantity, setQuantity] = useState(1)

    const handleAddCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        const existingProduct = cart.find(
            (item) => item.id === id
        )

        if (existingProduct) {
            existingProduct.quantity += quantity
        } else {
            cart.push({
                id: id,
                quantity: quantity
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    const handleRemoveCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || []

        cart = cart
            .map((item) =>
            item.id === id
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter((item) => item.quantity > 0)
        
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    return (
    <Card elevation={3} sx={{width: {xs: 1, lg: 350}}}>
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

            <Chip label={categories} size="small" sx={{ mr: 1, mt: 1 }}/>
            {/* {product.categories.map((categoryId) => (
            ))} */}
      </CardContent>

      <CardActions>
        <NumberSpinner value={quantity} onValueChange={setQuantity} label="Cantidad" size="small" />
        <Button onClick={handleAddCart} variant="contained" sx={{mt: 2, width: 150}}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
    )
}

export default ProductCard
import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia} from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useContext, useState } from "react"
import NumberSpinner from "../NumberSpinner"
import { CartContext } from "../../context/ContextProvider"

const ProductCard = ({id, name, description, price, stock, categories, image}) => {
    const [quantity, setQuantity] = useState(1)
    const {cart, setCart} = useContext(CartContext)

    const handleAddCart = () => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: (prevCart[id] || 0) + quantity
        }))
    }

    // const handleRemoveCart = () => {
    //     setCart((prevCart) => {
    //         const newCart = {...prevCart}

    //         if (!newCart[id]) {
    //             return prevCart;
    //         }

    //         if (newCart[id] === 1) {
    //             delete newCart[id]
    //         } else {
    //             newCart[id]--
    //         }
    //         return newCart
    //     })
    // }

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
        <NumberSpinner value={quantity} onValueChange={setQuantity} min={1} label="Cantidad" size="small" />
        <Button onClick={handleAddCart} variant="contained" sx={{mt: 2, width: 150}}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
    )
}

export default ProductCard
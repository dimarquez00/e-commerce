import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia} from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useContext, useState } from "react"
import NumberSpinner from "../NumberSpinner"
import { CategoryContext } from "../../context/ContextProvider"
// import { CartContext } from "../../context/ContextProvider"
import { NotificationContext } from "../../context/NotificationProvider"
import { useDispatch } from "react-redux"
import { addToCart } from "../../store/cartSlice"

const ProductCard = ({product}) => {
    const { id, name, description, price, stock, categories, image } = product

    const [quantity, setQuantity] = useState(1)
    // const {cart, setCart} = useContext(CartContext)
    const {categories: categoriesMap} = useContext(CategoryContext)
    const { showNotification } = useContext(NotificationContext)
    const dispatch = useDispatch();

    const handleAddCart = () => {
        // setCart((prevCart) => ({
        //     ...prevCart,
        //     [id]: (prevCart[id] || 0) + quantity
        // }))

        

        dispatch(
            addToCart({
                productId: id,
                quantity
            })
        )

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

            {/* <Chip label={categories} size="small" sx={{ mr: 1, mt: 1 }}/> */}
            {categories?.map((categoryId) => (
                <Chip
                    key={categoryId}
                    label={categoriesMap?.[categoryId]}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                />
            ))}
      </CardContent>

      <CardActions>
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
            sx={{mt: 2, width: 150}}
        >
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
    )
}

export default ProductCard
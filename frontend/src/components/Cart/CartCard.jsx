import { Card, CardActions, CardContent, Container, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import NumberSpinner from "../NumberSpinner"
import { TokenContext } from "../../context/ContextProvider"

const CartCard = ({id, quantityProp}) => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(quantityProp)

    const {tokenContext} = useContext(TokenContext)
    const URL = `/api/products/${id}`
    
    
    useEffect(() => {
        fetch(URL, {
            headers: {
                Authorization: `Bearer ${tokenContext}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProduct(data),
                console.log(data)})
            .catch((error) => console.error("Error al cargar los productos.", error))
    }, [])

    return (
        <Card elevation={3} sx={{flex: 1}}>
        {/* <CardMedia
            component="img"
            height="300"
            image={image || img}
            alt={name}
        /> */}
        <CardContent>
            <Typography variant="h5" component="div">{product.name}</Typography>
            {/* <Typography variant="h5" component="div">name</Typography> */}

            {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography> */}
            {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>description</Typography> */}

            <Typography variant="h6">${product.price}</Typography>
            {/* <Typography variant="h6">$price</Typography> */}

            {/* <Typography variant="body2">Stock: {stock}</Typography> */}
            {/* <Typography variant="body2">Stock: stock</Typography> */}

            {/* <Typography sx={{ mt: 2 }}>Categorías:</Typography> */}

            {/* <Chip label={categories} size="small" sx={{ mr: 1, mt: 1 }}/> */}
            {/* {product.categories.map((categoryId) => (
            ))} */}
      </CardContent>

      <CardActions>
        <NumberSpinner value={quantity} onValueChange={setQuantity} min={1} label="Cantidad" size="small" />
        {/* <Button onClick={handleCarrito} variant="contained" sx={{mt: 2}}>
          Agregar al carrito
        </Button> */}
      </CardActions>
    </Card>
    )
}

export default CartCard
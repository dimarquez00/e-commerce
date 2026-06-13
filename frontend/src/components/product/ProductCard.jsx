import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia} from "@mui/material"
import img from "../../assets/emptyImg.png"

const ProductCard = ({id, name, description, price, stock, categories, image}) => {

    return (
    <Card elevation={3} sx={{width: {xs: 1, md: 300}}}>
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
        <Button variant="contained" sx={{mt: 2}}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
    )
}

export default ProductCard
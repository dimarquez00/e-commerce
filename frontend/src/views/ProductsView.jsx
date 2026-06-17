import { Container, Typography } from '@mui/material'
import ProductList from '../components/product/ProductList'

const ProductsView = () => {

    return (
        <Container>
            {/* <Typography variant='h2'>Vista ProductsView</Typography> */}
            <ProductList/>
        </Container>
    )
}

export default ProductsView
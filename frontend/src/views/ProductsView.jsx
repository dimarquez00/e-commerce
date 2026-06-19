import { Container, Typography } from '@mui/material'
import ProductList from '../components/product/ProductList'

const ProductsView = () => {

    return (
        <Container maxWidth="xl">
            <ProductList/>
        </Container>
    )
}

export default ProductsView
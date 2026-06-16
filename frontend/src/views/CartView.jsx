import { Container, Typography } from '@mui/material'
import CartList from '../components/cart/CartList'

const CartView = () => {

    return (
        <Container>
            <Typography variant='h2'>Vista CartView</Typography>
            <CartList/>
        </Container>
    )
}

export default CartView
import { Container, Typography } from "@mui/material"
import ConfirmedOrder from "../components/cart/ConfirmedOrder"

const ConfirmedOrderView = () => {

    return (
        <Container>
            <Typography variant='h2'>Vista ConfirmedOrderView</Typography>
            <ConfirmedOrder/>
        </Container>
    )
}

export default ConfirmedOrderView
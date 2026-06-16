import { Container, Typography } from "@mui/material"
import Register from "../components/authentication/Register"

const RegisterView = () => {

    return (
        <Container>
            <Typography variant="h2">Vista RegisterView</Typography>
            <Register/>
        </Container>
    )
}

export default RegisterView
import { Container, Typography } from '@mui/material'
import LogIn from '../components/authentication/LogIn'

const LogInView = () => {

    return (
        <Container>
            <Typography variant='h2'>Vista LogInView</Typography>
            <LogIn/>
        </Container>
    )
}

export default LogInView
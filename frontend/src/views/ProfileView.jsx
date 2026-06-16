import { Container, Typography } from '@mui/material'
import Profile from '../components/authentication/Profile'

const ProfileView = () => {

    return (
        <Container>
            <Typography variant='h2'>Vista ProfileView</Typography>
            <Profile />
        </Container>
    )
}

export default ProfileView
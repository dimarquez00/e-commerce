import { Container, Typography } from '@mui/material'
import AdminProductList from '../components/admin/AdminProductList'

const AdminView = () => {

    return (
        <Container>
            <Typography variant='h2'>Vista AdminView</Typography>
            <AdminProductList />
        </Container>
    )
}

export default AdminView
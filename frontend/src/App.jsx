// import './App.css'
import { Container } from '@mui/material'
import LogIn from './components/authentication/LogIn'
import ProductList from './components/product/ProductList'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProductsView from './views/ProductsView.jsx'
import LogInView from './views/LogInView'
import Navigation from './components/Navigation.jsx'
import ProfileView from './views/ProfileView.jsx'
import AdminView from './views/AdminView.jsx'
import CartView from './views/CartView.jsx'

function App() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Container>
            <ResponsiveAppBar/>
            {/* <Navigation/> */}
            {/* <ProductList/> */}
            {/* <LogIn/> */}
            <Routes>
                <Route path='/' element={<ProductsView/>}/>
                <Route path='/products' element={<ProductsView/>}/>
                <Route path='/login' element={<LogInView/>}/>
                <Route path='/profile' element={<ProfileView/>}/>
                <Route path='/admin' element={<AdminView/>}/>
                <Route path='/cart' element={<CartView/>}/>
            </Routes>
        </Container>
  )
}

export default App

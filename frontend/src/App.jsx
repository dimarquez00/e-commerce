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
import { ContextProvider } from './context/ContextProvider.jsx'
import ConfirmedOrderView from './views/ConfirmedOrderView.jsx'
import RegisterView from './views/RegisterView.jsx'

function App() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <ContextProvider>
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
                    <Route path='/confirmedorder' element={<ConfirmedOrderView/>}/>
                    <Route path='/register' element={<RegisterView/>}/>
                </Routes>
            </Container>
        </ContextProvider>
  )
}

export default App

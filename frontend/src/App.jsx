// import './App.css'
import { Container } from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProductsView from './views/ProductsView.jsx'
import LogInView from './views/LogInView'
import ProfileView from './views/ProfileView.jsx'
import AdminView from './views/AdminView.jsx'
import CartView from './views/CartView.jsx'
import { ContextProvider } from './context/ContextProvider.jsx'
import ConfirmedOrderView from './views/ConfirmedOrderView.jsx'
import RegisterView from './views/RegisterView.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

function App() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        // Provider hace que el store global esté disponible en todos los componentes
        <Provider store={store}>
            {/* ContextProvider mantiene TokenContext y CurrentUserContext */}
            <ContextProvider>
                <Container>
                    <ResponsiveAppBar />
                    <Routes>
                        <Route path='/' element={<ProductsView />} />
                        <Route path='/products' element={<ProductsView />} />
                        <Route path='/login' element={<LogInView />} />
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/admin' element={<AdminView />} />
                        <Route path='/cart' element={<CartView />} />
                        <Route path='/confirmedorder' element={<ConfirmedOrderView />} />
                        <Route path='/register' element={<RegisterView />} />
                    </Routes>
                </Container>
            </ContextProvider>
        </Provider>
    )
}

export default App

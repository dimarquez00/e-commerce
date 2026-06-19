import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Route, Routes } from 'react-router-dom'
import ProductsView from './views/ProductsView.jsx'
import LogInView from './views/LogInView'
import ProfileView from './views/ProfileView.jsx'
import AdminView from './views/AdminView.jsx'
import CartView from './views/CartView.jsx'
import { ContextProvider } from './context/ContextProvider.jsx'
import ConfirmedOrderView from './views/ConfirmedOrderView.jsx'
import RegisterView from './views/RegisterView.jsx'
import ProductDetailView from './views/ProductDetailView.jsx'
import OrdersView from './views/OrdersView.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

function App() {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("themeMode") || "light"
    })

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode])

    const toggleTheme = () => {
        setMode(prevMode => {
            const newMode = prevMode === "light" ? "dark" : "light"
            localStorage.setItem("themeMode", newMode)
            return newMode
        })
    }

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ContextProvider>
                    <Container>
                        <ResponsiveAppBar
                            mode={mode}
                            toggleTheme={toggleTheme}
                        />
                        <Routes>
                            <Route path='/' element={<ProductsView />} />
                            <Route path='/products' element={<ProductsView />} />
                            <Route path='/login' element={<LogInView />} />
                            <Route path='/profile' element={<ProfileView />} />
                            <Route path='/admin' element={<AdminView />} />
                            <Route path='/cart' element={<CartView />} />
                            <Route path='/confirmedorder' element={<ConfirmedOrderView />} />
                            <Route path='/register' element={<RegisterView />} />
                            <Route path='/products/:id' element={<ProductDetailView />} />
                            <Route path='/orders' element={<OrdersView />} />
                        </Routes>
                    </Container>
                </ContextProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default App
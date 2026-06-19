import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"
import { NotificationContext } from "../../context/NotificationProvider"
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    const { setTokenContext } = useContext(TokenContext)
    const { setCurrentUser } = useContext(CurrentUserContext)
    const { showNotification } = useContext(NotificationContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }

    const emailHasError = touched.email && email.trim() === ""
    const passwordHasError = touched.password && password.trim() === ""

    const handleSubmit = async (e) => {
        e.preventDefault()

        setTouched({
            email: true,
            password: true
        })

        if (email.trim() === "" || password.trim() === "") {
            showNotification("No pueden haber campos vacíos", "error")
            return
        }

        try {
            const loginRes = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!loginRes.ok) {
                let serverMessage = ""
                try {
                    const errorData = await loginRes.json()
                    serverMessage = errorData.message || errorData.error || ""
                } catch {
                    // Si el cuerpo no es JSON, lo ignora
                }

                if (loginRes.status === 401 || loginRes.status === 403) {
                    throw new Error("Email o contraseña incorrectos")
                }

                throw new Error(serverMessage || "Error al iniciar sesión")
            }

            const loginData = await loginRes.json()
            const accessToken = loginData.access_token

            setTokenContext(accessToken)

            const userRes = await fetch("/api/users/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            })

            if (!userRes.ok) {
                throw new Error("No se pudo obtener el usuario")
            }

            const userData = await userRes.json()
            setCurrentUser(userData)

            showNotification(`¡Bienvenido, ${userData.name}!`, "success")
            navigate("/products")

        } catch (error) {
            console.error("Error al iniciar sesión:", error)
            showNotification(error.message || "Ocurrió un error inesperado", "error")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    m: 4,
                }}
            >
                <Typography variant="h4">
                    Inicio de sesión
                </Typography>

                <TextField
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={() => handleBlur("email")}
                    required
                    error={emailHasError}
                    helperText={emailHasError ? "Ingresá tu email" : ""}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
                    onBlur={() => handleBlur("password")}
                    required
                    error={passwordHasError}
                    helperText={passwordHasError ? "Ingresá tu contraseña" : ""}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(prev => !prev)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Iniciar sesión
                </Button>
            </Box>
        </Container>
    )
}

export default LogIn
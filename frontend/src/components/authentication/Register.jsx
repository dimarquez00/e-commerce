import { Alert, Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const { setTokenContext } = useContext(TokenContext)
    const { setCurrentUser } = useContext(CurrentUserContext)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        dateOB: "",
        email: "",
        password: "",
        address: {
            street: "",
            city: "",
            province: "",
            postalCode: ""
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }))
    }

    const handleRegister = async () => {
        setSuccessMessage("")
        setErrorMessage("")

        if (
            formData.name.trim() === "" ||
            formData.dateOB.trim() === "" ||
            formData.email.trim() === "" ||
            formData.password.trim() === "" ||
            formData.address.street.trim() === "" ||
            formData.address.city.trim() === "" ||
            formData.address.province.trim() === "" ||
            formData.address.postalCode.trim() === ""
        ) {
            setErrorMessage("Todos los campos son obligatorios")
            return
        }

        try {
            const registerRes = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!registerRes.ok) {
                // Intenta leer el mensaje de error que devuelve el servidor
                let serverMessage = ""
                try {
                    const errorData = await registerRes.json()
                    serverMessage = errorData.message || errorData.error || ""
                } catch {
                    // Si el cuerpo no es JSON, lo ignora
                }

                // Mensaje específico para email duplicado (400 o 409)
                if (registerRes.status === 409 || registerRes.status === 400 ||
                    serverMessage.toLowerCase().includes("email") ||
                    serverMessage.toLowerCase().includes("duplicate") ||
                    serverMessage.toLowerCase().includes("ya existe")
                ) {
                    throw new Error("El email ingresado ya está registrado")
                }

                throw new Error(serverMessage || "Error al registrar usuario")
            }

            const registerData = await registerRes.json()
            const accessToken = registerData.access_token

            setTokenContext(accessToken)

            const userRes = await fetch("/api/users/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            })

            if (!userRes.ok) {
                throw new Error("No se pudo obtener el usuario")
            }

            const userData = await userRes.json()
            setCurrentUser(userData)

            setSuccessMessage(`¡Registro exitoso! Bienvenido, ${userData.name}.`)

            // Redirige a productos después de 2 segundos
            setTimeout(() => navigate("/products"), 2000)

        } catch (error) {
            console.error(error)
            setErrorMessage(error.message || "Ocurrió un error inesperado")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 4
                }}
            >
                <Typography variant="h4">
                    Registro
                </Typography>

                {successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                )}

                {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}

                <TextField
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Fecha de nacimiento"
                    name="dateOB"
                    type="date"
                    value={formData.dateOB}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
                />

                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
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

                <TextField
                    label="Calle"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                />

                <TextField
                    label="Ciudad"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                />

                <TextField
                    label="Provincia"
                    name="province"
                    value={formData.address.province}
                    onChange={handleAddressChange}
                />

                <TextField
                    label="Código Postal"
                    name="postalCode"
                    value={formData.address.postalCode}
                    onChange={handleAddressChange}
                />

                <Button
                    variant="contained"
                    onClick={handleRegister}
                >
                    Registrarse
                </Button>
            </Box>
        </Container>
    )
}

export default Register

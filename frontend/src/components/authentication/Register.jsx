import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"
import { NotificationContext } from "../../context/NotificationProvider"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const { setTokenContext } = useContext(TokenContext)
    const { setCurrentUser } = useContext(CurrentUserContext)
    const { showNotification } = useContext(NotificationContext)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

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

    const [touched, setTouched] = useState({
        name: false,
        dateOB: false,
        email: false,
        password: false,
        street: false,
        city: false,
        province: false,
        postalCode: false
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

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }

    const hasError = (field, value) => {
        return touched[field] && value.trim() === ""
    }

    const markAllFieldsAsTouched = () => {
        setTouched({
            name: true,
            dateOB: true,
            email: true,
            password: true,
            street: true,
            city: true,
            province: true,
            postalCode: true
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        markAllFieldsAsTouched()

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
            showNotification("Todos los campos son obligatorios", "error")
            return
        }

        try {
            const registerRes = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!registerRes.ok) {
                let serverMessage = ""
                try {
                    const errorData = await registerRes.json()
                    serverMessage = errorData.message || errorData.error || ""
                } catch {
                    // Si el cuerpo no es JSON, lo ignora
                }

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

            showNotification(`¡Registro exitoso! Bienvenido, ${userData.name}.`, "success")

            setTimeout(() => navigate("/products"), 2000)

        } catch (error) {
            console.error(error)
            showNotification(error.message || "Ocurrió un error inesperado", "error")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleRegister}
                noValidate
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

                <TextField
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    required
                    error={hasError("name", formData.name)}
                    helperText={hasError("name", formData.name) ? "Ingresá tu nombre completo" : ""}
                />

                <TextField
                    label="Fecha de nacimiento"
                    name="dateOB"
                    type="date"
                    value={formData.dateOB}
                    onChange={handleChange}
                    onBlur={() => handleBlur("dateOB")}
                    required
                    error={hasError("dateOB", formData.dateOB)}
                    helperText={hasError("dateOB", formData.dateOB) ? "Ingresá tu fecha de nacimiento" : ""}
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
                    onBlur={() => handleBlur("email")}
                    required
                    error={hasError("email", formData.email)}
                    helperText={hasError("email", formData.email) ? "Ingresá tu email" : ""}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    required
                    error={hasError("password", formData.password)}
                    helperText={hasError("password", formData.password) ? "Ingresá una contraseña" : ""}
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
                    onBlur={() => handleBlur("street")}
                    required
                    error={hasError("street", formData.address.street)}
                    helperText={hasError("street", formData.address.street) ? "Ingresá tu calle" : ""}
                />

                <TextField
                    label="Ciudad"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    onBlur={() => handleBlur("city")}
                    required
                    error={hasError("city", formData.address.city)}
                    helperText={hasError("city", formData.address.city) ? "Ingresá tu ciudad" : ""}
                />

                <TextField
                    label="Provincia"
                    name="province"
                    value={formData.address.province}
                    onChange={handleAddressChange}
                    onBlur={() => handleBlur("province")}
                    required
                    error={hasError("province", formData.address.province)}
                    helperText={hasError("province", formData.address.province) ? "Ingresá tu provincia" : ""}
                />

                <TextField
                    label="Código Postal"
                    name="postalCode"
                    value={formData.address.postalCode}
                    onChange={handleAddressChange}
                    onBlur={() => handleBlur("postalCode")}
                    required
                    error={hasError("postalCode", formData.address.postalCode)}
                    helperText={hasError("postalCode", formData.address.postalCode) ? "Ingresá tu código postal" : ""}
                />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Registrarse
                </Button>
            </Box>
        </Container>
    )
}

export default Register
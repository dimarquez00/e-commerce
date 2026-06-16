import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useContext, useEffect, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"

const Profile = () => {
    const {tokenContext} = useContext(TokenContext)
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        dateOB: "",
        email: "",
        address: {
            street: "",
            city: "",
            province: "",
            postalCode: ""
        }
    })

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || "",
                dateOB: currentUser.dateOB || "",
                email: currentUser.email || "",
                address: {
                    street: currentUser.address?.street || "",
                    city: currentUser.address?.city || "",
                    province: currentUser.address?.province || "",
                    postalCode: currentUser.address?.postalCode || ""
                }
            })
        }
    }, [currentUser])
    
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }))
    }
    
    const handleUpdatedProfile = async () => {
        if (
            formData.name.trim() === "" ||
            formData.dateOB.trim() === "" ||
            formData.email.trim() === "" ||
            formData.address.street.trim() === "" ||
            formData.address.city.trim() === "" ||
            formData.address.province.trim() === "" ||
            formData.address.postalCode.trim() === ""
        ) {
            alert("Todos los campos son obligatorios")
            return
        }

        try {
            const data = {
                name: formData.name,
                dateOB: formData.dateOB,
                email: formData.email,
                address: {
                    street: formData.address.street,
                    city: formData.address.city,
                    province: formData.address.province,
                    postalCode: formData.address.postalCode
                }
            }

            const response = await fetch(
                `/api/users/id/${currentUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenContext}`
                    },
                    body: JSON.stringify(data)
                }
            )

            if (!response.ok) {
                throw new Error("Error al registrar usuario")
            }

            const updatedUser = await response.json()

            console.log(updatedUser);
            setCurrentUser(updatedUser);

        } catch (error) {
            console.error(error)
            alert("Ocurrió un error al actualizar el perfil")
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
                    Información personal
                </Typography>

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
                        inputLabel: {
                            shrink: true
                    },
                    }}
                />

                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    onClick={handleUpdatedProfile}
                >
                    Guardar cambios
                </Button>
            </Box>
        </Container>
    )
}

export default Profile
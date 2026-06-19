import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"
import { NotificationContext } from "../../context/NotificationProvider"

const Profile = () => {
    const { tokenContext } = useContext(TokenContext)
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    const { showNotification } = useContext(NotificationContext)

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

    const [touched, setTouched] = useState({
        name: false,
        dateOB: false,
        email: false,
        street: false,
        city: false,
        province: false,
        postalCode: false
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
            street: true,
            city: true,
            province: true,
            postalCode: true
        })
    }

    const handleUpdatedProfile = async (e) => {
        e.preventDefault()
        markAllFieldsAsTouched()

        if (
            formData.name.trim() === "" ||
            formData.dateOB.trim() === "" ||
            formData.email.trim() === "" ||
            formData.address.street.trim() === "" ||
            formData.address.city.trim() === "" ||
            formData.address.province.trim() === "" ||
            formData.address.postalCode.trim() === ""
        ) {
            showNotification("Todos los campos son obligatorios", "error")
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
                throw new Error("Error al actualizar usuario")
            }

            const updatedUser = await response.json()

            setCurrentUser(updatedUser)
            showNotification("¡Perfil actualizado correctamente!", "success")

        } catch (error) {
            console.error(error)
            showNotification("Ocurrió un error al actualizar el perfil", "error")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleUpdatedProfile}
                noValidate
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
                    onBlur={() => handleBlur("email")}
                    required
                    error={hasError("email", formData.email)}
                    helperText={hasError("email", formData.email) ? "Ingresá tu email" : ""}
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
                    Guardar cambios
                </Button>
            </Box>
        </Container>
    )
}

export default Profile
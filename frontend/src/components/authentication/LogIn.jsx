import { Box, Button, Container, TextField, Typography } from "@mui/material"
import {useEffect, useState } from "react"


const LogIn = () => {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const URL = "/api/auth/login"

    const handleClick = () => {
        if (email.trim() === "" || password.trim() === "") {
            alert("No pueden haber campos vaicos")
            return
        }

        const data = {
                    "email": email,
                    "password": password
        }

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                setToken(data.access_token)
                localStorage.setItem(token, data.access_token)
            })
            .catch((error) => console.error("Error al iniciar sesión.", error))
    }

    return (
        <Container>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 3,
                width: 400,
                m: 4,
                }}>
                <TextField name="email" onChange={handleChangeEmail} variant="outlined" label="email"></TextField>
                <TextField name="password" onChange={handleChangePassword} variant="outlined" label="password"></TextField>
                <Button onClick={handleClick} variant="contained" sx={{mt: 2}}>enviar</Button>
                <Typography variant="h3">{email}</Typography>
                <Typography variant="h3">{password}</Typography>
            </Box>
        </Container>
    )
}

export default LogIn
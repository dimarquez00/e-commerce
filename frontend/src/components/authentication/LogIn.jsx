import { Box, Button, Container, TextField, Typography } from "@mui/material"
import {useContext, useEffect, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"


const LogIn = () => {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {tokenContext, setTokenContext} = useContext(TokenContext)
    const {setCurrentUser} = useContext(CurrentUserContext)

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const handleClick = async () => {
        if (email.trim() === "" || password.trim() === "") {
            alert("No pueden haber campos vacíos");
            return;
        }

        try {
            const loginRes = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const loginData = await loginRes.json();
            const token = loginData.access_token;

            setToken(token);
            setTokenContext(token);

            const userRes = await fetch("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = await userRes.json();
            console.log(userData);
            setCurrentUser(userData);

        } catch (error) {
            console.error("Error al iniciar sesión o cargar usuario.", error);
        }
    };

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
            </Box>
        </Container>
    )
}

export default LogIn
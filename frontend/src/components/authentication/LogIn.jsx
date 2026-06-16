import { Box, Button, Container, TextField } from "@mui/material"
import {useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"


const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {setTokenContext} = useContext(TokenContext)
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

            if (!loginRes.ok) {
                throw new Error("Credenciales inválidas")
            }

            const loginData = await loginRes.json();
            const accessToken = loginData.access_token;

            setTokenContext(accessToken);

            const userRes = await fetch("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!userRes.ok) {
                throw new Error("No se pudo obtener el usuario")
            }

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
                }}
            >
                <TextField name="email" onChange={handleChangeEmail} variant="outlined" label="email" />
                <TextField name="password" onChange={handleChangePassword} variant="outlined" label="password" />
                <Button onClick={handleClick} variant="contained" sx={{mt: 2}}>enviar</Button>
            </Box>
        </Container>
    )
}

export default LogIn
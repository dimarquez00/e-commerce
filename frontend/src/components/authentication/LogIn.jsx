import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {useContext, useState } from "react"
import { CurrentUserContext, TokenContext } from "../../context/ContextProvider"


const LogIn = () => {
    const {setTokenContext} = useContext(TokenContext)
    const {setCurrentUser} = useContext(CurrentUserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
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
        <Container maxWidth="sm">
            <Box sx={{
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
                />

                <TextField 
                    label="Contraseña" 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChangePassword}
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
                    onClick={handleClick}
                >
                    Iniciar sesión
                </Button>
            </Box>
        </Container>
    )
}

export default LogIn
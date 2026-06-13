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
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>email</label>
                <input type="text" name="email" onChange={handleChangeEmail}/><br />
                <label>password</label>
                <input type="text" name="password" onChange={handleChangePassword}/><br />
                <button onClick={handleClick}>enviar</button>
            </form>
        </>
    )
}

export default LogIn
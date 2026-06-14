import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Navigation = () => {

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                    <Button
                            key='Productos'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to={"/products"}>Productos</Link>
                        </Button>
                </Box>
                <Typography>
                    Hola
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
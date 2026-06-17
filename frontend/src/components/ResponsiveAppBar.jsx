import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { CartContext, CurrentUserContext, TokenContext } from '../context/ContextProvider';

const pages = [
    { label: 'Products', path: '/products' },
    // { label: 'Profile', path: '/profile' },
    { label: 'Admin', path: '/admin' },
    // { label: 'Carrito', path: '/cart' },
    // { label: 'LogIn', path: '/login' },
    // { label: 'Register', path: '/register' },
];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const ResponsiveAppBar = () => {
    const {cart} = React.useContext(CartContext)
    const {currentUser, setCurrentUser} = React.useContext(CurrentUserContext)
    const {setTokenContext} = React.useContext(TokenContext)
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const totalItems = Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0
    );

    const isLoggedIn = !!currentUser;

    const settings = isLoggedIn
    ? [
        { label: "Profile", path: "/profile" },
        { label: "Logout", action: "logout" }
    ]
    : [
        { label: "LogIn", path: "/login" },
        { label: "Register", path: "/register" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");

        setTokenContext(null);
        setCurrentUser(null);

        navigate("/products");
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigation = (path) => {
        handleCloseNavMenu();
        if (path) {
            navigate(path);
        }
    };

    return (
        <AppBar 
            position="static"
            sx={{ mb: 4}}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={() => handleNavigation(page.path)}>
                                <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page.label}
                            onClick={() => handleNavigation(page.path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.label}
                        </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Tooltip title="Cuenta">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    {isLoggedIn ? currentUser?.name?.[0] : "?"}
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        <IconButton
                            color="inherit"
                            aria-label="view cart"
                            onClick={() => navigate("/cart")}
                        >
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.label}
                                    onClick={() => {
                                        handleCloseUserMenu();

                                        if (setting.action === "logout") {
                                            handleLogout();
                                        } else {
                                            navigate(setting.path);
                                        }
                                    }}
                                >
                                    <Typography>{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default ResponsiveAppBar
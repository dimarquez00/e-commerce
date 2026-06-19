import { useState } from "react"
import {Box, Button, Collapse, FormControl, InputLabel, ListItemButton, ListItemText, MenuItem, Select} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
// useSelector lee el mapa de categorías desde el store de Redux
import { useSelector } from "react-redux"

const ProductFilter = ({ selectedCategories, setSelectedCategories, sortOrder, setSortOrder }) => {
    // useSelector se suscribe al store y devuelve el mapa de categorías
    // Antes: const { categories } = useContext(CategoryContext)
    const categoriesMap = useSelector((state) => state.category.categoriesMap)

    const [openCategories, setOpenCategories] = useState(false)

    const handleClick = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId) ? [] : [categoryId]
        );
    };

    return (
        <Box
            sx={{
                width: { xs: "100%", md: 260 },
                flexShrink: 0,
                mb: 3
            }}
        >
            <Button
                fullWidth
                variant="outlined"
                onClick={() => setOpenCategories(!openCategories)}
                startIcon={
                    openCategories
                        ? <CloseIcon sx={{ color: "#f57c00" }} />
                        : null
                }
                sx={{
                    justifyContent: "flex-start",
                    color: "text.primary",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    py: 1.3,
                    px: 2,
                    "&:hover": {
                        backgroundColor: "action.hover",
                        borderColor: "text.secondary"
                    }
                }}
            >
                Categorías
            </Button>

            <Collapse in={openCategories} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        mt: 1,
                        backgroundColor: "background.paper",
                        boxShadow: 2,
                        borderRadius: 1,
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider"
                    }}
                >
                    <ListItemButton
                        onClick={() => setSelectedCategories([])}
                        sx={{
                            py: 1.5,
                            px: 2.5,
                            backgroundColor:
                                selectedCategories.length === 0
                                    ? "action.selected"
                                    : "background.paper",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            "&:hover": {
                                backgroundColor: "action.hover"
                            }
                        }}
                    >
                        <ListItemText
                            primary="Todos los productos"
                            primaryTypographyProps={{
                                fontWeight: selectedCategories.length === 0 ? 700 : 500,
                                color: "text.primary"
                            }}
                        />
                    </ListItemButton>

                    {Object.entries(categoriesMap).map(([id, name]) => {
                        const categoryId = Number(id)
                        const selected = selectedCategories.includes(categoryId)

                        return (
                            <ListItemButton
                                key={id}
                                onClick={() => handleClick(categoryId)}
                                sx={{
                                    py: 1.5,
                                    px: 2.5,
                                    backgroundColor: selected
                                        ? "action.selected"
                                        : "background.paper",
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    "&:hover": {
                                        backgroundColor: "action.hover"
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={name}
                                    primaryTypographyProps={{
                                        fontWeight: selected ? 700 : 500,
                                        color: "text.primary"
                                    }}
                                />
                            </ListItemButton>
                        )
                    })}
                </Box>
            </Collapse>

            <FormControl sx={{ minWidth: "100%", mt: 2 }}>
                <InputLabel>Ordenar por precio</InputLabel>

                <Select
                    value={sortOrder}
                    label="Ordenar por precio"
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <MenuItem value="asc">Menor a mayor</MenuItem>
                    <MenuItem value="desc">Mayor a menor</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default ProductFilter

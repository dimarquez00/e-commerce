import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Chip } from "@mui/material"
// useSelector lee el mapa de categorías desde el store de Redux
import { useSelector } from "react-redux"

const ProductFilter = ({ selectedCategories, setSelectedCategories, sortOrder, setSortOrder }) => {
    // useSelector se suscribe al store y devuelve el mapa de categorías
    // Antes: const { categories } = useContext(CategoryContext)
    const categoriesMap = useSelector((state) => state.category.categoriesMap)

    const handleClick = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                mb: 3
            }}
        >
            <Box>
                {Object.entries(categoriesMap).map(([id, name]) => (
                    <Chip
                        key={id}
                        label={name}
                        clickable
                        color={
                            selectedCategories.includes(Number(id))
                                ? "primary"
                                : "default"
                        }
                        onClick={() => handleClick(Number(id))}
                        sx={{ mr: 1, mb: 1 }}
                    />
                ))}
            </Box>

            <FormControl sx={{ minWidth: 220, mb: 2 }}>
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

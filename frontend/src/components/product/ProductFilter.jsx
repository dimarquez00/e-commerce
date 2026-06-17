import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { CategoryContext } from "../../context/ContextProvider"

const ProductFilter = ({selectedCategories, setSelectedCategories, sortOrder, setSortOrder}) => {
    const {categories} = useContext(CategoryContext)

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

            <Box 
                // sx={{ mb: 3 }}
            >
                {Object.entries(categories).map(([id, name]) => (
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
                    <MenuItem value="asc">
                        Menor a mayor
                    </MenuItem>

                    <MenuItem value="desc">
                        Mayor a menor
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default ProductFilter
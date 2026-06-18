import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useState } from "react"
// useSelector lee el mapa de categorías desde el store de Redux
import { useSelector } from "react-redux"

const AdminProductCard = ({ product, onUpdate, onDelete }) => {
    // useSelector se suscribe al store y devuelve el mapa de categorías
    // Antes: const { categories } = useContext(CategoryContext)
    const categories = useSelector((state) => state.category.categoriesMap)

    const [formData, setFormData] = useState(product)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const isNew = !product.id

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardContent>

                <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Precio"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="URL Imagen"
                    name="image"
                    value={formData.image || ""}
                    onChange={handleChange}
                    margin="normal"
                />

                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Categorías
                </Typography>

                <Box>
                    {Object.entries(categories).map(([id, name]) => (
                        <Chip
                            key={id}
                            label={name}
                            clickable
                            color={
                                formData.categories?.includes(Number(id))
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                setFormData(prev => ({
                                    ...prev,
                                    categories: prev.categories?.includes(Number(id))
                                        ? prev.categories.filter(
                                            categoryId => categoryId !== Number(id)
                                        )
                                        : [...(prev.categories || []), Number(id)]
                                }))
                            }
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </Box>

            </CardContent>

            <CardActions>
                <Button variant="contained" onClick={() => onUpdate(formData)}>
                    {isNew ? "Crear" : "Guardar"}
                </Button>

                {!isNew && (
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={() => setOpenDeleteDialog(true)}
                    >
                        Eliminar
                    </Button>
                )}
            </CardActions>

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Eliminar producto</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro de que desea eliminar "{formData.name}"?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>
                        Cancelar
                    </Button>

                    <Button
                        color="error"
                        onClick={() => {
                            onDelete(formData.id)
                            setOpenDeleteDialog(false)
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default AdminProductCard

import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useState } from "react"

const AdminProductCard = ({ product, onUpdate, onDelete }) => {
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

            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    onClick={() => onUpdate(formData)}
                >
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
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
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
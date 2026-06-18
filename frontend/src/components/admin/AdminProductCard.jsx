import { Card, CardContent, Typography, Button, CardActions, Chip, CardMedia, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import img from "../../assets/emptyImg.png"
import { useContext, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { TokenContext } from "../../context/ContextProvider"

const AdminProductCard = ({ product, onUpdate, onDelete }) => {
    const categories = useSelector((state) => state.category.categoriesMap)
    const { tokenContext } = useContext(TokenContext)

    const [formData, setFormData] = useState(product)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)

    const isNew = !product.id

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        const data = new FormData()
        data.append("file", file)

        setUploading(true)
        try {
            const res = await fetch("/api/images", {
                method: "POST",
                headers: { Authorization: `Bearer ${tokenContext}` },
                body: data
            })
            if (!res.ok) throw new Error()
            const imageUrl = await res.text()
            setFormData(prev => ({ ...prev, image: imageUrl }))
        } catch {
            alert("Error al subir la imagen")
        } finally {
            setUploading(false)
        }
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

                {/* Input de archivo oculto — se activa con el botón de abajo */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                />

                <Button
                    variant="outlined"
                    size="small"
                    disabled={uploading}
                    onClick={() => fileInputRef.current.click()}
                    sx={{ mt: 1 }}
                >
                    {uploading ? "Subiendo..." : "Subir imagen"}
                </Button>

                {formData.image && (
                    <Box
                        component="img"
                        src={formData.image}
                        alt="preview"
                        sx={{ width: "100%", height: 120, objectFit: "cover", mt: 1, borderRadius: 1 }}
                        onError={(e) => { e.target.src = img }}
                    />
                )}

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
                                        ? prev.categories.filter(cId => cId !== Number(id))
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

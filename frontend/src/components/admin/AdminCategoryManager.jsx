import {
    Box,
    Button,
    Chip,
    IconButton,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { useContext, useState } from "react"
import { CategoryContext } from "../../context/ContextProvider"

const AdminCategoryManager = ({
    products,
    onCreate,
    onUpdate,
    onDelete
}) => {

    const { categories } = useContext(CategoryContext)

    const [newName, setNewName] = useState("")

    const [editingCategory, setEditingCategory] = useState(null)
    const [editingName, setEditingName] = useState("")

    const [deletingCategory, setDeletingCategory] = useState(null)

    const handleOpenDelete = (id, name) => {

        const affectedProducts = products.filter(product =>
            product.categories.includes(Number(id))
        )

        setDeletingCategory({
            id,
            name,
            products: affectedProducts
        })
    }

    return (
        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                sx={{ mb: 2 }}
            >
                Categorías
            </Typography>

            {Object.entries(categories).map(([id, name]) => (
                <Box
                    key={id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1
                    }}
                >
                    <Chip label={name} />

                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditingCategory(id)
                            setEditingName(name)
                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleOpenDelete(id, name)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3
                }}
            >
                <TextField
                    label="Nueva categoría"
                    value={newName}
                    onChange={(e) =>
                        setNewName(e.target.value)
                    }
                />

                <Button
                    variant="contained"
                    onClick={() => {
                        if (!newName.trim()) return

                        onCreate(newName)
                        setNewName("")
                    }}
                >
                    Crear
                </Button>
            </Box>

            {/* Editar */}

            <Dialog
                open={Boolean(editingCategory)}
                onClose={() =>
                    setEditingCategory(null)
                }
            >
                <DialogTitle>
                    Editar categoría
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        value={editingName}
                        onChange={(e) =>
                            setEditingName(e.target.value)
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setEditingCategory(null)
                        }
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={() => {
                            onUpdate(
                                Number(editingCategory),
                                editingName
                            )

                            setEditingCategory(null)
                        }}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Eliminar */}

            <Dialog
                open={Boolean(deletingCategory)}
                onClose={() =>
                    setDeletingCategory(null)
                }
            >
                <DialogTitle>
                    Eliminar categoría
                </DialogTitle>

                <DialogContent>

                    {
                        deletingCategory?.products?.length > 0 ? (
                            <>
                                <Typography sx={{ mb: 2 }}>
                                    Esta categoría está siendo utilizada por:
                                </Typography>

                                {
                                    deletingCategory.products
                                        .slice(0, 3)
                                        .map(product => (
                                            <Typography key={product.id}>
                                                • {product.name}
                                            </Typography>
                                        ))
                                }

                                {
                                    deletingCategory.products.length > 3 && (
                                        <Typography sx={{ mt: 1 }}>
                                            y {
                                                deletingCategory.products.length - 3
                                            } productos más.
                                        </Typography>
                                    )
                                }

                                <Typography
                                    color="warning.main"
                                    sx={{ mt: 2 }}
                                >
                                    Si continúa, la categoría será eliminada
                                    de todos esos productos.
                                </Typography>
                            </>
                        ) : (
                            <Typography>
                                ¿Desea eliminar la categoría?
                            </Typography>
                        )
                    }

                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setDeletingCategory(null)
                        }
                    >
                        Cancelar
                    </Button>

                    <Button
                        color="error"
                        onClick={() => {
                            onDelete(
                                Number(
                                    deletingCategory.id
                                )
                            )

                            setDeletingCategory(null)
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default AdminCategoryManager
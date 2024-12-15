import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import api from "../api";

const EditInventoryModal = ({ isOpen, onClose, itemId, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        category: "",
        supplierId: "",
    });
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await api.get("/api/suppliers");
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        const fetchInventoryItem = async () => {
            if (itemId) {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/inventorys/${itemId}`);
                    setFormData({
                        name: response.data.name,
                        quantity: response.data.quantity,
                        category: response.data.category,
                        supplierId: response.data.supplier?._id || "",
                    });
                } catch (error) {
                    console.error("Error fetching inventory item:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSuppliers();
        fetchInventoryItem();
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/inventorys/${itemId}`, formData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating inventory item:", error);
            alert("Failed to update item.");
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography
                            variant="h5"
                            textAlign="center"
                            fontWeight="bold"
                            color={blue[500]}
                            mb={3}
                        >
                            Edit Inventory
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />

                            <TextField
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />

                            <TextField
                                label="Supplier"
                                name="supplierId"
                                select
                                value={formData.supplierId}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            >
                                {suppliers.map((supplier) => (
                                    <MenuItem key={supplier._id} value={supplier._id}>
                                        {supplier.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box display="flex" justifyContent="flex-end" mt={3}>
                                <Button
                                    onClick={onClose}
                                    variant="outlined"
                                    sx={{
                                        color: grey[600],
                                        borderColor: grey[400],
                                        mr: 2,
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: blue[500], color: "white" }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default EditInventoryModal;

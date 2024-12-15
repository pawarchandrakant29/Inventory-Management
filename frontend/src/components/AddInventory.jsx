import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper,
    CircularProgress,
} from "@mui/material";
import { green, blueGrey } from "@mui/material/colors";

const AddInventory = () => {
    const [form, setForm] = useState({ name: "", category: "", quantity: "", supplierId: "" });
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/suppliers");
                if (Array.isArray(response.data)) {
                    setSuppliers(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                }
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/inventorys", form);
            alert("Inventory item successfully added!");
            navigate("/");
            setForm({ name: "", category: "", quantity: "", supplierId: "" });
        } catch (error) {
            console.error("Error adding inventory item:", error);
            alert("Failed to add inventory item.");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor={blueGrey[50]}
            p={2}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: 3,
                    backgroundColor: "#fff",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    gutterBottom
                    color={green[700]}
                    fontWeight="bold"
                >
                    Add New Inventory
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                    gutterBottom
                >
                    Fill out the form below to add a new inventory item.
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={3} mt={2}>
                            <TextField
                                label="Item Name"
                                name="name"
                                variant="outlined"
                                value={form.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            <TextField
                                label="Category"
                                name="category"
                                variant="outlined"
                                value={form.category}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                variant="outlined"
                                value={form.quantity}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            <FormControl fullWidth required>
                                <InputLabel id="supplier-label">Supplier</InputLabel>
                                <Select
                                    labelId="supplier-label"
                                    name="supplierId"
                                    value={form.supplierId}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="" disabled>
                                        Select Supplier
                                    </MenuItem>
                                    {(suppliers || []).map((supplier) => (
                                        <MenuItem key={supplier._id} value={supplier._id}>
                                            {supplier.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                size="large"
                                fullWidth
                                sx={{ textTransform: "none" }}
                            >
                                Add Inventory Item
                            </Button>
                        </Box>
                    </form>
                )}
            </Paper>
        </Box>
    );
};

export default AddInventory;

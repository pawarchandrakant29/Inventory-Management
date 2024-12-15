import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import api from "../api";

const AddSupplier = () => {
    const [form, setForm] = useState({ name: "", contact: "", email: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/suppliers", form);
            alert("Supplier added successfully!");
            navigate("/supplier");
            setForm({ name: "", contact: "", email: "" });
        } catch (error) {
            console.error("Error adding supplier", error);
            alert("Failed to add supplier.");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor={blue[50]}
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
                    color={deepOrange[500]}
                    fontWeight="bold"
                >
                    Add New Supplier
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                    gutterBottom
                >
                    Provide the details of the supplier below.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3} mt={2}>
                        <TextField
                            label="Supplier Name"
                            name="name"
                            variant="outlined"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Contact Number"
                            name="contact"
                            type="number"
                            variant="outlined"
                            value={form.contact}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ textTransform: "none" }}
                        >
                            Add Supplier
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddSupplier;

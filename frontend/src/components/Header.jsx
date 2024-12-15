import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import img1 from "../../public/logo.png";

const Header = () => {
    return (
        <AppBar
            position="static"
            sx={{
                background: `linear-gradient(to right, ${blue[500]}, ${yellow[700]})`,
                color: "white",
                padding: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo Section */}
                <Box display="flex" alignItems="center">
                    <img
                        src={img1}
                        alt="logo"
                        style={{ height: 50, width: "auto", borderRadius: "8px", marginRight: 16 }}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                        Inventory System
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box>
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            marginX: 1,
                            "&:hover": { color: yellow[500], textDecoration: "underline" },
                        }}
                    >
                        Inventory Dashboard
                    </Button>
                    <Button
                        component={Link}
                        to="/addinventory"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            marginX: 1,
                            "&:hover": { color: yellow[500], textDecoration: "underline" },
                        }}
                    >
                        Add New Item
                    </Button>
                    <Button
                        component={Link}
                        to="/addsupplier"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            marginX: 1,
                            "&:hover": { color: yellow[500], textDecoration: "underline" },
                        }}
                    >
                        Register Supplier
                    </Button>
                    <Button
                        component={Link}
                        to="/supplier"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            marginX: 1,
                            "&:hover": { color: yellow[500], textDecoration: "underline" },
                        }}
                    >
                        Supplier Directory
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

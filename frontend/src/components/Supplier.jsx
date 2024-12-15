import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import api from '../api';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get('/api/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`/api/suppliers/${id}`);
        setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
        alert('Supplier deleted successfully!');
      } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('Failed to delete supplier.');
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Suppliers List
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : suppliers.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.light' }}>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Contact
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier._id} hover>
                    <TableCell align="center">{supplier.name}</TableCell>
                    <TableCell align="center">{supplier.email}</TableCell>
                    <TableCell align="center">{supplier.contact}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDelete(supplier._id)}
                        color="error"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ color: 'text.secondary', mt: 3 }}>
            No suppliers available.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Supplier;

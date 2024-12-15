import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { FaEdit, FaTrashAlt, FaFileImport, FaFileExport } from 'react-icons/fa';
import EditInventoryModal from './EditInventory';
import Papa from 'papaparse';
import api from '../api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/api/inventorys');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/api/inventorys/${id}`);
        setInventory(inventory.filter((item) => item._id !== id));
        alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item.');
      }
    }
  };

  const openEditModal = (id) => {
    setSelectedItemId(id);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedItemId(null);
  };

  const refreshInventory = async () => {
    try {
      const response = await api.get('/api/inventorys');
      setInventory(response.data);
    } catch (error) {
      console.error('Error refreshing inventory:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/api/inventorys/export', {
        headers: {
          Accept: 'text/csv',
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data.');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const csv = e.target.result;
      const parsedData = Papa.parse(csv, { header: true });

      if (parsedData.errors.length) {
        console.error('CSV parsing errors:', parsedData.errors);
        alert('Error parsing CSV file.');
        return;
      }

      const inventoryItems = parsedData.data.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity),
        category: item.category,
        supplier: { name: item.supplier },
        lowStockAlert: item.lowStockAlert === 'Yes',
      }));

      try {
        await api.post('/api/inventorys/import', { items: inventoryItems }, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert('Items imported successfully!');
        refreshInventory();
      } catch (error) {
        console.error('Error importing items:', error);
        alert('Failed to import items.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Inventory Management
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <Button
          variant="contained"
          color="success"
          startIcon={<FaFileExport />}
          onClick={handleExport}
        >
          Export
        </Button>

        <Button
          component="label"
          variant="contained"
          color="primary"
          startIcon={<FaFileImport />}
        >
          Import
          <input type="file" accept=".csv" hidden onChange={handleImport} />
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={300}>
          <CircularProgress />
        </Box>
      ) : inventory.length > 0 ? (
        <Grid container spacing={3}>
          {inventory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', position: 'relative' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Category: {item.category}</Typography>
                <Typography>Supplier: {item.supplier?.name || 'N/A'}</Typography>
                <Typography
                  color={item.lowStockAlert ? 'error.main' : 'success.main'}
                  sx={{ fontWeight: 'bold', mt: 1 }}
                >
                  Low Stock: {item.lowStockAlert ? 'Yes' : 'No'}
                </Typography>
                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => openEditModal(item._id)}>
                      <FaEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <FaTrashAlt />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="textSecondary">
          No inventory items available.
        </Typography>
      )}

      <EditInventoryModal
        isOpen={modalOpen}
        onClose={closeEditModal}
        itemId={selectedItemId}
        onUpdate={refreshInventory}
      />
    </Box>
  );
};

export default Inventory;

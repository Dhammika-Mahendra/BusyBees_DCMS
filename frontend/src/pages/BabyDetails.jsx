import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import NewBabyDetailsForm from '../components/NewBabyDetailsForm';

const BabyDetails = () => {
  const [children, setChildren] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');
  const [open, setOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = () => {
    axios.get('http://localhost:8080/children')
      .then(response => {
        setChildren(response.data);
        console.log('Children fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching children:', error);
      });
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickOpen = (child = null) => {
    setSelectedChild(child);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedChild(null);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/child?childId=${id}`)
          .then(() => {
            fetchChildren();
            Swal.fire(
              'Deleted!',
              'The child has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting child:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the child.',
              'error'
            );
          });
      }
    });
  };

  const handleSave = () => {
    fetchChildren();
    handleClose();
  };

  const filteredChildren = children.filter((child) =>
    child.first_name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Baby Details
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        Add New Baby Details
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search by first name"
        value={filterName}
        onChange={handleFilterByName}
        sx={{
          mb: 2,
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.dark',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.light',
            },
          },
          '& .MuiInputBase-input': {
            padding: '10px 14px',
          },
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'first_name'}
                  direction={orderBy === 'first_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('first_name')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'last_name'}
                  direction={orderBy === 'last_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('last_name')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChildren.map((child) => (
              <TableRow key={child.id} hover>
                <TableCell>{child.id}</TableCell>
                <TableCell>{child.first_name}</TableCell>
                <TableCell>{child.last_name}</TableCell>
                <TableCell>{child.dob}</TableCell>
                <TableCell>{child.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(child)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(child.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedChild ? 'Edit Baby Details' : 'Add New Baby Details'}</DialogTitle>
        <DialogContent>
          <NewBabyDetailsForm child={selectedChild} onSave={handleSave} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
       
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BabyDetails;
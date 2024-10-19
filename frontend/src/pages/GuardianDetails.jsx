import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import NewGuardianDetailsForm from '../components/NewGuardianDetailsForm';

const GuardianDetails = () => {
  const [guardians, setGuardians] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');
  const [open, setOpen] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState(null);

  useEffect(() => {
    fetchGuardians();
  }, []);

  const fetchGuardians = () => {
    axios.get('http://localhost:8080/guardian')
      .then(response => {
        setGuardians(response.data);
        console.log('Guardians fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching guardians:', error);
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

  const handleClickOpen = (guardian = null) => {
    setSelectedGuardian(guardian);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGuardian(null);
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
        axios.delete(`http://localhost:8080/Guardian?id=${id}`)
          .then(() => {
            fetchGuardians();
            Swal.fire(
              'Deleted!',
              'The guardian has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting guardian:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the guardian.',
              'error'
            );
          });
      }
    });
  };

  const handleSave = () => {
    fetchGuardians();
    handleClose();
  };

  const filteredGuardians = guardians.filter((guardian) =>
    guardian.first_name?.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Guardian Details
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        Add New Guardian Details
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
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGuardians.map((guardian) => (
              <TableRow key={guardian.id} hover>
                <TableCell>{guardian.id}</TableCell>
                <TableCell>{guardian.first_name}</TableCell>
                <TableCell>{guardian.last_name}</TableCell>
                <TableCell>{guardian.email}</TableCell>
                <TableCell>{guardian.phone_number}</TableCell>
                <TableCell>{guardian.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(guardian)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(guardian.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedGuardian ? 'Edit Guardian Details' : 'Add New Guardian Details'}</DialogTitle>
        <DialogContent>
          <NewGuardianDetailsForm guardian={selectedGuardian} onSave={handleSave} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
       
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuardianDetails;
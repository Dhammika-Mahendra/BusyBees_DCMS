import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import NewClassroomDetailsForm from '../components/NewClassroomDetailsForm';

const ClassroomDetails = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('class_name');
  const [open, setOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = () => {
    axios.get('http://localhost:8080/classRoom')
      .then(response => {
        setClassrooms(response.data);
        console.log('Classrooms fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching classrooms:', error);
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

  const handleClickOpen = (classroom = null) => {
    setSelectedClassroom(classroom);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClassroom(null);
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
        axios.delete(`http://localhost:8080/classRoom?id=${id}`)
          .then(() => {
            fetchClassrooms();
            Swal.fire(
              'Deleted!',
              'The classroom has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting classroom:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the classroom.',
              'error'
            );
          });
      }
    });
  };

  const handleSave = () => {
    fetchClassrooms();
    handleClose();
  };

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.class_name?.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Classroom Details
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        Add New Classroom Details
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search by class name"
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
                  active={orderBy === 'class_name'}
                  direction={orderBy === 'class_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('class_name')}
                >
                  Class Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Age Group</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClassrooms.map((classroom) => (
              <TableRow key={classroom.id} hover>
                <TableCell>{classroom.id}</TableCell>
                <TableCell>{classroom.class_name}</TableCell>
                <TableCell>{classroom.age_group}</TableCell>
                <TableCell>{classroom.last_updated}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(classroom)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(classroom.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedClassroom ? 'Edit Classroom Details' : 'Add New Classroom Details'}</DialogTitle>
        <DialogContent>
          <NewClassroomDetailsForm classroom={selectedClassroom} onSave={handleSave} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
       
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassroomDetails;
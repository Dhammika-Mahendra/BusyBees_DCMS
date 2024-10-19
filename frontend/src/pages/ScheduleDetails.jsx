import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import NewScheduleDetailsForm from '../components/NewScheduleDetailsForm';

const ScheduleDetails = () => {
  const [schedules, setSchedules] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [open, setOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = () => {
    axios
      .get('http://localhost:8080/schedule')
      .then((response) => {
        setSchedules(response.data);
        console.log('Schedules fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching schedules:', error);
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

  const handleClickOpen = (schedule = null) => {
    setSelectedSchedule(schedule);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchedule(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/schedule?scheduleId=${id}`)
      .then(() => {
        fetchSchedules();
      })
      .catch((error) => {
        console.error('Error deleting schedule:', error);
      });
  };

  const handleSave = () => {
    fetchSchedules();
    handleClose();
  };

  // Filtering schedules based on 'staff_id'
  const filteredSchedules = schedules.filter((schedule) =>
    schedule.staff_id.toString().includes(filterName.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Schedule Details
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
        sx={{ mb: 2 }}
      >
        Add New Schedule Details
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search by staff ID"
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
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleRequestSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Staff ID</TableCell>
              <TableCell>Child ID</TableCell>
              <TableCell>Classroom ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchedules.map((schedule) => (
              <TableRow key={schedule.id} hover>
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.end_time}</TableCell>
                <TableCell>{schedule.staff_id}</TableCell>
                <TableCell>{schedule.child_id}</TableCell>
                <TableCell>{schedule.classroom_id}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleClickOpen(schedule)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(schedule.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedSchedule ? 'Edit Schedule Details' : 'Add New Schedule Details'}
        </DialogTitle>
        <DialogContent>
          <NewScheduleDetailsForm schedule={selectedSchedule} onSave={handleSave} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduleDetails;

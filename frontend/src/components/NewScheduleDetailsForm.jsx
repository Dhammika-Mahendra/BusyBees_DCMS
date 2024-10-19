import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function NewBabyDetailsForm() {
  const [formData, setFormData] = useState({
    id: 0,
    address: '',
    dob: '',
    first_name: '',
    last_name: '',
    guardian_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guardian_id' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log the form data
    axios.post('http://localhost:8080/child', formData)
      .then(response => {
        console.log('Baby details saved:', response.data);
        setFormData({
          address: '',
          dob: '',
          first_name: '',
          last_name: '',
          guardian_id: '',
        });
      })
      .catch(error => {
        console.error('Error saving baby details:', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Date of Birth"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Guardian ID"
        name="guardian_id"
        value={formData.guardian_id}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        type="number"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default NewBabyDetailsForm;

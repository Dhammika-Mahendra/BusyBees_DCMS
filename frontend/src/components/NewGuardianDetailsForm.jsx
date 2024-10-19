import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function NewGuardianDetailsForm({ guardian, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: 0,
    address: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  useEffect(() => {
    if (guardian) {
      setFormData({
        id: guardian.id,
        address: guardian.address,
        email: guardian.email || '',
        first_name: guardian.first_name || '',
        last_name: guardian.last_name || '',
        phone_number: guardian.phone_number || '',
      });
    }
  }, [guardian]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = guardian
      ? axios.put(`http://localhost:8080/guardian?id=${formData.id}`, formData)
      : axios.post('http://localhost:8080/guardian', formData);

    request
      .then(response => {
        console.log('Guardian details saved:', response.data);
        setFormData({
          id: 0,
          address: '',
          email: '',
          first_name: '',
          last_name: '',
          phone_number: '',
        });
        onSave();
      })
      .catch(error => {
        console.error('Error saving guardian details:', error);
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
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        variant="outlined"
        fullWidth
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default NewGuardianDetailsForm;

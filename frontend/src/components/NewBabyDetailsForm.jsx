import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function NewBabyDetailsForm({ child, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: 0,
    address: '',
    dob: '',
    first_name: '',
    last_name: '',
    guardian_id: '',
  });

  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    // Fetch guardians data
    axios.get('http://localhost:8080/guardian')
      .then(response => {
        setGuardians(response.data);
      })
      .catch(error => {
        console.error('Error fetching guardians:', error);
      });

    if (child) {
      setFormData({
        id: child.id,
        address: child.address,
        dob: child.dob,
        first_name: child.first_name,
        last_name: child.last_name,
        guardian_id: child.guardian_id,
      });
    }
  }, [child]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guardian_id' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = child
      ? axios.put(`http://localhost:8080/child?childId=${child.id}`, formData)
      : axios.post('http://localhost:8080/child', formData);

    request
      .then(response => {
        console.log('Baby details saved:', response.data);
        setFormData({
          id: 0,
          address: '',
          dob: '',
          first_name: '',
          last_name: '',
          guardian_id: '',
        });
        onSave();
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
      <FormControl fullWidth variant="outlined" required>
        <InputLabel id="guardian-label">Guardian</InputLabel>
        <Select
          labelId="guardian-label"
          name="guardian_id"
          value={formData.guardian_id}
          onChange={handleChange}
          label="Guardian"
        >
          {guardians.map((guardian) => (
            <MenuItem key={guardian.id} value={guardian.id}>
              {`ID: ${guardian.id} - ${guardian.first_name} ${guardian.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default NewBabyDetailsForm;
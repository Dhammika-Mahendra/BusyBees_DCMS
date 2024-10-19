import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function NewClassroomDetailsForm({ classroom, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: 0,
    age_group: '',
    class_name: '',
    last_updated: '',
  });

  useEffect(() => {
    if (classroom) {
      setFormData({
        id: classroom.id,
        age_group: classroom.age_group || '',
        class_name: classroom.class_name || '',
        last_updated: classroom.last_updated,
      });
    }
  }, [classroom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = classroom
      ? axios.put(`http://localhost:8080/classRoom?id=${classroom.id}`, formData)
      : axios.post('http://localhost:8080/classRoom', formData);

    request
      .then(response => {
        console.log('Classroom details saved:', response.data);
        setFormData({
          id: 0,
          age_group: '',
          class_name: '',
          last_updated: '',
        });
        onSave();
      })
      .catch(error => {
        console.error('Error saving classroom details:', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Class Name"
        name="class_name"
        value={formData.class_name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Age Group"
        name="age_group"
        value={formData.age_group}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Last Updated"
        name="last_updated"
        value={formData.last_updated}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
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

export default NewClassroomDetailsForm;
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useFaqs } from '../../hooks/useFaqs';

const AdminPanel = () => {
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const { createFaq } = useFaqs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFaq(formData);
      setFormData({ question: '', answer: '' });
      setNotification({
        open: true,
        message: 'FAQ created successfully!',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error creating FAQ',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add New FAQ
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            margin="normal"
            required
            multiline
            rows={4}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Add FAQ
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPanel; 
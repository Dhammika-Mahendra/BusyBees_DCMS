// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BabyDetails from './pages/BabyDetails';
import BabySitterDetails from './pages/BabySitterDetails';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';
import GuardianDetails from './pages/GuardianDetails';
import ClassroomDetails from './pages/ClassroomDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optionally, you can add any other cleanup or redirect logic here
  };

  return (
    <Router>
      <CssBaseline />
      {isLoggedIn ? (
        <>
          <Header />
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar onLogout={handleLogout} /> {/* Pass handleLogout to Sidebar */}
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/babyDetails" element={<BabyDetails />} />
                <Route path='/guardianDetails' element={<GuardianDetails />} />
                <Route path='/classroomDetails' element={<ClassroomDetails />} />
                <Route path="/babySitterDetails" element={<BabySitterDetails />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Box>
          </Box>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

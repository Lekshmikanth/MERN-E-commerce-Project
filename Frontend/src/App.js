import { Typography } from '@mui/material';
import './App.css';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';

function App() {
  return (
    <>
      <Typography className="app" component="div">
        <DashboardLayout />
        <Outlet />
      </Typography>
    </>
  );
}

export default App;

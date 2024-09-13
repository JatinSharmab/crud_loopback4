import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from 'theme/theme.ts';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider.tsx';
import router from 'routes/router';
import './index.css';
import { UserProvider } from 'components/context/context';  // Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BreakpointsProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

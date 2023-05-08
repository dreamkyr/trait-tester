import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const StepLayout = () => {
  return (
    <Container
      sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      disableGutters
    >
      <Outlet />
    </Container>
  );
};

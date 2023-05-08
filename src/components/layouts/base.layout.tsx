import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const BaseLayout = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      disableGutters
    >
      <Outlet />
    </Container>
  );
};

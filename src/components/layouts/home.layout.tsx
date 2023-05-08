import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      disableGutters
    >
      <Outlet />
    </Container>
  );
};

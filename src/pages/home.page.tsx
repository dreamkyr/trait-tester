import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Grid container item rowSpacing={12}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            Are you an introvert or an extrovert?
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            size="large"
            sx={{ px: 8 }}
            onClick={() => navigate('/step/1')}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

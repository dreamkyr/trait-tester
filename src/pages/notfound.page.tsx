import React from 'react';
import { Grid, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Grid container item rowSpacing={12}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6">Page Not Found</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

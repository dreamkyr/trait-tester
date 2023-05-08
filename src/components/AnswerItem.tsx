import React from 'react';
import { Avatar, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { IAnswer } from '../interfaces';

interface Props {
  alphabet: string;
  selected?: boolean;
  item?: IAnswer;
  onSelect?: () => void;
  loading?: boolean;
}

export const AnswerItem = ({
  selected = false,
  alphabet = 'A',
  item,
  loading = false,
  onSelect = () => {},
}: Props) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        p: 2,
        display: 'flex',
        cursor: 'pointer',
        borderStyle: selected ? 'solid' : 'none',
        borderColor: 'primary.main',
      }}
      elevation={selected ? 0 : 1}
      component={Paper}
      onClick={onSelect}
    >
      <Avatar
        variant="rounded"
        sx={{
          width: 20,
          height: 20,
          backgroundColor: selected ? 'primary.light' : undefined,
        }}
      >
        <Typography variant="body2">{alphabet}</Typography>
      </Avatar>
      <Typography
        sx={{ ml: 2, width: '100%', fontWeight: '600' }}
        variant="body2"
      >
        {loading ? <Skeleton animation="wave" /> : item?.label}
      </Typography>
    </Grid>
  );
};

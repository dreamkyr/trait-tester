import React from 'react';
import { Chip, Grid, Skeleton, Typography } from '@mui/material';
import { IAnswer, IQuestion } from '../interfaces';
import { AnswerItem } from './AnswerItem';

interface Props {
  question?: IQuestion;
  selectedAnswer?: IAnswer;
  stepLabel: string;
  loading?: boolean;
  onSelectAnswer?: (answer: IAnswer) => void;
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  loading = false,
  stepLabel = '',
  onSelectAnswer = () => {},
}: Props) => {
  return (
    <Grid container rowGap={2}>
      <Grid container rowGap={4}>
        <Grid item xs={12}>
          <Chip label={stepLabel} color="primary" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontFamily="monospace">
            {loading ? <Skeleton animation="wave" /> : question?.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" fontStyle="italic">
            {loading ? (
              <Skeleton animation="wave" width={150} />
            ) : (
              'All questions are required'
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        rowGap={2}
        sx={{
          p: 2,
          backgroundColor: '#00000010',
          borderRadius: 2,
        }}
      >
        {question?.answers?.map((answer, index) => (
          <AnswerItem
            key={index}
            item={answer}
            selected={selectedAnswer?.id === answer?.id}
            alphabet={(index + 10).toString(36).toUpperCase()}
            onSelect={() => !loading && onSelectAnswer(answer)}
          />
        ))}
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <AnswerItem
              key={index}
              loading
              alphabet={(index + 10).toString(36).toUpperCase()}
            />
          ))}
      </Grid>
    </Grid>
  );
};

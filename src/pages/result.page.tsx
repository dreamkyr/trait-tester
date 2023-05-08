import React from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuestionService } from '../services';
import { RESULT_DATA } from '../config';
import { useFirebase } from '../contexts';
import { QuestionCard } from '../components';

export const ResultPage = () => {
  const [questionService] = React.useState(QuestionService.getInstance());
  const navigate = useNavigate();
  const {
    values: {
      question: { items = [] },
    },
  } = useFirebase();
  const [showAnswers, setShowAnswers] = React.useState(false);

  return (
    <Grid container rowGap={2}>
      <Grid
        item
        xs={12}
        sx={{
          p: 2,
          pt: 4,
          backgroundColor: '#00000010',
          borderRadius: 2,
          my: 2,
        }}
      >
        <Typography
          variant="h5"
          fontFamily="monospace"
          textAlign="center"
          fontStyle="italic"
        >
          Your Result
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="600"
          sx={{ my: 2 }}
        >
          {questionService.isIntrovert < 0
            ? RESULT_DATA.extrovert.title
            : RESULT_DATA.introvert.title}
        </Typography>
        <Typography
          component="div"
          variant="body1"
          lineHeight={1.8}
          letterSpacing={1}
          sx={{ my: 3 }}
          dangerouslySetInnerHTML={{
            __html:
              questionService.isIntrovert < 0
                ? RESULT_DATA.extrovert.description
                : RESULT_DATA.introvert.description,
          }}
        />
      </Grid>
      <Grid container>
        <Grid item xs={5.5} sm={5}>
          <Button
            variant="contained"
            fullWidth
            sx={{ fontWeight: '600' }}
            onClick={() => {
              questionService.resetScores();
              navigate('/');
            }}
          >
            Retake test
          </Button>
        </Grid>
        <Grid item xs={1} sm={2} />
        <Grid item xs={5.5} sm={5} textAlign="right">
          <Button
            variant="outlined"
            fullWidth
            sx={{ fontWeight: '600' }}
            onClick={() => setShowAnswers(prev => !prev)}
          >
            {showAnswers ? 'Hide my answers' : 'Show my answers'}
          </Button>
        </Grid>
      </Grid>
      <Grid container rowGap={4}>
        {showAnswers && (
          <Grid container>
            <Typography variant="h5" sx={{ my: 4 }}>
              Your answers:
            </Typography>
            {items?.map((item, index) => (
              <Grid key={index}>
                <QuestionCard
                  stepLabel={`Question ${index + 1} / ${items?.length}`}
                  selectedAnswer={item?.answers?.find(
                    ({ score }) =>
                      score === questionService.getScoreByQuestion(item.id)
                  )}
                  question={item}
                />
                <Divider sx={{ my: 4 }} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

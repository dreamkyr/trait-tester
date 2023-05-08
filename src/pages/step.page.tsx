import React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useFirebase } from '../contexts';
import { IAnswer } from '../interfaces';
import { QuestionCard } from '../components';
import { QuestionService } from '../services';

export const StepPage = () => {
  const [questionService] = React.useState(QuestionService.getInstance());
  const {
    values: {
      question: { items, loading },
    },
  } = useFirebase();
  const navigate = useNavigate();
  const { id } = useParams();
  const step = Number(id) - 1;
  const question = React.useMemo(() => items?.at(step), [step, items]);
  const [selected, setSelected] = React.useState<IAnswer>();

  const isLastStep = React.useMemo(() => {
    return step === items?.length - 1;
  }, [items?.length, step]);
  const nextLabel = React.useMemo(() => {
    return isLastStep ? 'Finish test' : 'Next Question';
  }, [isLastStep]);

  const onPrevious = React.useCallback(() => {
    navigate(`/step/${step}`);
  }, [navigate, step]);

  const onNext = React.useCallback(() => {
    questionService.updateScore(question?.id!, selected?.score!);
    if (!isLastStep) {
      navigate(`/step/${step + 2}`);
      return;
    }

    navigate('/result');
  }, [
    questionService,
    question?.id,
    selected?.score,
    isLastStep,
    navigate,
    step,
  ]);

  React.useEffect(() => {
    const selectedScore = questionService.getScoreByQuestion(question?.id!);
    setSelected(question?.answers?.find(item => item.score === selectedScore));
  }, [question, questionService]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      flex={1}
      rowGap={4}
    >
      <Grid container>
        <QuestionCard
          stepLabel={`Question ${
            loading ? '0 / 0' : `${step + 1} / ${items?.length}`
          }`}
          question={question}
          selectedAnswer={selected}
          loading={loading}
          onSelectAnswer={(answer: IAnswer) => setSelected(answer)}
        />
      </Grid>
      <Grid container>
        <Grid item xs={5.5} sm={4}>
          <Button
            variant="contained"
            fullWidth
            disabled={step < 1}
            startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
            onClick={onPrevious}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={1} sm={4} />
        <Grid item xs={5.5} sm={4} textAlign="right">
          <Button
            variant="contained"
            fullWidth
            disabled={!selected}
            endIcon={<KeyboardArrowRightIcon fontSize="small" />}
            onClick={onNext}
          >
            {nextLabel}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

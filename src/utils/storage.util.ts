const ANSWER_KEY = 'trait-tester-answer';

export const saveAnswers = (values: { [symbol: string]: number } = {}) => {
  localStorage.setItem(ANSWER_KEY, JSON.stringify(values));
};

export const getAnswers = () => {
  const values = localStorage.getItem(ANSWER_KEY);
  return JSON.parse(values!);
};

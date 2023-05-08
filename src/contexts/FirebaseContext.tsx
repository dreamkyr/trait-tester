import React from 'react';
import { Outlet } from 'react-router-dom';
import { FirebaseService, QuestionService } from '../services';
import { IQuestion } from '../interfaces';

interface FirebaseContextProviderValues {
  loading: boolean;
  question: {
    items: IQuestion[];
    loading: boolean;
  };
}

const defaultValues: FirebaseContextProviderValues = {
  loading: false,
  question: {
    items: [],
    loading: false,
  },
};

export interface FirebaseContextType {
  values: FirebaseContextProviderValues;
  setValues: (payload: Partial<FirebaseContextProviderValues>) => void;
}

const defaultFirebaseContextValue: FirebaseContextType = {
  values: defaultValues,
  setValues: () => {},
};

export const FirebaseContext = React.createContext(defaultFirebaseContextValue);

export const FirebaseContextProvider = () => {
  const [firebaseInstance] = React.useState(FirebaseService.getInstance());
  const [questionInstance] = React.useState(QuestionService.getInstance());
  const [values, setValues] =
    React.useState<FirebaseContextProviderValues>(defaultValues);

  const updateValues = React.useCallback(
    (payload: Partial<FirebaseContextProviderValues>) =>
      setValues(prev => ({ ...prev, ...payload })),
    []
  );

  const loadQuestions = React.useCallback(async () => {
    setValues(prev => ({
      ...prev,
      question: { ...prev.question, loading: true },
    }));
    const data = await firebaseInstance.loadQuestions();
    questionInstance.setQuestions(data);
    setValues(prev => ({
      ...prev,
      question: { items: data, loading: false },
    }));
  }, [firebaseInstance, questionInstance]);

  React.useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const value = React.useMemo(
    () => ({
      values,
      setValues: updateValues,
    }),
    [updateValues, values]
  );

  return (
    <FirebaseContext.Provider value={value}>
      <Outlet />
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return React.useContext(FirebaseContext);
};

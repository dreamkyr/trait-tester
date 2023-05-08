import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { BaseLayout, HomeLayout, StepLayout } from '../components';
import { HomePage, NotFoundPage, ResultPage, StepPage } from '../pages';
import { FirebaseContextProvider } from '../contexts';

export const RootNavigator = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route element={<FirebaseContextProvider />}>
          <Route element={<HomeLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="step" element={<StepLayout />}>
              <Route path=":id" element={<StepPage />} />
              <Route
                path="*"
                index
                element={<Navigate replace to="/step/1" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Route>
    </Routes>
  );
};

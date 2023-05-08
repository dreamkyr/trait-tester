import React from 'react';
import { Route } from 'react-router-dom';

import { StepLayout } from '../components';
import { StepPage } from '../pages';

export const StepNavigator = () => {
  return (
    <Route path="" element={<StepLayout />}>
      <Route path=":step" element={<StepPage />} />
    </Route>
  );
};

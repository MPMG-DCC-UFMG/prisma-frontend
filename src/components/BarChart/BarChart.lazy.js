import React, { lazy, Suspense } from 'react';

const LazyBarChart = lazy(() => import('./BarChart'));

const BarChart = props => (
  <Suspense fallback={null}>
    <LazyBarChart {...props} />
  </Suspense>
);

export default BarChart;

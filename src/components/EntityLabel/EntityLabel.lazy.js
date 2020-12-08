import React, { lazy, Suspense } from 'react';

const LazyEntityLabel = lazy(() => import('./EntityLabel'));

const EntityLabel = props => (
  <Suspense fallback={null}>
    <LazyEntityLabel {...props} />
  </Suspense>
);

export default EntityLabel;

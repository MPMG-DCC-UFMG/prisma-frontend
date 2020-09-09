import React, { lazy, Suspense } from 'react';

const LazyEntityDetailPage = lazy(() => import('./EntityDetailPage'));

const EntityDetailPage = props => (
  <Suspense fallback={null}>
    <LazyEntityDetailPage {...props} />
  </Suspense>
);

export default EntityDetailPage;

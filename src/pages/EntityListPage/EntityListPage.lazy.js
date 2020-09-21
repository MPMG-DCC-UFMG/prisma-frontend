import React, { lazy, Suspense } from 'react';

const LazyEntityListPage = lazy(() => import('./EntityListPage'));

const EntityListPage = props => (
  <Suspense fallback={null}>
    <LazyEntityListPage {...props} />
  </Suspense>
);

export default EntityListPage;

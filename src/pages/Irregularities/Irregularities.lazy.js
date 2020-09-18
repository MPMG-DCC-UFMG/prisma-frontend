import React, { lazy, Suspense } from 'react';

const LazyIrregularities = lazy(() => import('./Irregularities'));

const Irregularities = props => (
  <Suspense fallback={null}>
    <LazyIrregularities {...props} />
  </Suspense>
);

export default Irregularities;

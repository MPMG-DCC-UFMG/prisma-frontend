import React, { lazy, Suspense } from 'react';

const LazyBiddingDetails = lazy(() => import('./BiddingDetails'));

const BiddingDetails = props => (
  <Suspense fallback={null}>
    <LazyBiddingDetails {...props} />
  </Suspense>
);

export default BiddingDetails;

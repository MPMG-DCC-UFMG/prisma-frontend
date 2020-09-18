import React, { lazy, Suspense } from 'react';

const LazyBidderDetails = lazy(() => import('./BidderDetails'));

const BidderDetails = props => (
  <Suspense fallback={null}>
    <LazyBidderDetails {...props} />
  </Suspense>
);

export default BidderDetails;

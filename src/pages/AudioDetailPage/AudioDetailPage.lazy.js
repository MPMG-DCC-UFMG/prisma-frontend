import React, { lazy, Suspense } from 'react';

const LazyAudioDetailPage = lazy(() => import('./AudioDetailPage'));

const AudioDetailPage = props => (
  <Suspense fallback={null}>
    <LazyAudioDetailPage {...props} />
  </Suspense>
);

export default AudioDetailPage;

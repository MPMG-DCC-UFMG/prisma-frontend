import React, { lazy, Suspense } from 'react';

const LazyAudioListPage = lazy(() => import('./AudioListPage'));

const AudioListPage = props => (
  <Suspense fallback={null}>
    <LazyAudioListPage {...props} />
  </Suspense>
);

export default AudioListPage;

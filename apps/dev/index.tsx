import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

const App = lazy(() => import('./src/App'))


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<p>...Loading</p>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
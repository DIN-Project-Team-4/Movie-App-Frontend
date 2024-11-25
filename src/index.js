import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexLayout from './IndexLayout.js';
import Home from './screens/Home.js';
import SearchResultsPage from './screens/SearchResultsPage.js';
import AdvancedSearch from './screens/AdvancedSearch.js';
import GroupsPage from './screens/GroupsPage.js';
import { MovieSearchProvider } from './context/MovieSearchContext.js';
import reportWebVitals from './reportWebVitals.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <SearchResultsPage />,
      },
      {
        path: '/advanced-search',
        element: <AdvancedSearch />,
      },
      {
        path: '/groups',
        element: <GroupsPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieSearchProvider>
      <RouterProvider router={router} />
    </MovieSearchProvider>
  </React.StrictMode>
);

reportWebVitals();

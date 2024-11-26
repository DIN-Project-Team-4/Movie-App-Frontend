import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css';
import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import IndexLayout from './IndexLayout.js';
import Home from './screens/Home.js';
import SearchResultsPage from './screens/SearchResultsPage.js';
import AdvancedSearch from './screens/AdvancedSearch.js';
import GroupsPage from './screens/GroupsPage.js';
import MovieDetails from './screens/MovieDetails.js';
import { MovieSearchProvider } from './context/MovieSearchContext.js';
import GroupPage from './screens/GroupPage.js';


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
      {
        path: '/groups/:groupId',
        element: <GroupPage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />,
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

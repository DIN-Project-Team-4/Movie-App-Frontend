import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals.js';

import DisplayReview from './components/Reviews/DisplayReview.js';
import { MovieSearchProvider } from './context/MovieSearchContext.js';
import IndexLayout from './IndexLayout.js';
import AdvancedSearch from './screens/AdvancedSearch.js';
import GroupPage from './screens/GroupPage.js';
import GroupsPage from './screens/GroupsPage.js';
import MyGroupsPage from './screens/MyGroupsPage.js';
import Home from './screens/Home.js';
import MovieDetails from './screens/MovieDetails.js';
import SearchResultsPage from './screens/SearchResultsPage.js';
import ProfilePage from './screens/ProfilePage.js';


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
        path: '/groups/mygroups',
        element: <MyGroupsPage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />,
      },
      {
        path: '/reviews',
        element: <DisplayReview />
      },
      {
        path: '/profile',
        element: <ProfilePage />
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

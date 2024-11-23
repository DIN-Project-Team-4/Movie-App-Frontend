import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';
import './index.css';
import Home from './screens/Home.js';
import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchResultsPage from './screens/SearchResultsPage.js';
import AdvancedSearch from './screens/AdvancedSearch.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/advanced-search',
    element: <AdvancedSearch/>,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

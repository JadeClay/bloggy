import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import store from './app/store'
import { Provider } from 'react-redux'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Root from './routes/Templates/Root';
import Home from './routes/Home';
import Admin from './routes/Templates/Admin';
import Dashboard from './routes/Dashboard';
import DashboardPosts from './routes/DashboardPosts';
import DashboardSettings from './routes/DashboardSettings';
import DashboardAccounts from './routes/DashboardAccounts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Admin />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/posts",
        element: <DashboardPosts />
      },
      {
        path: "/dashboard/accounts",
        element: <DashboardAccounts />
      },
      {
        path: "/dashboard/settings",
        element: <DashboardSettings />
      }
    ]
  }
]);

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> 
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

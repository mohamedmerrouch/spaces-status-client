import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MySpaces from "./Pages/MySpaces";
import ErrorPage from "./Pages/errorPage";
import Dashboard from './Pages/Dashboard';
import {getMySpaces, getSpaces } from './apis/spacesApi';
import SetResponsible from './Pages/SetResponsible';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
                loader: getSpaces,
                action: () => {return null},
            },
            {
                path: "/my-spaces/:responsible",
                element: <MySpaces />,
                loader: ({params}) => getMySpaces(params.responsible?? ''),
            },
            {
                path: "/my-spaces",
                element: <SetResponsible />,
            },
        ]
    },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

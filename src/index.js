import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider , Route, BrowserRouter } from 'react-router-dom';

import '././index.css';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/Login",
//     element: <Loginform/>,
//   },
//   {
//     path: "/upload",
//     element: <Uploadpage/>,
//   },
//   {
//     path: "/jobdescription",
//     element: <Jobdescriptionpage/>,
//   },
//   {
//     path: "/completed",
//     element: <Finishedpage/>,
//   },
// ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<App/>
</BrowserRouter>
 );


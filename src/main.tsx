import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import Acceuil from "./composants/acceuil.tsx";
import Portofolio from "./composants/portofolio.tsx";
import CV from './composants/cv.tsx'








const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
   {
    path: '/acceuil.tsx',
    element: <Acceuil/>,
  },
  {
    path: '/portofolio.tsx',
    element: <Portofolio/>,
  },
  {
    path: '//cv.tsx',
    element: <CV />,
  },
 
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);


import React from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet, Form } from 'react-router-dom';

// Importaciones de la pagina de inicio
import Home from "./home/Home";
import SesionUser from "./pages/sesion/SesionUser";
import SesionProfesional from "./pages/sesion/SesionProfesional";
import MorhealthUser from "./pages/MorhealthUser";

//Importaciones de las sesiones

//Importaciones de morhealth para usuarios

//Importaciones de morhealth para profesionales
const LayoutInicio = () => {
  return (
    <Outlet />
  )
}

const Layout = () => {
  return (
    <Outlet />
  )
}

const router = createBrowserRouter([

  //Rutas para pagina principal
  {
    path: '/',
    element: <LayoutInicio />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },

  // Rutas para sesion
  {
    path: '/ingresar',
    element: <SesionUser />,
    children: [
      {
        path: '/ingresarprofesional',
        element: <SesionProfesional />
      }
    ]
  },

  //Rutas para morhealth Usuario
  {
    path: '/morhealth',
    element: <Layout />,
    children: [
      {
        path: '/morhealth',
        element: <MorhealthUser />
      }
    ]
  },

  //Rutas para morhealth Profesionales
  {
    path: '/',
    element: <LayoutInicio />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

function App() {




  return (


        <div className='App'>
          <div className="contenedorGeneral">
            <RouterProvider router={router} />
          </div>
        </div>


  );
}

export default App;

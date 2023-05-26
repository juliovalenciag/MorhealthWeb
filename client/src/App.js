import React from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet, Form } from 'react-router-dom';

// Importaciones de la pagina de inicio
import Home from "./home/Home";
import MorhealthUser from "./pages/MorhealthUser";

//Importaciones de las sesiones
import SesionUser from "./pages/sesion/SesionUser";
import SesionProfesional from "./pages/sesion/SesionProfesional";
import MorhealthProfesional from "./pages/MorhealthProfesional";

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

const LayoutP = () => {
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
  },
  {
    path: '/ingresar/profesional',
    element: <SesionProfesional />,
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
    path: '/morhealthp',
    element: <LayoutP />,
    children: [
      {
        path: '/morhealthp',
        element: <MorhealthProfesional />
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

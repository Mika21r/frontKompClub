import { useContext, useState, useEffect } from 'react';
import {observer} from 'mobx-react-lite';
import './styles/main.css';

import BookingSeats from './pages/bookingSeats/BookingSeats';
import AdminPanel from './pages/Admin/AdminPanel';
import Header from './components/header/Header';
import { Context } from './main';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const App = observer(() => {
  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
        store.checkAuth()
    }
  }, [])
  
  const router = 
  store.isAuth && (store.userRoles.includes("ADMIN") || store.userRoles.includes("OWNER"))
  ?
  createBrowserRouter([
    {
      path: "/",
      element: <AdminPanel/>
    },
  ])
  :
  createBrowserRouter([
    {
      path: "/",
      element: <BookingSeats/>
    },
    {
      path: "/home",
      element: <div>page home!</div>,
    },
    {
      path: "/test",
      element: <div>page test!</div>,
    }
  ])
 

  
  return (
    <>
      <Header/>
      <RouterProvider router={router} />
    </>
    
  )
})

export default App

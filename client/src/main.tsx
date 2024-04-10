import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/tailwind.css';
import './Styles/style.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router.tsx'
import CartContext from './Contexts/CartContext.tsx';
import CartProvider from './Contexts/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
   <RouterProvider router={router} />
   </CartProvider>
  </React.StrictMode>,
)

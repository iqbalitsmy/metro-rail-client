import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes/routes'
import { RouterProvider } from "react-router-dom";
import UserProvider from './AuthProvider/UserProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51OfyfmCocyN0DGeB1NVtaYVhj65Ss1WaUn2ZY8k92Zp6SMIYgYKlm6MTq3wb27yv6Z2xdm2Bb1e6hUnMPXFJHhQp002J2aSl2y")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Elements>
  </React.StrictMode>,
)

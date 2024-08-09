import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe('pk_test_51Pg5eaRunlLVaZ2Qh40V2fgX3R7OHVLB93VcysG4yNMFl1a6W7jTspQXWqNpAUOeRUveAcgWLGEcSW62JawLPVL900COinYIgg');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
  )
}

export default App
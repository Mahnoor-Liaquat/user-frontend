import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import SweetAlert from 'sweetalert2';
import LoadingScreen from '../Loader'; // Import the loader

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  animation: ${fadeIn} 1s ease-out;
`;

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border: 2px solid #1565c0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial, sans-serif";
  animation: ${slideIn} 1s ease-out;
  position: relative; /* Ensure form container is positioned relative for absolute positioning of loader */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #e65100;
  animation: ${bounce} 1s ease-out;
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
  color: #1565c0;
  animation: ${fadeIn} 1s ease-out;
`;

const Row = styled.div`
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
  animation: ${fadeIn} 1s ease-out;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  animation: ${fadeIn} 1s ease-out;
`;

const CardContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  animation: ${fadeIn} 1s ease-out;
`;

const Button = styled.button`
  width: 100%;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${bounce} 1s ease-out;
  margin-top: 20px; /* Ensure there's space above the button for loader */
  
  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-payment-intent",
        {
          amount: 1000 * 100, 
        }
      );

      const clientSecret = response.data.clientSecret;

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (error) {
        setError(error.message);
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Payment failed! Please try again.',
        });
      } else {
        setSuccess(true);
        SweetAlert.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: 'Your fee has been paid successfully.',
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Payment failed! Please try again.',
      });
    } finally {
      setLoading(false);// Hide loader
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {loading && <LoaderWrapper><LoadingScreen /></LoaderWrapper>} {/* Show loader */}
        <Title>Pay Tuition Fees</Title>
        <Row>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </Row>
        <Row>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Row>
        <Row>
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter your course"
            required
          />
        </Row>
        <SubTitle>Pay with Card</SubTitle>
        <Row>
          <Label htmlFor="card">Card Details</Label>
          <CardContainer>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </CardContainer>
        </Row>
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Payment successful!</SuccessMessage>}
      </Form>
    </Container>
  );
};

export default CheckoutForm;

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SweetAlert from 'sweetalert2';
import LoadingScreen from '../Loader';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial, sans-serif";
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const QRCodeImage = styled.img`
  margin-top: 20px;
  max-width: 300px;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aria-hidden: ${(props) => (props.loading ? 'true' : 'false')};
`;

const QRCodeForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    phoneNumber: ''
  });
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/api/qrcode/generate', formData);
      setQRCode(data.qrCode);
      SweetAlert.fire({
        icon: 'success',
        title: 'QR Code Generated!',
        text: 'Your QR code has been generated successfully.',
      });
    } catch (error) {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to generate QR code: ${error.response?.data?.message || 'Something went wrong!'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {loading && <LoaderWrapper aria-hidden="true"><LoadingScreen /></LoaderWrapper>}
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <h1>EasyPaisa Payment</h1>
          <FormRow>
            <Label htmlFor="amount">Amount:</Label>
            <Input 
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input 
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </FormRow>
          <Button type="submit" disabled={loading}>Generate QR Code</Button>
        </Form>
      )}
      {qrCode && (
        <QRCodeImage src={qrCode} alt="QR Code" />
      )}
    </FormContainer>
  );
};

export default QRCodeForm;

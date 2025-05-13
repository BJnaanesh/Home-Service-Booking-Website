import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './PaymentForm.css';

const PaymentForm = ({ amount, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // This is a placeholder for the actual payment processing
      // We'll implement this once we have the Stripe secret key
      console.log('Processing payment for:', amount);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSuccess();
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form">
      <div className="payment-header">
        <h2>Payment Details</h2>
        <p className="amount">Total Amount: ${amount}</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="payment-fields">
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            disabled={isProcessing}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              disabled={isProcessing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              placeholder="123"
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>

      <div className="payment-actions">
        <button
          className="cancel-button"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </button>
        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
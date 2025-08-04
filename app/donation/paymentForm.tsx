"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0.5) {
      setErrorMessage("Please enter a valid amount (minimum $0.50).");
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (pmError || !paymentMethod) {
      setErrorMessage(pmError?.message || "Payment method creation failed.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parsedAmount }),
    });

    const { clientSecret } = await res.json();

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError || paymentIntent?.status !== "succeeded") {
      setErrorMessage(confirmError?.message || "Payment failed. Try again.");
      setLoading(false);
      return;
    }

    // Redirect on success
    window.location.href = "/donation-success";
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Donation Amount (USD)</label>
        <input
          type="number"
          step="0.01"
          min="0.5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. 10.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement className="p-2 border rounded mt-1" />
      </div>

      {errorMessage && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

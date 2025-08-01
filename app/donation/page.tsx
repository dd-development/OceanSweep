"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./paymentForm";
import { usePageTitle } from "../context/PageTitleContext";
import { useEffect } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function DonationPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Donation");
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-6">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌊 Support Ocean Conservation
          </h1>
          <p className="text-lg text-gray-600">
            Your contribution helps us protect marine life and preserve the beauty of our oceans.
          </p>
        </section>

        {/* Payment Form */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
          <PaymentForm />
        </div>
      </div>
    </Elements>
  );
}

export default function DonationCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-900">
      <div className="p-8 rounded-lg bg-white shadow-md text-center">
        <h1 className="text-3xl font-bold mb-2">❌ Donation Cancelled</h1>
        <p>
          You cancelled the payment. No worries — feel free to try again
          anytime.
        </p>
      </div>
    </div>
  );
}

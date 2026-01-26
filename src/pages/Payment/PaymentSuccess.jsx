import { useSearchParams, Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiHome } from "react-icons/fi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow max-w-md text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold mb-2">Payment Successful 🎉</h2>

        <p className="text-gray-600 mb-4">
          Your premium membership is being activated.
        </p>

        <div>
          <Link to="/dashboard" className="btn btn-primary w-full text-lg">
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center text-gray-500 hover:text-gray-800"
          >
            <FiHome className="mr-2" /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

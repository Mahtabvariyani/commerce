"use client";

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  console.log("payment-intent", paymentIntent);
  console.log("clientSecret", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
          // updated_intent_id: updated_intent
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Received data:", data); // Log the received data
          if (
            (data && data.paymentIntent && data.paymentIntent.client_secret) ||
            (data && data.updated_intent && data.updated_intent.client_secret)
          ) {
            const clientSecretData = data.paymentIntent
              ? data.paymentIntent
              : data.updated_intent;
            console.log("Received data:", clientSecretData); // Log the received data
            setClientSecret(clientSecretData.client_secret);
            handleSetPaymentIntent(clientSecretData.id);
          } else {
            setError(true);
            console.error("Invalid data format:", data);
            toast.error("Unexpected or missing data from the server");
          }
        })
        .catch((error) => {
          setError(true);
          console.error("Error fetching data:", error);
          toast.error("Error: " + error.message);
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading CheckOut</div>}
      {error && (
        <div className="text-center text-rose-500">Something went Wrong</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-green-600 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              lable="View Your Payment"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;

// "use client";

// import { useCart } from "@/hooks/useCart";
// import { Elements } from "@stripe/react-stripe-js";
// import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";
// import React, { useCallback, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import CheckoutForm from "./CheckoutForm";
// import Button from "../components/Button";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

// const CheckoutClient = () => {
//   const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const router = useRouter();

//   console.log("payment-intent", paymentIntent);
//   console.log("clientSecret", clientSecret);

//   useEffect(() => {
//     if (cartProducts) {
//       setLoading(true);
//       setError(false);

//       fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cartProducts,
//           payment_intent_id: paymentIntent,
//           // updated_intent_id: updated_intent
//         }),
//       })
//         .then(async (res) => {
//           setLoading(false);
//           if (res.status === 401) {
//             return router.push("/login");
//           }
//           const data = await res.json();
//           console.log("Received data:", data); // Log the received data
//           if (
//             (data && data.paymentIntent && data.paymentIntent.client_secret) ||
//             (data && data.updated_intent && data.updated_intent.client_secret)
//           ) {
//             const clientSecretData = data.paymentIntent
//               ? data.paymentIntent
//               : data.updated_intent;
//             console.log("Received data:", clientSecretData); // Log the received data
//             setClientSecret(clientSecretData.client_secret);
//             handleSetPaymentIntent(clientSecretData.id);
//           } else {
//             setError(true);
//             console.error("Invalid data format:", data);
//             toast.error("Unexpected or missing data from the server");
//           }
//         })
//         .catch((error) => {
//           setError(true);
//           console.error("Error fetching data:", error);
//           toast.error("Error: " + error.message);
//         });
//     }
//   }, [cartProducts, paymentIntent]);

//   const options: StripeElementsOptions = {
//     clientSecret,
//     appearance: {
//       theme: "stripe",
//       labels: "floating",
//     },
//   };

//   const handleSetPaymentSuccess = useCallback((value: boolean) => {
//     setPaymentSuccess(value);
//   }, []);

//   return (
//     <div className="w-full">
//       {clientSecret && cartProducts && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm
//             clientSecret={clientSecret}
//             handleSetPaymentSuccess={handleSetPaymentSuccess}
//           />
//         </Elements>
//       )}
//       {loading && <div className="text-center">Loading Checkout</div>}
//       {error && (
//         <div className="text-center text-rose-500">
//           Something went wrong. Please try again.
//         </div>
//       )}
//       {paymentSuccess && (
//         <div className="flex items-center flex-col gap-4">
//           <div className="text-green-600 text-center">Payment Success</div>
//           <div className="max-w-[220px] w-full">
//             <Button
//               lable="View Your Payment" // Correct the misspelling to "label"
//               onClick={() => router.push("/orders")}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutClient;

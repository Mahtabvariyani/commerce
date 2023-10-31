"use strict";

import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).send("Missing the stripe Signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook error:", err); // Log the error for debugging
    return res.status(400).send("Webhook error" + err);

  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      console.log(event);
      if (typeof charge.payment_intent === 'string') {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "Complete",
            address: charge.shipping?.address,
          },
        });
      }
      break;
    default:
      console.log("unhandeled event type:" + event.type);
  }

  res.json({ recieved: true });
}


// "use strict";

// import { NextApiRequest, NextApiResponse } from "next";
// import { buffer } from "stream/consumers";
// import Stripe from "stripe";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const buf = await buffer(req);
//   const sig = req.headers["stripe-signature"];
//   if (!sig) {
//     return res.status(400).send("Missing the stripe Signature");
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err) {
//     console.error("Webhook error:", err); // Log the error for debugging
//     return res.status(400).send("Webhook error: " + err);
//   }

//   try {
//     switch (event.type) {
//       case "charge.succeeded":
//         const charge: any = event.data.object as Stripe.Charge;
//         console.log(event);
//         await prisma?.order.update({
//           where: { paymentIntentId: charge.payment_intent },
//           data: {
//             status: "Complete",
//             address: {
//               city: charge.shipping?.address.city,
//               country: charge.shipping?.address.country,
//               line1: charge.shipping?.address.line1,
//               line2: charge.shipping?.address.line2,
//               "postal_code": charge.shipping?.address.postal_code,
//               state: charge.shipping?.address.state,
//             },
//           },
//         });
//         break;
//       default:
//         console.log("unhandled event type: " + event.type);
//     }

//     res.json({ received: true });
//   } catch (error) {
//     console.error("Error handling event:", error);
//     return res.status(500).send("Error handling event: " + error);
//   }
// }

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stipe";
import { getSession } from "@/lib/api/session";

// import { stripe } from "../../../lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getSession();
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1TiPiyPHd7Y7gcAIZeSaJL72",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/dashboard/organizer/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    // console.log(session);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).end();
}

const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items: [
{
price: process.env.STRIPE_PRICE_ID,
quantity: 1
}
],
success_url: `${req.headers.origin}/success.html`,
cancel_url: `${req.headers.origin}/cancel.html`
});

res.json({ url: session.url });
}

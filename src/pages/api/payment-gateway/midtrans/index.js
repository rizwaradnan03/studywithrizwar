import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export default async function handler(req, res) {
  try {
    const { token_buatan } = req.body;

    if (!token_buatan) throw new Error("Error Midtrans Payment");

    // Generate a unique order ID
    const currentTimeMillis = Date.now();
    const orderId = `order-${currentTimeMillis}`;

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: 5000,
      },
      item_details: [
        {
          name: "Donasi Ke Rizwar",
          price: 5000,
          quantity: 1,
        },
      ],
    };

    const token = await snap.createTransactionToken(parameter);

    console.log('hasil token', token)

    res.status(200).json({ token });
  } catch (error) {
    console.log("(API) Error Payment Midtrans", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

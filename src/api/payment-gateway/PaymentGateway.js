import { ApiManager } from "../ApiManager";

export const MidtransPayment = async () => {
  try {
    // console.log('isii products', products)
    const result = await ApiManager("/payment-gateway/midtrans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        token_buatan: '123456789'
      }
    });

    return result.data;
  } catch (error) {
    console.log("(API FUNCTION) Error Payment Midtrans", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

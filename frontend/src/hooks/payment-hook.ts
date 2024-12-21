import axios from "./axios-config";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import the persist middleware from zustand

type PaymentStore = {
  paymentOption: string; // Store the payment option (e.g., "payNow", "payLater")
  setPaymentOption: (option: string) => void; // Function to update the payment option
}

export const usePaymentStore = create<PaymentStore>(
  persist(
    (set) => ({
      paymentOption: "payLater", // Default value
      setPaymentOption: (option) => set({ paymentOption: option }),
    }),
    {
      name: "payment-store", // Key to persist in local storage
    }
  )
);

export async function createPayment(bookingCode: number) {
  try {
    const response = await axios.post(`/api/payment/${bookingCode}`);
    return response.data;
  } catch (error) {
    console.error("Error creating payment", error);
    throw error;
  }
}



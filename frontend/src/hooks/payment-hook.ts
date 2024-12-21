import axios from "./axios-config";

export async function createPayment(bookingCode: number) {
  try {
    const response = await axios.post(`/api/payment/${bookingCode}`);
    return response.data;
  } catch (error) {
    console.error("Error creating payment", error);
    throw error;
  }
}

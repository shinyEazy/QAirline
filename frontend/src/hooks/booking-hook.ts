import { create } from "zustand";
import { BookingPayload } from "types/booking";
import { Passenger } from "types/passenger";
import axios from "./axios-config";
import { persist } from "zustand/middleware"; // Import the persist middleware from zustand

// Define the state and actions
type BookingStore = {
  payload: BookingPayload;
  setUserId: (userId: number) => void;
  setFlightId: (flightId: number) => void;
  setFlightClass: (flightClass: string) => void;
  setNumberOfAdultsAndChildren: (
    numberOfAdults: number,
    numberOfChildren: number
  ) => void;
  setBookerEmail: (bookerEmail: string) => void;
  addPassenger: (passenger: Passenger) => void;
  updatePassenger: (index: number, passenger: Passenger) => void;
  getPassengers: () => [Passenger];
  getPayload: () => BookingPayload;
  setPassengers: (passengers: Passenger[]) => void; // New action to set passengers
};

const useBookingStore = create<BookingStore>(
  persist((set, get) => ({
    payload: {
      booker_email: null,
      number_of_adults: 0,
      number_of_children: 0,
      flight_class: null,
      cancelled: false,
      flight_id: null,
      passengers: [],
    },

    setBookerEmail: (bookerEmail) => {
      set((state) => ({
        payload: { ...state.payload, booker_email: bookerEmail },
      }));
    },

    setFlightId: (flightId) => {
      set((state) => ({ payload: { ...state.payload, flight_id: flightId } }));
    },
    // New setPassengers action to replace the entire passengers list
    setPassengers: (passengers) => {
      set((state) => ({
        payload: {
          ...state.payload,
          passengers: passengers,
        },
      }));
    },
    setFlightClass: (flightClass) => {
      set((state) => ({
        payload: { ...state.payload, flight_class: flightClass },
      }));
    },

    setNumberOfAdultsAndChildren: (numberOfAdults, numberOfChildren) => {
      set((state) => ({
        payload: {
          ...state.payload,
          number_of_adults: numberOfAdults,
          number_of_children: numberOfChildren,
        },
      }));
    },

    addPassenger: (passenger) => {
      set((state) => ({
        payload: {
          ...state.payload,
          passengers: [...state.payload.passengers, passenger],
        },
      }));
    },
    updatePassenger: (index, passenger) => {
      set((state) => {
        const updatedPassengers = [...state.payload.passengers];
        if (index >= 0 && index < updatedPassengers.length) {
          updatedPassengers[index] = passenger;
        }
        return { payload: { ...state.payload, passengers: updatedPassengers } };
      });
    },
    // Function to return the passengers
    getPassengers: () => {
      return get().payload.passengers;
    },
    getPayload: () => get().payload,
  })),
  {
    name: "booking-store", // Specify the custom key for localStorage
  }
);

export async function createBooking(payload: BookingPayload) {
  try {
    const response = await axios.post("/api/booking/", payload);
    useBookingStore.persist.clearStorage(); // Clears the persisted state
    return response.data;
  } catch (error) {
    console.error("Error creating booking", error);
    throw error;
  }
}

export async function fetchbookingInfo(booking_id: string) {
  try {
    const response = await axios.get(`/api/booking/info/${booking_id}`);
    return response.data;
  } catch (error) {
    console.error("Request error", error);
  }
}

export async function cancelBooking(booking_id: string) {
  try {
    const response = await axios.post(`/api/booking/cancel/${booking_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default useBookingStore;

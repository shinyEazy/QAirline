import { create } from "zustand";
import { Flight } from "../types/flight";

interface FlightSearchState {
  departureCity: string;
  arrivalCity: string;
  departing: Date;
  returning: Date;
  tripType: "oneway" | "roundtrip";
  flights: Flight[];
  showReturnDate: boolean;
  isRoundTrip: boolean;
  loading: boolean;

  setDepartureCity: (city: string) => void;
  setArrivalCity: (city: string) => void;
  setDeparting: (date: Date) => void;
  setReturning: (date: Date) => void;
  setShowReturnDate: (show: boolean) => void;
  setIsRoundTrip: (isRoundTrip: boolean) => void;
  setTripType: (type: "oneway" | "roundtrip") => void;
  setFlights: (flights: Flight[]) => void;
  resetSearch: () => void;
  setLoading: (loading: boolean) => void;
}

interface FlightSelectStore {
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight) => void;
}

export const useFlightSearchStore = create<FlightSearchState>((set) => ({
  departureCity: "",
  arrivalCity: "",
  departing: new Date(),
  returning: (() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  })(),
  showReturnDate: false,
  isRoundTrip: false,
  tripType: "oneway",
  flights: [],
  loading: false,

  setDepartureCity: (city) => set({ departureCity: city }),
  setArrivalCity: (city) => set({ arrivalCity: city }),
  setDeparting: (date) => set({ departing: date }),
  setReturning: (date) => set({ returning: date }),
  setShowReturnDate: (show) => set({ showReturnDate: show }),
  setIsRoundTrip: (isRoundTrip) => set({ isRoundTrip: isRoundTrip }),
  setTripType: (type) => set({ tripType: type }),
  setFlights: (flights) => set({ flights }),
  setLoading: (loading) => set({ loading }),

  resetSearch: () =>
    set({
      departureCity: "",
      arrivalCity: "",
      departing: new Date(),
      returning: (() => {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today;
      })(),
      showReturnDate: false,
      isRoundTrip: false,
      tripType: "oneway",
      flights: [],
      loading: false,
    }),
}));

export const useFlightStore = create<FlightSelectStore>((set) => ({
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
}));

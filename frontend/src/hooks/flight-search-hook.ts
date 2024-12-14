import { create } from 'zustand';
import { Flight } from '../types/flight';

interface FlightSearchState {
  departureCity: string;
  arrivalCity: string;
  departing: Date;
  returning: Date;
  tripType: 'oneway' | 'roundtrip';
  flights: Flight[];
  showReturnDate: boolean;
  isRoundTrip: boolean;

  setDepartureCity: (city: string) => void;
  setArrivalCity: (city: string) => void;
  setDeparting: (date: Date) => void;
  setReturning: (date: Date) => void;
  setShowReturnDate: (show: boolean) => void;
  setIsRoundTrip: (isRoundTrip: boolean) => void;
  setTripType: (type: 'oneway' | 'roundtrip') => void;
  setFlights: (flights: Flight[]) => void;
  resetSearch: () => void;
}

interface FlightSelectStore {
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight) => void;
}

export const useFlightSearchStore = create<FlightSearchState>((set) => ({
  departureCity: '',
  arrivalCity: '',
  departing: new Date(),
  returning: (() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  })(),
  showReturnDate: false,
  isRoundTrip: false,
  tripType: 'oneway',
  flights: [],

  setDepartureCity: (city) => set({ departureCity: city }),
  setArrivalCity: (city) => set({ arrivalCity: city }),
  setDeparting: (date) => set({ departing: date }),
  setReturning: (date) => set({ returning: date }),
  setShowReturnDate: (show) => set({ showReturnDate: show }),
  setIsRoundTrip: (isRoundTrip) => set({ isRoundTrip: isRoundTrip }),
  setTripType: (type) => set({ tripType: type }),
  setFlights: (flights) => set({ flights }),

  resetSearch: () => set({
    departureCity: '',
    arrivalCity: '',
    departing: new Date(),
    returning: (() => {
      const today = new Date();
      today.setDate(today.getDate() + 2);
      return today;
    })(),
    showReturnDate: false,
    isRoundTrip: false,
    tripType: 'oneway',
    flights: [],
  }),
}));

export const useFlightStore = create<FlightSelectStore>((set) => ({
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
}));

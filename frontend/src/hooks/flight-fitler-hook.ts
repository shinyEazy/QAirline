import { create } from "zustand";

interface FilterState {
  selectedPrice: number;
  selectedDepartureTime: string | null;
  selectedArrivalTime: string | null;
  setSelectedPrice: (price: number) => void;
  setSelectedDepartureTime: (time: string | null) => void;
  setSelectedArrivalTime: (time: string | null) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  selectedPrice: -1,
  selectedDepartureTime: null,
  selectedArrivalTime: null,
  setSelectedPrice: (price) => set({ selectedPrice: price }),
  setSelectedDepartureTime: (time) => set({ selectedDepartureTime: time }),
  setSelectedArrivalTime: (time) => set({ selectedArrivalTime: time }),
}));

export default useFilterStore;

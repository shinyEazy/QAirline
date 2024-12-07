import { useState } from 'react';
import { BookingPayload } from 'types/booking';
import { Passenger } from 'types/passenger';

const useBookingPayload = () => {
    const [payload, setPayload] = useState<BookingPayload>({
        user_id: null,
        number_of_adults: 0,
        number_of_children: 0,
        flight_class: null,
        cancelled: false,
        flight_id: null,
        passengers: [],
    });

    // Function to update user_id (from token)
    const setUserId = (userId: number) => {
        setPayload((prev) => ({ ...prev, user_id: userId }));
    };

    // Function to update flight and passenger numbers
    const setFlightId = (
        flightId: number,

    ) => {
        setPayload((prev) => ({
            ...prev,
            flight_id: flightId
        }));
    };

    // Function to update flight class
    const setFlightClass = (flightClass: string) => {
        setPayload((prev) => ({ ...prev, flight_class: flightClass }));
    };

    const setNumberOfAdultsandChild = (numberOfAdults: number, numberOfChild: number) => {
        setPayload((prev) => ({ ...prev, number_of_adults: numberOfAdults, numberOfChild: numberOfChild }));
    }
    // Function to add passenger details
    const addPassenger = (passenger: Passenger) => {
        setPayload((prev) => ({
            ...prev,
            passengers: [...prev.passengers, passenger],
        }));
    };

    // Function to get final payload
    const getPayload = () => payload;

    return { payload, setUserId, setFlightId, setFlightClass, setNumberOfAdultsandChild, addPassenger, getPayload };
};

export default useBookingPayload;
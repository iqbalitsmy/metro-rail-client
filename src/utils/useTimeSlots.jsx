import { useState } from 'react';

const useTimeSlots = (startTime, endTime) => {
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots(startTime, endTime));

    function generateTimeSlots(start, end) {
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);

        const slots = [];

        let currentHour = startHour;
        let currentMinute = startMinute;

        while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
            const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
            slots.push(formattedTime);

            // Increment the time by 15 minutes
            currentMinute += 15;

            // If the minute exceeds 59, reset it to 0 and increment the hour
            if (currentMinute === 60) {
                currentMinute = 0;
                currentHour += 1;
            }
        }

        return slots;
    }

    return {
        timeSlots,
        generateTimeSlots, // If you want to expose the generator function as well
    };
}

export default useTimeSlots;

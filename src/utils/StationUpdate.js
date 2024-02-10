function calculateRealTimeUpdates(stationArray, fillUpTime, travelTime, currentTime) {
    currentTime = currentTime || new Date(); // Use current time if provided, otherwise use current system time

    return stationArray.map((station, index) => {
        // Calculate estimated arrival time
        let arrivalTime = new Date(currentTime);
        arrivalTime.setMinutes(currentTime.getMinutes() + index * (fillUpTime + travelTime));

        // Calculate estimated halt time
        let haltTime = new Date(arrivalTime);
        haltTime.setMinutes(arrivalTime.getMinutes() + fillUpTime);

        // Calculate estimated departure time
        let departureTime = new Date(haltTime);
        departureTime.setMinutes(haltTime.getMinutes() + travelTime);

        // Calculate total duration
        let totalDuration = travelTime + fillUpTime;

        return {
            station: station,
            estimatedArrival: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimatedHalt: haltTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimatedDeparture: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            totalDuration: totalDuration,
        };
    });
}

// Example usage:
// const stationArray = ["Station A", "Station B", "Station C", "Station D"];
// const fillUpTime = 5; // in minutes
// const travelTime = 10; // in minutes
// const customCurrentTime = new Date('2024-02-03T06:21:44');


export default calculateRealTimeUpdates;
// console.log(calculateRealTimeUpdates(stationArray, fillUpTime, travelTime, customCurrentTime);)

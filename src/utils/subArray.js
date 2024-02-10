function generateSubarray(startStation, endStation, stationArray) {
    const startIndex = stationArray.findIndex(station => station.name === startStation);
    const endIndex = stationArray.findIndex(station => station.name === endStation);

    // Ensure both stations are in the array
    if (startIndex !== -1 && endIndex !== -1) {
        if (startIndex <= endIndex) {
            return stationArray.slice(startIndex, endIndex + 1);
        } else {
            return stationArray.slice(endIndex, startIndex + 1).reverse();
        }
    } else {
        return [];
    }
}

export default generateSubarray;
function isTodayOrFutureDate(inputDate) {
    // Get today's date
    const today = new Date();
    // Convert input date string to a Date object
    const inputDateObj = new Date(inputDate);

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    today.setHours(0, 0, 0, 0);
    inputDateObj.setHours(0, 0, 0, 0);

    // Compare dates
    return inputDateObj >= today;
}

export default isTodayOrFutureDate;

// Example usage:
// const inputDate = "2024-03-10T00:00:00.000Z";
// const result = isTodayOrFutureDate(inputDate);
// console.log(result); // Output will be true if input date is today or a future date, false otherwise

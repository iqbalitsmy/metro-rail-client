function roundTimeToSlot(time) {
    const slots = [10, 20, 30, 40, 50, 0];

    const [datePart, timePart] = time.split('T');
    const [hours, minutes] = timePart.slice(0, 8).split(':').map(Number);
    let roundedMinutes;

    for (const slot of slots) {
        if (minutes <= slot) {
            roundedMinutes = slot;
            break;
        }
    }

    // If the roundedMinutes is undefined, roll over to the next hour
    if (roundedMinutes === undefined) {
        const nextHour = (hours + 1) % 24;
        roundedMinutes = slots[0];
        const roundedTime = `${String(nextHour).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
        return `${datePart}T${roundedTime}:00`;
    }

    const roundedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
    return `${datePart}T${roundedTime}:00`;
}
export default roundTimeToSlot;

// // Example usage:
// const inputTime = '2024-02-02T20:55:00';
// const outputTime = roundTimeToSlot(inputTime);
// console.log(outputTime);
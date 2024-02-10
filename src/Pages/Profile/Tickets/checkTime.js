function canRefundTicket(purchaseTime) {
    // Parse input purchase time string and current time
    const purchaseDateTime = new Date(purchaseTime);
    const currentDateTime = new Date();
    // console.log(purchaseDateTime)
    // console.log(currentDateTime)
    
    // Calculate the difference in minutes between purchase time and current time
    const timeDifferenceMinutes = (currentDateTime - purchaseDateTime) / (1000 * 60);

    // Check if purchase time is within the 30-minute threshold
    if (timeDifferenceMinutes <= 30) {
        // If the purchase time is within 30 minutes, return true (ticket can be refunded)
        return true;
    } else {
        // If the purchase time is beyond 30 minutes, return false (ticket cannot be refunded)
        return false;
    }
}


export default canRefundTicket;

// // Test cases
// console.log(canRefundTicket("2024-02-08T08:55:11")); // Output: false
// console.log(canRefundTicket("2024-02-08T04:45:11")); // Output: true
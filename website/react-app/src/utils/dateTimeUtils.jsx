// Function to get the current NYC date time as a pre-defined string (hour precision)
export const getCurrentTimeInNY = () => {
    const currentTime = new Date();
    const nyTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    // Get the individual components of the time
    const year = nyTime.getFullYear();
    const month = String(nyTime.getMonth() + 1).padStart(2, '0');
    const day = String(nyTime.getDate()).padStart(2, '0');
    const hour = String(nyTime.getHours()).padStart(2, '0');

    // Format the time string
    const formattedTime = `${year}-${month}-${day}T${hour}:00:00-04:00`;
    return formattedTime;
};

// Function to convert NYCTime string to NYC hour (Slider value)
export const getNYCHourFromTimeString = (timeString) => {
    const nyTime = new Date(new Date(timeString).toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return nyTime.getHours();
};

// Function to change Slider value (NYC Hour) to NYC Time String for the same day
export const setHourInTimeString = (timeString, newHour) => {
    // Pad the new hour with a leading zero if necessary
    const paddedHour = String(newHour).padStart(2, '0');

    // Replace the hour in the time string
    return timeString.replace(/T\d{2}:/, `T${paddedHour}:`);
};

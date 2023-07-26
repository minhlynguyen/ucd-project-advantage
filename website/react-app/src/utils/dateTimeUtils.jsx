// change Slider value to datetime
export function formatTimeWithOffset(date, hour, offset = '-04:00') {
    date.setHours(hour);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedHour = String(hour).padStart(2, '0');

    return `${year}-${month}-${day}T${formattedHour}:00:00${offset}`;
}

// Function to get the current time in New York timezone as a string (hour precision)
export const getCurrentTimeInNY = () => {
    const currentTime = new Date();
    const nyTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    // Get the individual components of the time
    const year = nyTime.getUTCFullYear();
    const month = String(nyTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(nyTime.getUTCDate()).padStart(2, '0');
    const hour = String(nyTime.getUTCHours()).padStart(2, '0');

    // Format the time string
    const formattedTime = `${year}-${month}-${day}T${hour}:00:00-04:00`;
    return formattedTime;
};


// dateString: yyyy-mm-dd
exports.age = function (dateString) {
    // Define the timeStamps
    const timeStamps = {
        birth: new Date(Date.parse(dateString)),
        now: new Date()
    }
    const { birth, now } = timeStamps;
    // Year, month and day differences
    let age = now.getUTCFullYear() - birth.getUTCFullYear();
    const monthDifference = now.getUTCMonth() - birth.getUTCMonth();
    const dayDifference = now.getUTCDate() - birth.getUTCDate();
    // Logic
    if(monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0))
        return age;
    else
        return (age - 1);
}
const finalData = require("../data.json");

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

exports.date = function(currentTimestamp) {
    // Define
    const now = new Date(currentTimestamp);
    const nowData = {
        year: now.getUTCFullYear(),
        month: `0${now.getUTCMonth() + 1}`.slice(-2),
        day: `0${now.getUTCDate()}`.slice(-2)
    }
    // Return
    return (`${nowData.year}-${nowData.month}-${nowData.day}`);
}

exports.findTeacher = function(request) {
    const { id } = request.params;
    const foundTeacher = finalData.find(
        function(anInstructor) {
            return (Number(id) === Number(anInstructor.id));
        }
    );
    if(!foundTeacher)
        return false;
    else
        return foundTeacher;
}

exports.graduation = function(aString) {
    switch (aString) {
        case "highSchool":
            return "Complete High School level";

        case "undergraduate":
            return "Complete Undergraduate level";

        case "master":
            return "Master degree";

        case "doctorate":
            return "Doctorate degree";
    
        default:
            return "No study level registered";
    }
}
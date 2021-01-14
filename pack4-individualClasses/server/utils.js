const data = require("../data.json");
const teachersData = data.teachers;
const studentsData = data.students;

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

exports.date = function(aTimestamp) {
    // Define
    const rawDate = new Date(aTimestamp);
    const dataObject = {
        year: rawDate.getUTCFullYear(),
        month: `0${rawDate.getUTCMonth() + 1}`.slice(-2),
        day: `0${rawDate.getUTCDate()}`.slice(-2)
    }
    // Return
    return {
        day: dataObject.day,
        year: dataObject.year,
        month: dataObject.month,
        birthDay: `${dataObject.day}/${dataObject.month}`, 
        iso: `${dataObject.year}-${dataObject.month}-${dataObject.day}`
    };
}

exports.findTeacher = function(request) {
    const { id } = request.params;
    const foundTeacher = teachersData.find(
        function(anInstructor) {
            return (Number(id) === Number(anInstructor.id));
        }
    );
    if(!foundTeacher)
        return false;
    else
        return foundTeacher;
}

exports.findStudent = function(request) {
    const { id } = request.params;
    const foundStudent = studentsData.find(
        function(aStudent) {
            return (Number(id) === Number(aStudent.id));
        }
    );
    if(!foundStudent)
        return false;
    else
        return foundStudent;
}

exports.grade = function(aString) {
    switch(aString) {
        case "5th-year":
            return "5th year of Fundamental School";

        case "6th-year":
            return "6th year of Fundamental School";
        
        case "6th-year":
            return "6th year of Fundamental School";
        
        case "7th-year":
            return "7th year of Fundamental School";
        
        case "8th-year":
            return "8th year of Fundamental School";
        
        case "9th-year":
            return "9th year of Fundamental School";
        
        case "1st-year-highSchool":
            return "1st year of High School";
        
        case "2nd-year-highSchool":
            return "2nd year of High School";

        case "3rd-year-highSchool":
            return "3rd year of High School";
    }
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
// Requires
const fs = require("fs");
const finalData = require("../../data.json");
const { 
    age, 
    date, 
    findTeacher,
    graduation
} = require("./utils");

module.exports = {
    renderLanding(request, response) {
        return response.render("landing");
    },

    renderCreate(request, response ) {
        return response.render("teachers/create");
    },

    renderEdit(request, response) {
        // Find the teacher
        const foundTeacher = findTeacher(request); 
        if(!foundTeacher)
            return response.status(404).send("Teacher not found....");
        else {
            const teacher = {
                ...foundTeacher,
                since: date(foundTeacher.since)
            };
            return response.render("teachers/edit", { teacher });
        }     
    },

    editTeacher(request, response) {
        // Find the teacher
        const { id } = request.body;
        const foundTeacher = finalData.find(
            function(anInstructor) {
                return (Number(id) === Number(anInstructor.id));
            }
        );
        if(!foundTeacher)
            return response.status(404).send("Teacher not found....");
        else {
            const newData = request.body;
            const teacher = {
                ...foundTeacher,
                ...newData
            };
            // Get the index
            let teacherIndex = 0;
            finalData.find(
                function (aTeacher, theIndex) {
                    if(Number(aTeacher.id) === Number(teacher.id)) {
                        teacherIndex = theIndex;
                        return true;
                    }
                }
            );
            // Save the new data in the array
            finalData[teacherIndex] = teacher;
            // Write the file
            fs.writeFile(
                "data.json",
                JSON.stringify(finalData, null, 2),
                function(error) {
                    if(error) return response.send("Error writing file");
                    else return response.redirect("/");
                }
            );
        }
    },

    showTeacher(request, response) {
        // Find the teacher
        const foundTeacher = findTeacher(request); 
        if(!foundTeacher)
            return response.status(404).send("Teacher not found....");
        // Adjusts
        const teacher = {
            ...foundTeacher,
            age: age(foundTeacher.birth),
            since: new Intl.DateTimeFormat("en-US").format(foundTeacher.since),
            studyLevel: graduation(foundTeacher.studyLevel),
            subjects: foundTeacher.subjects.split(","),
        };
        // Render the page
        return response.render(
            "teachers/show",
            { teacher }
        );
    },

    validateAndWriteData(request, response) {
        // Validation
        const dataKeys = Object.keys(request.body);
        const data = request.body;
        for(let aDataKey of dataKeys) {
            if(data[aDataKey] === "")
                return response.status(400).send("Please, fill all the fields");
        }
        data.id = Number(finalData.length) + 1;
        data.since = Date.now();
        // Write
        finalData.push(data);
        fs.writeFile(
            "data.json", 
            JSON.stringify(finalData, null, 2), 
            function (error) {
                if(error)
                    return response.send(error);
                else
                    return response.redirect("/");
            }
        );
    }
}

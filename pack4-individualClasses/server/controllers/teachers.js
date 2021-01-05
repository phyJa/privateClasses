// Requires
const fs = require("fs");
const teachersData = require("../../data.json").teachers;
const { 
    age, 
    date, 
    findTeacher,
    graduation
} = require("../utils");

module.exports = {
    renderTeacherLanding(request, response) {
        let newTeacherData = [...teachersData];
        for(let aTeacher of newTeacherData) {
            aTeacher.subjects = String(aTeacher.subjects).split(",");
        }
        return response.render(
            "teachers/index",
            {
                teachers: newTeacherData
            }
        );
    },

    renderTeacherCreate(request, response ) {
        return response.render("teachers/create");
    },

    renderTeacherEdit(request, response) {
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

    deleteTeacher(request, response) {
        // Get the the teacher id
        const { id } = request.body;
        // Create a new array excluding the selected teacher
        const newTeachersSet = teachersData.filter(
            function(anInstructor) {
                if (Number(id) === Number(anInstructor.id))
                    return false;
                 else 
                    return true; 
            }
        );
        // Write this new array in "data.json"
        fs.writeFile(
            "data.json",
            JSON.stringify(newTeachersSet, null, 2),
            function(error) {
                if(error)
                    return response.status(500).send("Error writing file");
                else 
                    return response.redirect("/");
            }
        );
        
    },

    editTeacher(request, response) {
        // Find the teacher
        const { id } = request.body;
        const foundTeacher = teachersData.find(
            function(anInstructor) {
                return (Number(id) === Number(anInstructor.id));
            }
        );
        if(!foundTeacher)
            return response.status(404).send("Teacher not found....");
        else {
            const newData = request.body;
            newData.id = Number(id);
            const teacher = {
                ...foundTeacher,
                ...newData
            };
            // Get the index
            let teacherIndex = 0;
            teachersData.find(
                function (aTeacher, theIndex) {
                    if(Number(aTeacher.id) === Number(teacher.id)) {
                        teacherIndex = theIndex;
                        return true;
                    }
                }
            );
            // Save the new data in the array
            teachersData[teacherIndex] = teacher;
            // Write the file
            fs.writeFile(
                "data.json",
                JSON.stringify(teachersData, null, 2),
                function(error) {
                    if(error) return response.send("Error writing file");
                    else return response.redirect(`/teachers/${id}/show`);
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
            subjects: String(foundTeacher.subjects).split(","),
        };
        // Render the page
        return response.render(
            "teachers/show",
            { teacher }
        );
    },

    validateAndWriteTeacherData(request, response) {
        // Validation
        const dataKeys = Object.keys(request.body);
        const data = request.body;
        for(let aDataKey of dataKeys) {
            if(data[aDataKey] === "")
                return response.status(400).send("Please, fill all the fields");
        }
        data.id = Number(teachersData.length) + 1;
        data.since = Date.now();
        // Write
        teachersData.push(data);
        fs.writeFile(
            "data.json", 
            JSON.stringify(teachersData, null, 2), 
            function (error) {
                if(error)
                    return response.send(error);
                else
                    return response.redirect("/");
            }
        );
    }
}

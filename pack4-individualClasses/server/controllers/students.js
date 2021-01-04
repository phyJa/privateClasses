// Requires
const fs = require("fs");
const finalData = require("../../data.json");
const { 
    age, 
    date, 
    findStudent,
    graduation
} = require("../utils");

module.exports = {
    renderStudentLanding(request, response) {
        let newStudentData = [...finalData];
        for(let aStudent of newStudentData) {
            aStudent.subjects = String(aStudent.subjects).split(",");
        }
        return response.render(
            "landing",
            {
                students: newStudentData
            }
        );
    },

    renderStudentCreate(request, response ) {
        return response.render("students/create");
    },

    renderStudentEdit(request, response) {
        // Find the student
        const foundStudent = findStudent(request); 
        if(!foundStudent)
            return response.status(404).send("Student not found....");
        else {
            const student = {
                ...foundStudent,
                since: date(foundStudent.since)
            };
            return response.render("students/edit", { student });
        }     
    },

    deleteStudent(request, response) {
        // Get the the student id
        const { id } = request.body;
        // Create a new array excluding the selected student
        const newStudentsSet = finalData.filter(
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
            JSON.stringify(newStudentsSet, null, 2),
            function(error) {
                if(error)
                    return response.status(500).send("Error writing file");
                else 
                    return response.redirect("/");
            }
        );
        
    },

    editStudent(request, response) {
        // Find the student
        const { id } = request.body;
        const foundStudent = finalData.find(
            function(anInstructor) {
                return (Number(id) === Number(anInstructor.id));
            }
        );
        if(!foundStudent)
            return response.status(404).send("Student not found....");
        else {
            const newData = request.body;
            newData.id = Number(id);
            const student = {
                ...foundStudent,
                ...newData
            };
            // Get the index
            let studentIndex = 0;
            finalData.find(
                function (aStudent, theIndex) {
                    if(Number(aStudent.id) === Number(student.id)) {
                        studentIndex = theIndex;
                        return true;
                    }
                }
            );
            // Save the new data in the array
            finalData[studentIndex] = student;
            // Write the file
            fs.writeFile(
                "data.json",
                JSON.stringify(finalData, null, 2),
                function(error) {
                    if(error) return response.send("Error writing file");
                    else return response.redirect(`/students/${id}/show`);
                }
            );
        }
    },

    showStudent(request, response) {
        // Find the student
        const foundStudent = findStudent(request); 
        if(!foundStudent)
            return response.status(404).send("Student not found....");
        // Adjusts
        const student = {
            ...foundStudent,
            age: age(foundStudent.birth),
            since: new Intl.DateTimeFormat("en-US").format(foundStudent.since),
            studyLevel: graduation(foundStudent.studyLevel),
            subjects: String(foundStudent.subjects).split(","),
        };
        // Render the page
        return response.render(
            "students/show",
            { student }
        );
    },

    validateAndWriteStudentData(request, response) {
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

// Requires
const fs = require("fs");
const totalData =  require("../../data.json");
const { 
    age, 
    date, 
    findStudent,
    graduation
} = require("../utils");

module.exports = {
    renderStudentLanding(request, response) {
        let newStudentData = [...totalData.students];
        for(let aStudent of newStudentData) {
            aStudent.subjects = String(aStudent.subjects).split(",");
        }
        return response.render(
            "students/index",
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
                since: date(foundStudent.since).iso
            };
            return response.render("students/edit", { student });
        }     
    },

    deleteStudent(request, response) {
        // Get the the student id
        const { id } = request.body;
        // Create a new array excluding the selected student
        const newStudentsSet = totalData.students.filter(
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
        const foundStudent = totalData.students.find(
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
            totalData.students.find(
                function (aStudent, theIndex) {
                    if(Number(aStudent.id) === Number(student.id)) {
                        studentIndex = theIndex;
                        return true;
                    }
                }
            );
            // Save the new data in the array
            totalData.students[studentIndex] = student;
            // Write the file
            fs.writeFile(
                "data.json",
                JSON.stringify(totalData, null, 2),
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
        data.id = (totalData.students.length === 0) ? 1 
            : totalData.students[totalData.students.length - 1].id + 1;
        data.since = Date.now();
        // Write
        totalData.students.push(data);
        fs.writeFile(
            "data.json", 
            JSON.stringify(totalData, null, 2), 
            function (error) {
                if(error)
                    return response.send(error);
                else
                    return response.redirect("/");
            }
        );
    }
}

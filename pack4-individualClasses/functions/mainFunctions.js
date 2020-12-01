// Requires
const fs = require("fs");
const finalData = require("../data.json");
const { age } = require("./utils");

module.exports = {
    renderLanding(request, response) {
        return response.render("landing");
    },

    renderCreate(request, response ) {
        return response.render("teachers/create");
    },

    showTeacher(request, response) {
        // Find the teacher
        const { id } = request.params;
        const findTeacher = finalData.find(
            function(anInstructor) {
                return (Number(id) === anInstructor.id);
            }
        );
        if(!findTeacher)
            return response.status(404).send("Teacher not found....");
        // Adjusts
        const teacher = {
            ...findTeacher,
            age: age(findTeacher.birth),
            subjects: findTeacher.subjects.split(","),
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

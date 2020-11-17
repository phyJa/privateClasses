// Requires
const fs = require("fs");
const finalData = require("./data.json");
// Exports
exports.validateAndWriteData = function(request, response) {
    // Validation
    const dataKeys = Object.keys(request.body);
    const data = request.body;
    for(let aDataKey of dataKeys) {
        if(data[aDataKey] === "")
            return response.status(400).send("Please, fill all the fields");
    }
    data.id = Number(finalData.length) + 1;
    // Write
    finalData.push(data);
    fs.writeFile(
        "./data.json", 
        JSON.stringify(finalData, null, 2), 
        function (error) {
            if(error)
                return response.send(error);
            else
                return response.redirect("/");
        }
    );
}
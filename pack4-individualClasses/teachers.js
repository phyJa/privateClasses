// Requires
const fs = require("fs");
// Exports
exports.validateAndWriteData = function(request, response) {
    // Validation
    const dataKeys = Object.keys(request.body);
    const data = request.body;
    for(let aDataKey of dataKeys) {
        if(data[aDataKey] === "")
            return response.status(400).send("Please, fill all the fields");
    }
    // Write
    // If everything goes fine
    return response.send(dataKeys);
}
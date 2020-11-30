module.exports = {
    renderLanding(request, response) {
        return response.render("landing");
    },

    renderCreate(request, response ) {
        return response.render("teachers/create");
    },

    showTeacher(request, response) {
        return response.render("teachers/show");
    }
}

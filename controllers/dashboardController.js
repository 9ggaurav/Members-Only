const profileController = (req, res) => {
    res.render("layouts/profile", {
        user: req.user, // Pass the user's first name if logged in
    })
}

const homeController = (req, res) => {
    res.render("layouts/home", {
        user: req.user, // Pass the user's first name if logged in
    });
}

const aboutController = (req, res) => {
    res.render("layouts/about", {
        user: req.user, // Pass the user's first name if logged in
    });
}

module.exports = {
    profileController,
    homeController,
    aboutController
};
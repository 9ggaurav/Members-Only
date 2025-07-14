const profileController = (req, res) => {
    res.render("layouts/profile", {
        user: req.user, // Pass the user's first name if logged in
    })
}

module.exports = {
    profileController,
};
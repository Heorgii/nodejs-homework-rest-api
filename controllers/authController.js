const service = require('../service/authService');

const registration = async (req, res) => {
    const user = await service.registration(req.body);
    const { username, email, subscription } = user;
    res.status(201).json({
        user: {
            username, email, subscription,
        }
    });
}

const login = async (req, res) => {
    const { token, userTokens } = await service.login(req.body);
    const { username, email, subscription } = userTokens;

    res.status(200).json({
        token: token,
        user: {
            username, email, subscription,
        }
    })
}

const logout = async (req, res) => {
    await service.logout(req.user._id);
    res.status(204).json();
}


const getUser = async (req, res) => {

}

const updateUser = async (req, res) => {

}

module.exports = {
    registration,
    login,
    logout,
    getUser,
    updateUser,
}
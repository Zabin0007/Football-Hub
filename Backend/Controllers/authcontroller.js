const authServices = require('../Services/authServices')

exports.register = async (req, res) => {
    try {
        const data = await authServices.registerUser(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const data = await authServices.loginUser(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        const data = await authServices.googleLogin(token)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: "Google Login Failed" })
    }
}
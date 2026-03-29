const { OAuth2Client } = require("google-auth-library");
const User = require("../Model/user")
const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

exports.registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    const token = generateToken(user._id);
    return { user, token };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = generateToken(user._id);
    return { user, token };
};

const clientID = new OAuth2Client(process.env.Google_ID)
exports.googleLogin = async (token) => {
    const ticket = await clientID.verifyIdToken({
        idToken: token,
        audience: process.env.Google_ID,
    });
    const payload = ticket.getPayload()
    const { sub, email, name, picture } = payload
    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create({
            name,
            email,
            password: 'Google_Auth',
            googleId: sub
        })
    }

    const jwtToken = generateToken(user._id)
    return { user, token: jwtToken }
}
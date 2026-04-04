const User = require("../Model/user")

exports.saveFcmToken = async (req, res) => {
    const user = await User.findById(req.user._id)
    user.fcmToken = req.body.token
    await user.save()
    res.json({ message: 'FCM Token Saved' })
}
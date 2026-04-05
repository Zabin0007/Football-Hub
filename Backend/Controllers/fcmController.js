const User = require("../Model/user")

exports.saveFcmToken = async (req, res) => {
    const user = await User.findById(req.user._id)
    user.fcmToken = req.body.token
    await user.save()
    res.json({ message: 'FCM Token Saved' })
}

exports.subscribeMatch = async (req, res) => {
    const { matchId } = req.body
    const user = await User.findById(req.user._id)
    if (!user.subscribedMatches.includes(matchId)) {
        user.subscribedMatches.push(matchId)
    }
    await user.save()
    res.json({ messages: "Subscribed" })
}

exports.unsubscribeMatch = async (req, res) => {
    const { matchId } = req.body
    const user = await User.findById(req.user._id)
    user.subscribedMatches = user.subscribedMatches.filter(id => id !== matchId)
    await user.save()
    res.json({ messages: "unsubscribed" })
}
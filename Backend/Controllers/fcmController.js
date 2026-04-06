const User = require("../Model/user")
const admin = require('../config/firebase')

exports.saveFcmToken = async (req, res) => {
    const user = await User.findById(req.user._id)
    user.fcmToken = req.body.token
    await user.save()
    res.json({ message: 'FCM Token Saved' })
}

exports.subscribeMatch = async (req, res) => {
    const { matchId } = req.body;
    const topic = `match_${matchId}`;

    const user = await User.findById(req.user._id);
    if (!user.subscribedMatches.includes(matchId)) {
        user.subscribedMatches.push(matchId)
    }

    if (user.fcmToken) {
        await admin.messaging().subscribeToTopic(user.fcmToken, topic)
    }

    await user.save()
    res.json({ message: "Subscribed Successfully" });
};

exports.unsubscribeMatch = async (req, res) => {
    const { matchId } = req.body;
    const topic = `match_${matchId}`;

    const user = await User.findById(req.user._id);

    user.subscribedMatches = user.subscribedMatches.filter(
        id => id !== matchId
    )

    if (user.fcmToken) {
        await admin.messaging().unsubscribeFromTopic(user.fcmToken, topic)
    }

    await user.save()
    res.json({ message: "Unsubscribed sussussfully" });
};

exports.getSubscriptionStatus = async (req, res) => {
    const { matchId } = req.params
    const user = await User.findById(req.user._id)
    const isSubscribed = user.subscribedMatches.includes(Number(matchId))
    res.json({ isSubscribed })
}
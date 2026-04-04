const { default: admin } = require("../config/firebase")

exports.sendNotification = async (TokenExpiredError, title, body) => {
await admin.messaging().send({
    token,
    notification:{
        title,
        body,
    }
})
}
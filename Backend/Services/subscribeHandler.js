const { subscriber } = require("../config/pubsub");
const { getIO } = require("../config/socket");
const admin = require('../config/firebase')

const sendToTopic = async (matchId, title, body) => {
  const topic = `match_${matchId}`;

  await admin.messaging().send({
    topic,
    notification: {
      title,
      body,
    },
    data:{
        matchId: String(matchId),
        type: "match"
    }
  });
};

const startSubscriber = async () => {
  await subscriber.subscribe("MATCH_EVENTS", async (message) => {
    const liveEvents = JSON.parse(message);
    const io = getIO();

    console.log("Received Matches:", liveEvents.length);

    for (const item of liveEvents) {
      const matchId = item.matchId;

      console.log("Sending update to Room:", matchId);

      io.to(matchId).emit("matchUpdate", item);

      try {
        if (item.type === "goal") {
          await sendToTopic(
            matchId,
            "⚽ Goal!",
            `Goal at ${item.minute}'`
          );
        }
        if (item.type === "status") {
          if (item.status === "HT") {
            await sendToTopic(
              matchId,
              "⏱ Half Time",
              "Match reached Half Time"
            );
          }

          if (item.status === "FT") {
            await sendToTopic(
              matchId,
              "🏁 Full Time",
              "Match Finished"
            );
          }
        }
      } catch (err) {
        console.log("Notification Error:", err.message);
      }
    }
  });
};

module.exports = startSubscriber;
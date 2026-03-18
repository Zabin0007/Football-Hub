const mongoose = require('mongoose')
const matchSchema = new mongoose.Schema({
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  scoreA: {
    type: Number,
    default: 0
  },
  scoreB: {
    type: Number,
    default: 0
  },
  minute: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["live", "upcoming", "finished"],
    default: "upcoming"
  },
  league: {
    type: String,
    required: true
  },
  events: [
    {
      minute: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        enum: ["goal", "yellow", "red", "substitution"],
        required: true
      },
      player: {
        type: String,
        required: true
      },
      team: {
        type: String,
        enum: ["home", "away"],
        required: true
      }
    }
  ],

  stats: {
    possessionA: {
      type: Number,
      default: 50
    },
    possessionB: {
      type: Number,
      default: 50
    },
    shotsA: {
      type: Number,
      default: 0
    },
    shotsB: {
      type: Number,
      default: 0
    }
  },

  lineups: {
    teamA: {
      formation: {
        type: String,
        default: "4-4-2"
      },
      players: [{
        name: String,
        position: String,
        number: Number
      }]
    },
    teamB: {
      formation: {
        type: String,
        default: "4-4-2"
      },
      players: [{
        name: String,
        position: String,
        number: Number
      }]
    }
  }
})
const Match = mongoose.model('Match',matchSchema)
module.exports = Match
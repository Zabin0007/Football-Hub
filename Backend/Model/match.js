const mongoose = require('mongoose')

const matchDetails = new mongoose.Schema({
    fixtureId : { type:Number , unique:true },
    data:{
      fixtureId: Object,
      events: Array,
      stats: Array,
      lineups: Array,
    },
    status: String
  },{timestamps:true}
)

const MATCHDETAIL = mongoose.model('MatchDetails' , matchDetails )
module.exports = MATCHDETAIL

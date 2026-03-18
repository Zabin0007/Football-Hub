const Match = require("../Model/match")

exports.getMatches = async(req, res) => {
    try {
        const matches = await Match.find({})
        res.json(matches)
    } catch (error) {
        res.status(500).json(error)
    }

}
exports.getMatchById = async(req,res)=>{
    try {
        const {id} = req.params
        const match = await Match.findById(id)
        if(!match){
          return  res.status(404).json("Match Not found")
        }
        res.json(match)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.createMatch = async(req,res)=>{
    try {
        const match = new Match(req.body)
        const savedMatch = await match.save()
        res.status(201).json(savedMatch)
    } catch (error) {
        res.status(500).json(error)
    }
}

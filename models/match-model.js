const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    captain: {
      type: String,
      required: [true, 'Please write the captain name']
    },
    date: {
      type: Date,
      required: [true, 'Please tell the date']
    },
    length: {
      type: Number,
      required: [true, 'Please tell the length']
    },
    time: {
      type: Number,
      required: [true, 'Please tell the length']
    },
    field:{
      type: String,
      required: [true, 'Please tell the field number']
    },
    owner:{
        type: Schema.Types.ObjectId
    },
    players: [
      { type: String }
    ]
  },
  {
    timestamps: true
  }
);


const Match = mongoose.model("Match", matchSchema);


module.exports = Match;

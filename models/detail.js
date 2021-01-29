var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');

var detailSchema = mongoose.Schema({
	text: String,
	driver: String,
	place: String,
	loadout: String,
	output3 : String,
	empty: String,
	output6 : String,
	output9 : String,
	output12 : String,
	output15 : String,
	output18 : String,
	output21 : String,
	output24 : String,
	output27 : String,
	output30 : String,
	output33 : String,
	output36 : String,
	output39 : String,
	output42 : String,
	output45 : String,
	output48 : String,
	output51 : String,
	output54 : String,
	finalOutput : String,
	created:  {type: Date, default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

detailSchema.plugin(timestamps, {index: true});

module.exports = mongoose.model("Detail", detailSchema);
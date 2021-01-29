var mongoose = require("mongoose");

// SCHEMA SETUP
var vehicleSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	details: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Detail"
		}
	]
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
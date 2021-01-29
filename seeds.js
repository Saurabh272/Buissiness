var mongoose = require("mongoose");
var Vehicle  = require("./models/vehicle");
var Detail   = require("./models/detail");

var data = [
	{
	name: "UP-32 GM-7660", 
 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKdY7s6b1yiR9iLhRradIwXbKAG1wygRebwLi3F-ttxlI7AXAK&usqp=CAU",
    description: "Tata Magic" 
	},
	{
	name: "UP-32 GM-7000", 
 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKdY7s6b1yiR9iLhRradIwXbKAG1wygRebwLi3F-ttxlI7AXAK&usqp=CAU",
    description: "Tata Magic" 
	},
	{
	name: "UP-32 GM-8000", 
 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKdY7s6b1yiR9iLhRradIwXbKAG1wygRebwLi3F-ttxlI7AXAK&usqp=CAU",
    description: "Tata Magic" 
	}
]

function seedDB(){
	// Remove all vehicles
	Vehicle.deleteMany({}, function(err){
	if(err){
	   console.log(err);
	  } else {
		 console.log("removed vehicles!");
		// Add a few vehicles
	       data.forEach(function(seed){
		   Vehicle.create(seed, function(err, vehicle){
			    if(err){
				 console.log(err);
			   } else {
				 console.log("added a vehicle");
				   // Add a detail
				   Detail.create(
					   {
						   text: "This vehicle is good, but I wish it have some more space.",
						   author: "Akash"
					   }, function(err, detail){
						   if(err) {
							   console.log(err);
						   } else {
							   vehicle.details.push(detail);
						       vehicle.save();
							   console.log("created new detail")
						   }
					   });
			  }
		  });
	   });
	 }
  });
	
	// Add a few details
}

module.exports = seedDB;
var express = require("express");
var router  = express.Router({mergeParams: true});
var Vehicle = require("../models/vehicle");
var Detail  = require("../models/detail");
var middleware = require("../middleware");


// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	// Find vehicle by ID
	Vehicle.findById(req.params.id, function(err, vehicle){
		if(err){
			console.log(err);
		} else {
			res.render("details/new", {vehicle: vehicle});
		}
	});
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup vehicle using ID
	Vehicle.findById(req.params.id, function(err, vehicle){
		if(err){
			console.log(err);
			res.redirect("/vehicles");
		} else {
			Detail.create(req.body.detail, function(err, detail){
				if(err) {
					console.log(err);
				} else {
					// add username and id to detail
					detail.author.id = req.user._id;
					detail.author.username = req.user.username;
					console.log(detail)
					// save detail
					detail.save();
					vehicle.details.push(detail);
					vehicle.save();
					res.redirect("/vehicles/" + vehicle._id);
				}
			});
		}
	});
});

// Edit detail route
router.get("/:detail_id/edit", middleware.checkDetailOwnership, function(req, res){
	Detail.findById(req.params.detail_id, function(err, foundDetail){
		if(err) {
			res.redirect("back");
		} else {
			res.render("details/edit", {vehicle_id: req.params.id, detail: foundDetail});
			//console.log(foundDetail);
		}
	});
});

// Update detail route
router.put("/:detail_id", middleware.checkDetailOwnership, function(req, res){
   Detail.findByIdAndUpdate(req.params.detail_id, req.body.detail, function(err, updatedDetail){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/vehicles/" + req.params.id );
      }
   });
});

// Destroy detail route
router.delete("/:detail_id", middleware.checkDetailOwnership, function(req, res){
	// find by id and remove
	Detail.findByIdAndRemove(req.params.detail_id, function(err){
		if(err) {
			res.redirect("back");
		} else{
			res.redirect("/vehicles/" + req.params.id);
		}
	})
});






module.exports = router;
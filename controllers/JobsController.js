require("dotenv").config({ path: __dirname + "/../.env" });
const Job = require("../models/job");
const Location = require("../models/location");

module.exports.getJobs = async function(req, res) {
  try {
    let locations = await Location.find({}).exec();
    let jobs;
    if (req.query.location) {
      location = await Location.findOne({
        name: req.query.location
      }).exec();
      jobs = await Job.find({ locations: location._id })
        .populate("locations")
        .sort("order")
        .exec();
    } else {
      jobs = await Job.find({})
        .populate("locations")
        .sort("order")
        .exec();
    }
    res.render("jobsPublic", {
      jobs,
      query: req.query,
      locations
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSingleJob = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug }).populate(
      "locations"
    );
    res.render(`singleJob`, {
      job
    });
  } catch (err) {
    console.log(err);
  }
};

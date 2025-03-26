import Hospital from "../../../models/hospital.js";
import Review from "../../../models/reviews.js";
import Doctor from "../../../models/doctors.js";

//get all hospital
export const getAllHospitals = async (req, res) => {
    try {
      console.log("Fetching hospitals...");
      const hospitals = await Hospital.find({});
      res.json(hospitals);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
};

//get a hospital by ID
export const getHospitalById = async (req, res) => {
    try {
      const { id } = req.params;
      const hospital = await Hospital.findById(id)
        .populate("doctors")
        .populate({ path: "reviews", populate: { path: "user", select: "name email" } });
  
      if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hospital", error });
    }
};

//add a review to a hopsital
export const addReviewToHospital = async (req, res) => {
    console.log("reviwelog");
    try {
      if (!req.user) return res.status(401).json({ message: "You must be logged in to leave a review" });
  
      const { id } = req.params;
      const { rating, comment } = req.body;
  
      // Creating a new review
      const newReview = new Review({
        user: req.user.id,
        hospital: id,
        rating,
        comment,
      });
  
      await newReview.save();
      await Hospital.findByIdAndUpdate(id, { $push: { reviews: newReview._id } });
  
      res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
      console.error("Error saving review", error);
      res.status(500).json({ message: "Error adding review", error });
    }
};
import Hospital from "../models/hospital.js";
import Review from "../models/reviews.js";
import mongoose from "mongoose";
import Doctor from "../models/doctors.js";
import User from "../models/user.js";
// Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    console.log("Fetching hospitals...");
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const { hospitalCode, name, address, description, contactNumber, capacity, specialties, imageUrl } = req.body;

    const newHospital = new Hospital({
      hospitalCode,
      name,
      address,
      description,
      contactNumber,
      capacity,
      specialties,
      ratings: [],
      imageUrl,
    });

    await newHospital.save();
    res.status(201).json({ message: "Hospital added successfully", hospital: newHospital });
  } catch (error) {
    res.status(500).json({ message: "Error adding hospital", error });
  }
};

// Get a hospital by ID
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

// Update a hospital by ID
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalCode, name, address, description, contactNumber, capacity, specialties, imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Hospital ID" });
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { hospitalCode, name, address, description, contactNumber, capacity, specialties, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedHospital) return res.status(404).json({ message: "Hospital not found" });

    res.status(200).json({ message: "Hospital updated successfully", hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital", error });
  }
};

// Delete a hospital by ID
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) return res.status(404).json({ message: "Hospital not found" });

    res.status(200).json({ message: "Hospital deleted successfully", hospital: deletedHospital });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital", error });
  }
};

// Add a review to a hospital
export const addReviewToHospital = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "You must be logged in to leave a review" });

    const { id } = req.params;
    const { rating, comment } = req.body;

    // Creating a new review
    const newReview = new Review({
      user: req.user._id,
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

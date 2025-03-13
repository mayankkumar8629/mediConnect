require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cors = require("cors");
const Doctor = require("./models/doctors"); 
const Review=require("./models/reviews");


const User = require("./models/user");
const Hospital = require("./models/hospital");

// Initialize Express app
const app = express();

console.log("req came");
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hospital-front-qsze.onrender.com"],
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
    allowedHeaders: ["Content-Type", "Authorization","Cookie"], // Allow necessary headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sessionOptions = {
  secret: "mysecretcode", // Change this to a secure key
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Apply session middleware
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport authentication setup using "email" as the username field
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Function to hash passwords
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
// Get all hospitals
app.get("/hospitals", async (req, res) => {
  try {
    console.log("Get msssg received");
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new hospital
app.post("/newhospital", async (req, res) => {
  try {
    console.log(req.body);
    const { hospitalCode,name, address,description, contactNumber, capacity, specialties, imageUrl } = req.body;

    const newHospital = new Hospital({
      hospitalCode,
      name,
      address,
      description,
      contactNumber,
      capacity,
      specialties,
      ratings: [],
      imageUrl
    });

    await newHospital.save();
    res.status(201).json({ message: "Hospital added successfully", hospital: newHospital });
  } catch (error) {
    res.status(500).json({ message: "Error adding hospital", error });
  }
});

// Get a hospital by ID
app.get("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id)
    .populate("doctors")
    .populate({
      path:"reviews",
      populate:{path:"user",select:"name email"}
    });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospital", error });
  }
});

// Update a hospital by ID
app.put("/hospitals/:id", async (req, res) => {
  
  try {
   
    const { id } = req.params;
    const {hospitalCode, name, address,description, contactNumber, capacity, specialties, imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Hospital ID" });
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      {hospitalCode, name, address,description, contactNumber, capacity, specialties, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital updated successfully", hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital", error });
  }
});

// Delete a hospital by ID
app.delete("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully", hospital: deletedHospital });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital", error });
  }
});

// User Authentication Routes
// Signup
app.post("/signup", async (req, res, next) => {
  try {
    let { name, email, city, mobileNumber, password } = req.body;
    const newUser = new User({ name, email, city, mobileNumber });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: "User registered successfully", user: registeredUser });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
});

// Login using redirect strategy
app.post("/login", (req, res, next) => {
    console.log("Request Body:", req.body); // Debug: log the request body
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Return an error JSON if authentication fails
        return res.status(400).json({ message: info.message || "Login failed" });
      }
      // Log in the user and establish a session
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: "Login successful",
          user: { id: user._id, email: user.email, name: user.name },
        });
      });
    })(req, res, next);
  });

//logout
app.post('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { 
        return next(err);
      }
      res.json({ message: "Logout successful" });
    });
});
//review section 
app.post("/hospitals/:id/reviews",async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({message:"You must be logged in to leave a review"});
    }
    const {id}=req.params;
    const {rating,comment}=req.body;

    //creating a new review
    const newReview=new Review({
      user:req.user._id,
      hospital:id,
      rating,
      comment,
    });

    await newReview.save();
    await Hospital.findByIdAndUpdate(id,{$push:{reviews:newReview._id}});
    res.status(201).json({ message: "Review added successfully!", review: newReview });
  }catch(error){
    console.error("Error saving review",error);
    res.status(500).json({message:"Error adding review",error});
  }
});  





// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import { configDotenv } from "dotenv";
// import express from "express";
// import session from "express-session";
// import flash from "connect-flash";
// import passport from "passport";
// import LocalStrategy from "passport-local";
// import mongoose from "mongoose";
// import cors from "cors";

// // Import Models
// import Doctor from "./models/doctors.js";
// import Review from "./models/reviews.js";
// import User from "./models/user.js";
// import Hospital from "./models/hospital.js";
// import Pharmacy from "./models/pharmacy.js";
// import Medicine from "./models/medicine.js";

// //import routes

// import userRoute from "./routes/user.route.js";
// import hospitalRoute from "./routes/hospital.route.js";
// import pharmacyRoute from "./routes/pharmacy.route.js";
// import blogRoute from "./routes/blog.route.js";

// // Initialize Express app
// const app = express();

// console.log("Request received");

// // CORS Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://hospital-front-qsze.onrender.com"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//   })
// );
// configDotenv();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session Configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "mysecretcode",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       httpOnly: true,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// // Passport authentication setup using "email" as the username field
// passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Flash Messages Middleware
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   next();
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // --- ROUTES ---
// app.use("/user",userRoute);
// app.use("/hospital",hospitalRoute);
// app.use("/pharmacy",pharmacyRoute);
// app.use("/blog",blogRoute);


// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));

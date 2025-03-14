import passport from "passport";
import User from "../models/user.js"; // Adjust the path as needed

// Signup Controller
export const signup = async (req, res, next) => {
  try {
    const { name, email, city, mobileNumber, password } = req.body;
    const newUser = new User({ name, email, city, mobileNumber });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: "User registered successfully", user: registeredUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login Controller
export const login = (req, res, next) => {
  console.log("Request Body:", req.body);

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info.message || "Login failed" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Login successful",
        user: { id: user._id, email: user.email, name: user.name },
      });
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
      if (err) {
          return next(err); // Pass error to Express error handler
      }
      res.status(200).json({ message: "Logout successful" });
  });
};

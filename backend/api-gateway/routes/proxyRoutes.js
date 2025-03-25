// routes/proxyRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * Proxy route for User Service.
 * Forwards any request starting with "/user" to the User Service.
 */
router.use("/user", async (req, res) => {
  try {
    const url = `${process.env.USER_SERVICE_URL}${req.originalUrl.replace("/user", "")}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("User proxy error:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

/**
 * Proxy route for Hospital Service.
 * Forwards any request starting with "/hospital" to the Hospital Service.
 */
router.use("/hospital", async (req, res) => {
  try {
    const url = `${process.env.HOSPITAL_SERVICE_URL}${req.originalUrl.replace("/hospital", "")}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Hospital proxy error:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

/**
 * Proxy route for Admin Service.
 * Forwards any request starting with "/admin" to the Admin Service.
 */
router.use("/admin", async (req, res) => {
  try {
    const url = `${process.env.ADMIN_SERVICE_URL}${req.originalUrl.replace("/admin", "")}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Admin proxy error:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

export default router;

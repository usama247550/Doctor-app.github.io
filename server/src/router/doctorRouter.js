const express = require("express");
const router = express.Router();
const { isLogin } = require("../middleware/authMiddleware");
const {
  getDoctorInfo,
  updateDoctorInfo,
  getAllDoctor,
  getSingleDoctor,
  bookAppointment,
  getDoctorAppointments,
  approveAppointment,
  getUserAppointments
} = require("../controllers/doctorController");

router.post("/getDoctorInfo", isLogin, getDoctorInfo);
router.post("/updateDoctorInfo", isLogin, updateDoctorInfo);
router.get("/getAllDoctor", isLogin, getAllDoctor);
router.post("/getSingleDoctor", isLogin, getSingleDoctor);
router.post("/bookAppointment", isLogin, bookAppointment);
router.post("/getDoctorAppointments", isLogin, getDoctorAppointments);
router.put("/approveAppointment", isLogin, approveAppointment);
router.post("/getUserAppointments", isLogin, getUserAppointments);

module.exports = router;

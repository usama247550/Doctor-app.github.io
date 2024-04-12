const express = require("express");
const router = express.Router();
const {
  register,
  login,
  resetPassword,
  getUserData,
  ApplyDoctor,
  getUserNotification,
  deleteNotification,
  getDoctors,
  getUsers,
  changeStatus,
  getUser,
  updateUserProfile,
} = require("../controllers/userController");
const { isLogin } = require("../../src/middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/resetPassword", resetPassword);
router.get("/getUserData", isLogin, getUserData);
router.post("/ApplyDoctor", isLogin, ApplyDoctor);
router.post("/getUserNotification",isLogin, getUserNotification);
router.post("/deleteNotification",isLogin, deleteNotification);
router.get("/getUsers", isLogin, getUsers);
router.get("/getDoctors", isLogin, getDoctors);
router.put("/changeStatus", isLogin, changeStatus);
router.post("/getUser", isLogin, getUser);
router.post("/updateUserProfile", isLogin, updateUserProfile);

module.exports = router;

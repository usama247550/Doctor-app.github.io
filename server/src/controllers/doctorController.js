const DoctorModel = require("../Model/DoctorModel");
const AppointmentModel = require("../Model/appointmentModel");
const userData = require("../Model/userModel");
const doctorModel = require("../Model/DoctorModel");

const getDoctorInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({
        success: false,
        msg: "userId is required in the request body",
      });
    }
    const doctorInfo = await DoctorModel.findOne({ userId: userId });
    if (doctorInfo) {
      res.status(200).send({
        success: true,
        msg: "doctor info get successfully",
        doctorInfo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const updateDoctorInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({
        success: false,
        msg: "userId is required in the request body",
      });
    }
    const doctorInfo = await DoctorModel.findOneAndUpdate(
      { userId: userId },
      req.body
    );
    if (doctorInfo) {
      res.status(200).send({
        success: true,
        msg: "doctor info get successfully",
        doctorInfo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const doctorInfo = await DoctorModel.find({ status: "Approved" });
    if (doctorInfo) {
      res.status(200).send({
        success: true,
        msg: "all doctor get successfully",
        doctorInfo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const getSingleDoctor = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({
        success: false,
        msg: "userId is required in the request body",
      });
    }
    const doctorInfo = await DoctorModel.findOne({ _id: userId });

    if (doctorInfo) {
      res.status(200).send({
        success: true,
        msg: "doctor info get successfully",
        doctorInfo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const Appoinment = new AppointmentModel(req.body);
    await Appoinment.save();
    const doc = await doctorModel.findOne({ _id: Appoinment.doctorId });
    const user = await userData.findOne({ _id: doc.userId });
    user?.notification.push({
      msg: `a new appointment request from user`,
    });
    await user.save();
    res.status(200).send({
      success: true,
      msg: "appointment book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const doctorAppointment = await doctorModel.find({
      userId: userId,
    });
    const appointmentIds = doctorAppointment.map(
      (appointment) => appointment._id
    );
    const getAppointment = await AppointmentModel.find({
      doctorId: appointmentIds,
    });
    res.status(200).send({
      success: true,
      msg: "appointment get successfully",
      getAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const approveAppointment = async (req, res) => {
  try {
    const { id, approvestatus } = req.body;
    const getUser = await AppointmentModel.findOneAndUpdate(
      { userId: id, status: { $ne: approvestatus } },
      { status: approvestatus },
      { new: true }
    );
    const user = await userData.findById({ _id: getUser.userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    const notificationMsg = `Your appointment ${
      approvestatus == "Approved" ? "booked" : "rejected"
    } for Date ${getUser.date}, Time ${getUser.time}`;

    user.notification.push({ msg: notificationMsg });

    await user.save();
    res.status(200).send({
      success: true,
      msg: "appointment approved",
      getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.body;

    const getAppointment = await AppointmentModel.find({ userId: id });
    res.status(200).send({
      success: true,
      msg: "appointment get successfully",
      getAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

module.exports = {
  getDoctorInfo,
  updateDoctorInfo,
  getAllDoctor,
  getSingleDoctor,
  bookAppointment,
  getDoctorAppointments,
  approveAppointment,
  getUserAppointments,
};

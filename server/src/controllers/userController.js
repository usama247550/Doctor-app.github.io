const { hashPassword, comparePassword } = require("../Helper/userHelpers");
const doctorModel = require("../Model/DoctorModel");
const userData = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, securityAns, password } = req.body;

    if (!name || !email || !securityAns || !password) {
      return res.status(404).send({
        msg: "plz fill all the fields",
      });
    }

    const emailExist = await userData.findOne({ email: email });

    if (emailExist) {
      return res.status(404).send({
        msg: "user already register plz login",
      });
    }

    const Passwordhashed = await hashPassword(password);
    const userinfo = new userData({
      name,
      email,
      securityAns,
      password: Passwordhashed,
    });
    const uservalve = await userinfo.save();

    res.status(201).send({
      success: true,
      msg: "registeration successfully",
      uservalve,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      msg: "error in server",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        msg: "plz fill all the fields",
      });
    }

    const user = await userData.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        msg: "user not exist plz register first",
      });
    }

    const PasswordMatch = await comparePassword(password, user.password);
    if (!PasswordMatch) {
      return res.status(404).send({
        msg: " password not match",
      });
    }

    const userToken = await jwt.sign({ id: user._id }, process.env.SECRET_ID, {
      expiresIn: "5d",
    });

    res.status(201).send({
      success: true,
      msg: "login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token: userToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      msg: "error in server",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, securityAns, newPassword } = req.body;

    if (!email || !securityAns || !newPassword) {
      return res.status(404).send({
        msg: "plz fill all the fields",
      });
    }

    const userExist = await user.findOne({ email, securityAns });

    if (!userExist) {
      return res.status(404).send({
        msg: "invalid email or security answer",
      });
    }

    const Passwordhashed = await hashPassword(newPassword);

    await user.findOneAndUpdate(
      userExist._id,
      { password: Passwordhashed },
      { new: true }
    );

    res.status(200).send({
      success: true,
      msg: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      msg: "error in server",
      error,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const userinfo = await userData.findOne({ _id: req.body.user_id });
    if (!userinfo) {
      res.status(404).send({
        success: false,
        msg: "user not found",
      });
    }

    res.status(200).send({
      success: true,
      msg: "get user successfully",
      userinfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in surver",
    });
  }
};

const ApplyDoctor = async (req, res) => {
  try {
    const doctorinfo = new doctorModel({ ...req.body });
    const doctor = await doctorinfo.save();
    const isAdmin = await userData.findOne({ isAdmin: true });
    const notification = isAdmin.notification;
    notification.push({
      type: "apply for doctor account",
      msg: `${doctor.firstName} ${doctor.lastName} applied for doctor account`,
      data: {
        doc_id: doctor._id,
        name: `${doctor.firstName} ${doctor.lastName}`,
        onClickPath: "/admin/doctor",
      },
    });

    await userData.findByIdAndUpdate(isAdmin._id, { notification });

    res.status(201).send({
      success: true,
      msg: "doctor account applied successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error while applying for doctor",
      error,
    });
  }
};

const getUserNotification = async (req, res) => {
  try {
    const user = await userData.findOne({ _id: req.body.id });
    const notification = user.notification;
    const seenNotification = user.seenNotification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      msg: "all notification mark as read",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in notification",
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const user = await userData.findOne({ _id: req.body.id });
    user.notification = [];
    user.seenNotification = [];
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      msg: "all notification delete",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in delete notification",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userData.find({});
    if (!users) {
      res.status(404).send({
        success: false,
        msg: "users not found",
      });
    }

    res.status(200).send({
      success: true,
      msg: "get users successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in surver",
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    if (!doctors) {
      res.status(404).send({
        success: false,
        msg: "doctors not found",
      });
    }

    res.status(200).send({
      success: true,
      msg: "get doctors successfully",
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in surver",
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id, updateStatus } = req.body;
    const getDoctor = await doctorModel.findByIdAndUpdate(
      id,
      { status: updateStatus },
      { new: true }
    );
    const user = await userData.findOne({ _id: getDoctor.userId });
    const notification = user.notification;
    notification.push({
      type: "apply for doctor account",
      msg: `${getDoctor.firstName} ${getDoctor.lastName} you doctor account request has ${updateStatus}`,
      onClickPath: "/notification",
    });
    user.isDoctor = updateStatus === "Approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      msg: "Status updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "msg in server",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userdata = await userData.findOne({ _id: id });
    if (userdata) {
      res.status(200).send({
        success: true,
        msg: "user info get successfully",
        userdata,
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

const updateUserProfile = async (req, res) => {
  try {
    const {id} = req.body
    const userinfo = await userData.findOneAndUpdate(
      { _id:id },
      req.body
    );

    if (userinfo) {
      res.status(200).send({
        success: true,
        msg: "user info get successfully",
        userinfo,
      });
    }
    await userinfo.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in server",
    });
  }
};

module.exports = {
  register,
  login,
  resetPassword,
  getUserData,
  ApplyDoctor,
  getUserNotification,
  deleteNotification,
  getUsers,
  getDoctors,
  changeStatus,
  getUser,
  updateUserProfile,
};

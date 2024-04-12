const mongoos = require("mongoose");

const AppointmentSchema = mongoos.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  { timestapms: true }
);

const AppointmentModel = mongoos.model("AppointmentModel", AppointmentSchema)

module.exports = AppointmentModel

const jwt = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET_ID, (error, decode) => {
      if (error) {
        res.status(200).send({
          success: false,
          msg: "unAuthoried user",
        });
      } else {
        req.body.user_id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "unAuthoried user",
    });
  }
};

module.exports = { isLogin };

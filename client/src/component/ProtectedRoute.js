import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "./redux/getUser";
import { showLoading, hideLoading } from "./redux/features";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const fetchUser = async () => {
    dispatch(showLoading());
    try {
      const res = await axios.get(
        "http://localhost:5000/api/userRouter/getUserData",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(getUser(res.data.userinfo));
      } else navigate("/login"), localStorage.clear();
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);


  

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;

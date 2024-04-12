import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userBio, setUserBio] = useState({
    name: "",
    email: "",
    securityAns: "",
    password: "",
  });
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserBio({
      ...user,
      [name]: value,
    });
  };

  const getUser = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/userRouter/getUser",
        { id: user?._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setUserBio(res.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/userRouter/updateUserProfile",
        { id: user?._id, ...userBio },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setUserBio(res.data.userdata);
        toast.success("profile update successfully");
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error("something want wrong")
    }
  };

  useEffect(() => {
    if (!userBio?.id) {
      getUser();
    }
  }, []);

  return (
    <>
      <div className="register">
        <div className="container ">
          <div className="text-center mt-5">
            <h1 style={{color:"#2a598d"}} >Menage Profile</h1>
            <hr className="w-25 m-auto mt-2" />
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <form
                method="POST"
                className="m-auto card my-4 p-4 w-100 shadow rounded"
                onSubmit={updateProfile}
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="emailHelp"
                    name="name"
                    value={userBio?.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={userBio?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputsecurity" className="form-label">
                    security_Answer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputsecurity"
                    aria-describedby="emailHelp"
                    name="securityAns"
                    value={userBio?.securityAns}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={userBio?.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success mt-1  fs-5 fw-bold me-auto"
                >
                  Reset Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

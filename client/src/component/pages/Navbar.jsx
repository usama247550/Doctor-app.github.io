import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/getUser";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  let status = user?.isAdmin;
  let isDoctor = user?.isDoctor;
  let notification = user?.notification;
  let userName = user?.name;

  const logoutuser = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border border-bottom   shadow-sm ">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-3 ps-4 fw-bold" to="/" style={{color:"#2a598d"}}>
            Doctor-App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  gap-2 fs-5 pe-4 text-capitalise">
              {status == true ? (
                <>
                  {/* admin */}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="admin/Doctor"
                    >
                      Doctor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="admin/User"
                    >
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/user/UserProfile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      onClick={logoutuser}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : isDoctor ? (
                <>
                  {/* doctor */}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/doctor/Appointment"
                    >
                      Appointments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={`/doctor/Profile/${user?._id}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      onClick={logoutuser}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* user */}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/user/UserAppointment"
                    >
                      Appointments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/ApplyDoctor"
                    >
                      Apply-Doctor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/user/UserProfile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      onClick={logoutuser}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}

              {userName && (
                <li className="nav-item ">
                  <div className="mt-2 ">
                    <i
                      className={
                        notification?.length > 0 ?
                          "fa-solid fa-bell fs-4 animate__animated animate__tada animate__infinite"
                          : "fa-solid fa-bell fs-4 animate__animated animate__tada  "
                      }
                      onClick={() => navigate("/Unread")}
                    />
                    {notification?.length > 0 ? notification?.length: ""}
                    <Link className="nameLink " to="">
                      <span className="userName ">{userName}</span>
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

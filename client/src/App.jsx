import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import Register from "./component/pages/Register";
import Login from "./component/pages/Login";
import ForgotPassword from "./component/pages/ForgotPassword";
import Navbar from "./component/pages/Navbar";
import { useSelector } from "react-redux";
import "./index.css";
import Spiner from "./component/pages/Spiner";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import ApplyDoctor from "./component/pages/ApplyDoctor";
import Unread from "./component/pages/Unread";
import Read from "./component/pages/Read";
import Doctor from "./component/pages/admin/Doctor";
import User from "./component/pages/admin/User";
import Profile from "./component/pages/doctor/Profile";
import Appoinments from "./component/pages/Appoinments";
import Appointment from "./component/pages/doctor/Appointment";
import UserAppointment from "./component/pages/user/UserAppointment";
import UserProfile from "./component/pages/user/UserProfile";
import Footer from "./component/pages/Footer";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spiner />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/ApplyDoctor"
                element={
                  <ProtectedRoute>
                    <ApplyDoctor />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Unread"
                element={
                  <ProtectedRoute>
                    <Unread />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Read"
                element={
                  <ProtectedRoute>
                    <Read />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/Doctor"
                element={
                  <ProtectedRoute>
                    <Doctor />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/User"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/doctor/Profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Appoinments/:id"
                element={
                  <ProtectedRoute>
                    <Appoinments />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/doctor/Appointment"
                element={
                  <ProtectedRoute>
                    <Appointment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user/UserAppointment"
                element={
                  <ProtectedRoute>
                    <UserAppointment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user/UserProfile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/Login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/ForgotPassword"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
            </Routes>            
          </>
        )}

        {/* <Footer/> */}

      </BrowserRouter>
    </>
  );
}

export default App;

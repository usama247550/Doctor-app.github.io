import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const doctorSpecialization = [
    { label: "dental", value: "dental" },
    { label: "Surgeon", value: "Surgeon" },
    { label: "Dermatologist", value: "Dermatologist" },
    { label: "Neurologist", value: "Neurologist" },
    { label: "Cardiology physician", value: "Cardiology physician" },
  ];

  const getAllDoctor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctorRouter/getAllDoctor",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.doctorInfo);
        setfilterData(res.data.doctorInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let filterdData = [...doctor];
    if (search) {
      filterdData = filterdData.filter(
        (curr) =>
          curr.firstName &&
          curr.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filterdData = filterdData.filter(
        (curr) => curr.specialization === category
      );
    }

    setfilterData(filterdData);
  }, [search, category, doctor]);

  useEffect(() => {
    getAllDoctor();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategory(value);
    } else {
      setCategory(""); // Clear the category if the checkbox is unchecked
    }
  };

  const renderCheckboxes = () => {
    return doctorSpecialization.map((curr, index) => (
      <div className="form-check" key={index}>
        <input
          className="form-check-input"
          type="checkbox"
          value={curr.value}
          onClick={handleCheckboxChange}
          defaultChecked={category === curr.value}
          id={`flexCheckDefault${index + 1}`}
        />
        <label
          className="form-check-label"
          htmlFor={`flexCheckDefault${index + 1}`}
        >
          {curr.label}
        </label>
      </div>
    ));
  };

  return (
    <>
      <div className="home">
        <div className="container-fluid ">
          <div className="homeimage">
            <img
              src={"/images/doc.jpg"}
              className="img-fluid w-100 "
              style={{ height: "35em" }}
              alt="image"
            />
          </div>

          <div className="text-center mt-5">
            <h1 className=" fw-bold" style={{ color: "#2a598d" }}>
              Find and book the <span className="">best doctors </span>near you
            </h1>
            <hr className="w-75 m-auto mt-2" />
          </div>

          <div className="row ">
            <div className=" col-lg-3 col-md-3 col-sm-3 my-5">
              <h4 className="ms-4">search</h4>
              <form className="d-flex ms-4">
                <input
                  className="form-control "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>

              <div className="ms-4 mt-5">
                <h4>Filter by specialization</h4>
                {renderCheckboxes()}
              </div>
            </div>

            <div className=" col-lg-9 col-md-9 col-sm-9  d-flex flex-wrap justify-content-evenly g-1 my-5 ">
              {filterData &&
                filterData.map((curr, ind) => {
                  return (
                    <div
                      className="card"
                      key={ind}
                      onClick={() => navigate(`/Appoinments/${curr._id}`)}
                    >
                      <div className="card-header">
                        <h2 className="card-title">Dr.{curr.firstName}</h2>
                        <p className="card-subtitle">{curr.specialization}</p>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          Experience: {curr.experience}
                        </p>
                        <p className="card-text">
                          Fees Per Consultation:{curr.feesPerConsaltation}
                        </p>
                        <p className="card-text">
                          Office Timing: Mon-Fri, 9 AM - 5 PM
                        </p>
                        <button className="btn btnCard">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

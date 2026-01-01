import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDoctorList } from "../api/userApi";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DOCTORS
  =======================*/
  const fetchDoctors = async () => {
    try {
      const res = await getDoctorList();

      if (res.data.success) {
        setDoctors(res.data.doctors);
      } else {
        toast.error("Failed to load doctors");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Error fetching doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ======================
     UI STATES
  =======================*/
  if (loading) {
    return <h5>Loading doctors...</h5>;
  }

  if (doctors.length === 0) {
    return <h5>No doctors found</h5>;
  }

  /* ======================
     TABLE UI
  =======================*/
  return (
    <div className="container">
      <h4 className="mb-4">Doctors List</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Doctor ID</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;

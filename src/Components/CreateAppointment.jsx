import React, { useState, useEffect } from "react";
import { createAppointment, getDoctorList } from "../api/userApi";
import { toast } from "react-toastify";

const CreateAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [doctorID, setDoctorId] = useState("");
  const [loading, setLoading] = useState(true);


  /* ======================
     FETCH DOCTORS
  =======================*/
  const fetchData = async () => {
    try {
      const res = await getDoctorList();

      if (res.data.success) {
        setDoctors(res.data.doctors);
      } else {
        toast.error("Failed to load doctors");
      }
    } catch (error) {
      toast.error("Error fetching doctors list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ======================
     SUBMIT
  =======================*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateTimeInput || !doctorID) {
      toast.error("Please select date & doctor");
      return;
    }

    try {
      const res = await createAppointment({
  dateTime: dateTimeInput,
  doctorId: doctorID,
});


      if (res.data.success) {
        toast.success(res.data.msg || "Appointment created");
        setDateTimeInput("");
        setDoctorId("");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Appointment creation failed"
      );
    }
  };

  /* ======================
     UI
  =======================*/
  if (loading) {
    return <h5>Loading doctors...</h5>;
  }

  return (
    <div className="card p-4">
      <h4>Create Appointment</h4>

      <form onSubmit={handleSubmit}>
        {/* Date & Time */}
        <div className="mb-3">
          <label className="form-label">Select Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            required
          />
        </div>

        {/* Doctor List */}
        <div className="mb-3">
          <label className="form-label">Select Doctor</label>
          <select
            className="form-select"
            value={doctorID}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))
            ) : (
              <option disabled>No doctors available</option>
            )}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;

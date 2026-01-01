import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAppointmentsByUser } from "../api/userApi";
import { Button } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH APPOINTMENTS
  =======================*/
  const fetchAppointments = async () => {
    try {
      const res = await getAppointmentsByUser();
      if (res.data.success) {
        setAppointments(res.data.appointments);
      } else {
        toast.info(res.data.msg || "No appointments found");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit appointment:", id);
    // open modal OR navigate to edit page
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      console.log("Delete appointment:", id);
      // call delete API here
    }
  };

  /* ======================
     UI STATES
  =======================*/
  if (loading) {
    return <h5>Loading appointments...</h5>;
  }

  if (appointments.length === 0) {
    return <h5>No appointments yet</h5>;
  }

  /* ======================
     TABLE UI
  =======================*/
  return (
    <div className="container">
      <h4 className="mb-4">My Appointments</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.id}>
                <td>{index + 1}</td>

                <td>{appt.doctor?.name || "N/A"}</td>

                <td>{new Date(appt.dateTime).toLocaleString()}</td>

                <td>
                  <span
                    className={`badge ${
                      appt.status === "Approved"
                        ? "bg-success"
                        : appt.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {appt.status || "Pending"}
                  </span>
                </td>

                <td className="d-flex gap-2">
                  <Button variant="outline-warning" title="Edit">
                    <FiEdit />
                  </Button>

                  <Button variant="outline-danger" title="Delete">
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;

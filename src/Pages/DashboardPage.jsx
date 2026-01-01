import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaUserMd,
  FaCalendarAlt,
  FaRegUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../api/userApi";

// Pages / Components
import Profile from "../Components/Profile";
import Appointments from "../Components/Appointments";
import CreateAppointment from "../Components/CreateAppointment";
import DoctorsList from "../Components/DoctorsList";
import UsersList from "../Components/UsersList";
import ApplyDoctor from "../Components/ApplyDoctor";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("profile");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ======================
     LOGOUT
  =======================*/
  const handleLogout = () => {
    localStorage.removeItem("token6163");
    navigate("/", { replace: true });
  };

  /* ======================
     FETCH LOGGED USER
  =======================*/
  const fetchUser = async () => {
    try {
      const res = await getLoggedUser();

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ======================
     PAGE CONTENT
  =======================*/
  const renderContent = () => {
    if (!user) return null;

    switch (activePage) {
      case "profile":
        return <Profile user={user} />;

      case "appointments":
        return <Appointments />;

      case "create-appointment":
        return <CreateAppointment />;

      case "doctors":
        return <DoctorsList />;

      case "users":
        return <UsersList />;

      case "apply-doctor":
        return <ApplyDoctor />;

      default:
        return <h4>Welcome to Dashboard</h4>;
    }
  };

  /* ======================
     ROLE BASED MENU
  =======================*/
  const renderMenu = () => {
    if (!user) return null;

    // ADMIN
    if (user.role === "Admin") {
      return (
        <>
          <MenuBtn
            label="Profile"
            icon={<FaRegUser />}
            onClick={() => setActivePage("profile")}
          />
          <MenuBtn
            label="Appointments"
            icon={<FaCalendarAlt />}
            onClick={() => setActivePage("appointments")}
          />
          <MenuBtn
            label="All Doctors"
            icon={<FaUserMd />}
            onClick={() => setActivePage("doctors")}
          />
          <MenuBtn
            label="All Users"
            icon={<FaUsers />}
            onClick={() => setActivePage("users")}
          />
          <MenuBtn
            label="Create Appointment"
            icon={<FaPlus />}
            onClick={() => setActivePage("create-appointment")}
          />
        </>
      );
    }

    // DOCTOR
    if (user.role === "Doctor") {
      return (
        <>
          <MenuBtn
            label="Profile"
            icon={<FaRegUser />}
            onClick={() => setActivePage("profile")}
          />
          <MenuBtn
            label="Create Appointment"
            icon={<FaPlus />}
            onClick={() => setActivePage("create-appointment")}
          />
          <MenuBtn
            label="Appointments"
            icon={<FaCalendarAlt />}
            onClick={() => setActivePage("appointments")}
          />
        </>
      );
    }

    // USER
    return (
      <>
        <MenuBtn
          label="Profile"
          icon={<FaRegUser />}
          onClick={() => setActivePage("profile")}
        />

        <MenuBtn
          label="Create Appointment"
          icon={<FaPlus />}
          onClick={() => setActivePage("create-appointment")}
        />
        <MenuBtn
          label="Appointments"
          icon={<FaCalendarAlt />}
          onClick={() => setActivePage("appointments")}
        />
        <MenuBtn
          label="Apply for Doctor"
          icon={<FaUserMd />}
          onClick={() => setActivePage("apply-doctor")}
        />
      </>
    );
  };

  /* ======================
     LOADING STATE
  =======================*/
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h5>Loading Dashboard...</h5>
      </div>
    );
  }

  /* ======================
     UI
  =======================*/
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-3">
          <h5 className="text-center mb-4">👤 {user?.name || "User"}</h5>

          <ul className="nav flex-column">
            {renderMenu()}

            <hr />

            <li className="nav-item">
              <button
                className="btn btn-danger w-100 text-start"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4 bg-light">{renderContent()}</div>
      </div>
    </div>
  );
};

/* ======================
   REUSABLE MENU BUTTON
======================*/
const MenuBtn = ({ label, icon, onClick }) => (
  <li className="nav-item mb-2">
    <button className="btn btn-dark w-100 text-start" onClick={onClick}>
      {icon && <span className="me-2">{icon}</span>}
      {label}
    </button>
  </li>
);

export default DashboardPage;

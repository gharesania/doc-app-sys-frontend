import axiosInstance from "./axiosInstance";

/* ======================
   AUTH
======================*/
export const loginUser = (data) => {
  return axiosInstance.post("/user/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/user/register", data);
};

export const getLoggedUser = () => {
  return axiosInstance.get("/user/getUserInfo");
};

export const getDoctorList = () => {
  return axiosInstance.get("/user/doctorList");
};

/* ======================
   APPOINTMENT (USER)
======================*/
export const createAppointment = (data) => {
  return axiosInstance.post("/appointment/createAppointment", data);
};

export const getAppointmentsByUser = () => {
  return axiosInstance.get("/appointment/getAppointmentsByUser");
};

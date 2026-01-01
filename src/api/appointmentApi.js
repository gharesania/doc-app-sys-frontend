import axiosInstance from "./axiosInstance";

export const getPendingAppointmentsOfDoctor = () => {
  return axiosInstance.get("/appointment/showAppointmentsOfDoctor");
};

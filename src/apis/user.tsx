import { API_SERVICES, USER_ROLES } from "scripts/constants";
import baseApi from "./baseApi";

export const fetchAllUsers = () => {
  return baseApi(`${API_SERVICES.USERS}/users`);
};

export const updateUser = (payload: {
  lastName: string;
  firstName: string;
  role: USER_ROLES;
  id: string;
}) => {
  return baseApi(`${API_SERVICES.USERS}`, "PUT", payload);
};

export const createUser = (payload: {
  lastName: string;
  firstName: string;
  role: USER_ROLES;
  password: string;
  email: string;
}) => {
  return baseApi(`${API_SERVICES.USERS}`, "POST", payload);
};

export const deleteUser = (id: string) => {
  return baseApi(`${API_SERVICES.USERS}`, "DELETE", { id });
};

export const resetPassword = ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  return baseApi(`${API_SERVICES.USERS}/reset-password`, "POST", {
    id,
    password,
  });
};

export const changePasswordProfile = ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  return baseApi(`${API_SERVICES.USERS}/change-password`, "PUT", {
    currentPassword,
    newPassword,
  });
};

export const updateProfile = (payload: {
  lastName: string;
  firstName: string;
  phone: string;
}) => {
  return baseApi(`${API_SERVICES.USERS}/profile`, "PUT", payload);
};

export const getCurrentProfile = () => {
  return baseApi(`${API_SERVICES.USERS}/profile`, "GET");
};

export const updateProfilePicture = (payload: any = {}) => {
  const formData = new FormData();
  formData.append("avatar", payload.photo);
  return baseApi(`/api/users/avatar`, "POST", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getUserList = (payload: any = {}) => {
  return baseApi(`${API_SERVICES.USERS}/findAll`, "POST", payload);
};

export const getUsersByRole = ({ role }: { role: string }) => {
  return baseApi(`${API_SERVICES.USERS}/list-by-role`, "POST", { role });
};

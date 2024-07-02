import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/users/login",
    method: "post",
    data,
  });
  
export const apiRegister = (data) =>
  axios({
    url: "/users/register/user",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/users/change-password",
    method: "put",
    data,
  });

export const apiUpdateProfile = (data) =>
  axios({
    url: "/users/update-profile",
    method: "put",
    data,
  });

export const apiGetProfile = (id) =>
  axios({
    url: `/users/get-profile/${id}`,
    method: "get",
  });

export const apiGetAllUser = () =>
  axios({
    url: "/users/all",
    method: "get",
  });

export const apiCreateUserById = (data) =>
    axios({
      url: `/users/create-user`,
      method: "post",
      data,
    });

export const apiUpdateUserById = (data) =>
  axios({
    url: `/users/update-user`,
    method: "put",
    data,
  });

export const apiDeleteUserById = (id) =>
  axios({
    url: `/users/delete/${id}`,
    method: "delete",
  });

export const apiGetTotalUser = () =>
  axios({
    url: "/users/total",
    method: "get",
  });


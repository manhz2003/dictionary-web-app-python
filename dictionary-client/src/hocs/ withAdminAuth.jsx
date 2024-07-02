import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import path from "../ultils/path";
import { NotFound } from "../components/index";

const AdminRoute = ({ element }) => {
  const { user } = useAuth();

  const isAdmin = user && user.roles.some((role) => role.nameRole === "Admin");

  if (!isAdmin) {
    return <NotFound />;
  }

  return element;
};

export default AdminRoute;

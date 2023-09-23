import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import PublicRoute from "./ProtectedRoutes/PublicRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

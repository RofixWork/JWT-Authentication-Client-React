import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useCreateUserMutation } from "../api/authAPI";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, error, data }] = useCreateUserMutation();
  //user data
  const [userData, setUserData] = useState(() => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  });
  //effect
  useEffect(() => {
    let time;
    if (data) {
      const { message } = data;
      toast.success(message);

      setUserData((prev) => {
        return { email: "", password: "", confirmPassword: "" };
      });
      time = setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
    //handle error
    if (error) {
      toast.error(error.data.message);
    }
    return () => clearTimeout(time);
  }, [isLoading]);

  //handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    //check inputs
    if (validator.isEmpty(userData.email, { ignore_whitespace: true })) {
      toast.error("Please Enter Your Email Address");
      return;
    }

    if (!validator.isEmail(userData.email)) {
      toast.error("Invalid Format Email");
      return;
    }
    if (validator.isEmpty(userData.password, { ignore_whitespace: true })) {
      toast.error("Enter Your Password");
      return;
    }

    if (!validator.isLength(userData.password, { min: 6 })) {
      toast.error("use at least 6 characters in Password");
      return;
    }
    if (!validator.equals(userData.password, userData.confirmPassword)) {
      toast.error("Password not match");
      return;
    }
    //check inputs
    //create user
    createUser({ email: userData.email, password: userData.password });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mx-3">
        <MDBContainer>
          <MDBRow>
            <MDBCol
              sm={12}
              md={10}
              lg={7}
              className="mx-2 mx-md-auto border py-3 px-3 mt-3 rounded shadow-2"
            >
              <h2 className="mb-3">Create a new User</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  className="mb-4"
                  label="Email"
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <MDBInput
                  className="mb-4"
                  label="Password"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <MDBInput
                  className="mb-4"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <MDBBtn type="submit">
                  {isLoading ? "Loading..." : "Register"}
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default Register;

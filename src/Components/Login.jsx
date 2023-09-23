import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";
import { useSigninUserMutation } from "../api/authAPI";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../app/Slices/UserSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [signinUser, { isLoading, error, data }] = useSigninUserMutation();
  //user data
  const [userData, setUserData] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });

  //effect
  useEffect(() => {
    if (data) {
      //get token
      const { token } = data;
      //decode token
      var user = jwt_decode(token);
      dispatch(setUser({ token, user }));

      //save token n local storage
      localStorage.setItem("token", token);

      setUserData((prev) => {
        return { email: "", password: "", confirmPassword: "" };
      });
    }
    //handle error
    if (error) {
      toast.error(error.data.message);
    }
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
    //check inputs
    //login
    signinUser({ email: userData.email, password: userData.password });
  };
  return (
    <div className="mx-3" onSubmit={handleSubmit}>
      <Toaster position="top-right" reverseOrder={false} />
      <MDBContainer>
        <MDBRow>
          <MDBCol
            md={11}
            lg={7}
            className="mx-auto border py-3 px-3 mt-3 rounded shadow-2"
          >
            <h2 className="mb-3">Account Login</h2>
            <form>
              <MDBInput
                className="mb-4"
                label="Email"
                type="text"
                value={userData.email}
                name="email"
                onChange={handleChange}
              />
              <MDBInput
                className="mb-4"
                label="Password"
                type="password"
                value={userData.password}
                name="password"
                onChange={handleChange}
                autoComplete="on"
              />
              <MDBBtn type="submit">
                {isLoading ? "Loading..." : "Login"}
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;

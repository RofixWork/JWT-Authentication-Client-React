import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/Slices/UserSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showNavSecond, setShowNavSecond] = useState(false);
  const navigate = useNavigate();

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <NavbarBrand onClick={() => navigate("/")}>Demerge</NavbarBrand>
        <MDBNavbarToggler
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav className="justify-content-end">
            {user ? (
              <>
                <MDBNavbarLink>{user.email}</MDBNavbarLink>
                <MDBNavbarLink onClick={() => dispatch(logout())}>
                  LogOut
                </MDBNavbarLink>
              </>
            ) : (
              <>
                <MDBNavbarLink onClick={() => navigate("register")}>
                  Register
                </MDBNavbarLink>
                <MDBNavbarLink onClick={() => navigate("login")}>
                  Login
                </MDBNavbarLink>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
export default Navbar;

const NavbarBrand = styled(MDBNavbarBrand)`
  cursor: pointer;
`;

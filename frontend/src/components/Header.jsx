import React from "react";
import { Navbar } from "react-bootstrap";
const Header = () => {
  return (
    <Navbar bg="dark" expand="md" style={{ minHeight: "5vh" }}>
      <Navbar.Brand className="text-white">Leaflet</Navbar.Brand>
    </Navbar>
  );
};

export default Header;

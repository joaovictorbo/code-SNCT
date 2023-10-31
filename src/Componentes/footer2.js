import React from "react";
import "./footer2.css";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import logo from "./assets/CODE.png";

export default function Footer2() {
  return (
    <MDBFooter
      className="footer mt-auto"
      style={{ backgroundColor: "#f1f1f1", position: "relative", bottom: "0" }}
    >
      <MDBContainer className="d-flex flex-column min-vh-10">
        <section className="p-2">
          <img src={logo} alt="a" loading="lazy" />
        </section>
      </MDBContainer>
    </MDBFooter>
  );
}

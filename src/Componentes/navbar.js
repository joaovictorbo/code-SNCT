import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
} from 'mdb-react-ui-kit';
import logo from './assets/CODE.png';

export default function Navbar1() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='white'>
      <MDBContainer fluid>
       <img src={logo} alt="a"height="40"loading="lazy"/> 

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
      </MDBContainer>
    </MDBNavbar>
  );
}
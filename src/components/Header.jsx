import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useEmail } from "./EmailContext"; 
import Logo from './MedConnect.png';
function Header() {
  const { email,setEmail,userType,setUserType } = useEmail(); 
  const navigate = useNavigate();
  const onLogout=()=>{
    setEmail("");
    setUserType("");
    navigate('/');
  };
  return (
    <header className="container Header mt-2">
      <nav className="navbar sticky-top ">
        <div className="container-fluid d-flex align-items-center row justify-content-center">
          <Link to="/" className="navbar-brand justify-content-center d-flex align-items-center d-lg-flex flex-row  col">
            <img src={Logo} alt="Logo" style={{borderRadius:'50%',marginRight:'20px'}} width="50" height="50" className="d-inline-block align-text-top" />
            <span className="fw-bold text-green">MedConnect</span>
          </Link>
          <ul className="navbar-nav d-flex flex-row gap-5 col justify-content-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active fw-bolder" aria-current="page">Home</Link>
            </li>
            <li className="nav-item fw-bolder">
              <Link to="/Book Appointment" className="nav-link">Doctors</Link>
            </li>
            {email==="2112059@nec.edu.in" && (
              <li className="nav-item fw-bolder">
                <Link to="/addDoc" className="nav-link">Add Doctors</Link>
              </li>
            )}
            {email!=="2112059@nec.edu.in" && userType==='doctor' && (
              <li className="nav-item fw-bolder">
                <Link to="/appointments" className="nav-link">Appointments</Link>
              </li>
            )}
            {email && userType==='patient' && (
              <li className="nav-item fw-bolder">
                <Link to="/account" className="nav-link">Account</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav d-flex flex-row col justify-content-center">
            {email ? (
              <li className="nav-item">
                <button className="btn logout fw-bold" onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn login fw-bold" onClick={() => navigate("/login")}>Log in</button>
                </li>
                <li className="nav-item">
                  <button className="btn signUp" onClick={() => navigate("/signup")}>Signup</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

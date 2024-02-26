import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";


function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    

    
    <div className="header">

      <nav
        style={{ backgroundColor: "#f7b731" }}
        className="navbar navbar-expand-lg"
      >
        <div className="container-fluid" >
          <Link className="navbar-brand text-light " to="/">
            Momsy
          </Link>
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to=""
                >
                  Buy
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to=""
                >
                  About
                </Link>
              </li>
             
            </ul>
          
            {!localStorage.getItem("token") ? (
              <Link to="/login" className="btn btn-danger btn-outline-warning text-light" style={{textDecoration:'none'}} >LOGIN</Link>
            ) : (
              <MDBBtn
                className=" btn-light btn-outline-light "
                onClick={handleLogout}
                style={{color:'#34495E '}}
              >
                {" "}
                LOGOUT{" "}
              </MDBBtn>
            )}
          </div>
        </div>
      </nav>

    </div>
  
  );
}

export default Header;
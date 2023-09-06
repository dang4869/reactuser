import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UseContext";
function Header() {
  const { logout, user } = useContext(UserContext);
  const [hideHeader, setHideHeader] = useState(false);

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // },[]);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Đăng xuất thành công");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">
          React-Bootstrap
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manage Users
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email ? (
                  <NavDropdown title={user.email}>
                    {user && user.auth === true ? (
                      <NavLink className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Setting">
                    {user && user.auth === true ? (
                      <NavLink className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                )}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo1.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/bookings",
    display: "Bookings",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between ">
            <nav>
              <NavLink to="/" className="title">
                <img src={logo} alt="" />
              </NavLink>
              <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <i className={`ri-menu-line ${menuOpen ? "open" : ""}`}></i>
              </div>
              <div className="navigation">
                <ul className={menuOpen ? "open" : ""}>
                  {nav__links.map((item, index) => (
                    <li className="nav__item btn secondary__btn" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}

                  <div className="nav__btns d-flex align-items-center gap-4 extras">
                    {user ? (
                      <>
                        <h5 className="mb-0">{user.username}</h5>
                        <Button className="btn btn-dark" onClick={logout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="btn secondary__btn">
                          <Link to="/login">Login</Link>
                        </Button>
                        <Button className="btn primary__btn">
                          <Link to="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </ul>
              </div>
            </nav>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

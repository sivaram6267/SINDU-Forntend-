import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LancesoftWhiteLogo from "../../images/LancesoftWhiteLogo.svg";
import ApiService from "../../services/ApiService";
import ModelComponent from "../model/ModelComponent";
import login from "../../images/Login Icon.svg";
import HomeIcon from "../../images/Home Icon.svg";
import "./header.css";
export default function Header({ view }) {
  const [to, setTo] = useState();
  const [from, setFrom] = useState(new Date().toISOString().substring(0, 10));
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState("");
  let type = sessionStorage.getItem("type");
  let user = sessionStorage.getItem("firstName");
  let navPath = `/${type}`;
  // console.log(type);
  let id = sessionStorage.getItem("Id");
  const [modalShow, setModalShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(sessionStorage.getItem("Access_Token"));
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);

  const handlefunction = () => {
    sessionStorage.clear();
    // alert(`Logout Successful`);
    setToken((data) => (data = sessionStorage.getItem("Access_Token")));
  };
  const handleOnClick = () => {
    setModalShow(true);
  };

  useEffect(() => {
    setMsg();
    if (type === "lead") {
      console.log(data);
      ApiService.totalLead({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          alert("successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "manager") {
      ApiService.totalManager({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          // alert(" manager successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "general_manager") {
      ApiService.totalGeneralManager({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "vicePresident") {
      ApiService.totalvicepresident({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "ch") {
      ApiService.totalCH({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }

    if (type === "md") {
      ApiService.totalMD({
        fromDate: "",
        toDate: "",
      })
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    if (type === "lead") {
      ApiService.totalLead(data)
        .then((res) => {
          console.log(res.data);
          alert("successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "manager") {
      ApiService.totalManager(data)
        .then((res) => {
          console.log(res.data);
          alert(" manager successfully");
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "general_manager") {
      ApiService.totalGeneralManage(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "vicePresident") {
      ApiService.totalvicepresident(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    if (type === "ch") {
      ApiService.totalCH(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }

    if (type === "md") {
      ApiService.totalMD(data)
        .then((res) => {
          console.log(res.data);
          setTotal(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTotal(0);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };
  return (
    <>
      <Navbar className="color-nav" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to={view === "Home" ? "/" : navPath} id={`navbar-brand`}>
              <img
                src={LancesoftWhiteLogo}
                className="icon"
                alt="lancesoft_logo"
              />
            </Link>
          </Navbar.Brand>
          {view === "Home" ? (
            <>
              <Nav id="nav">
                <Link className="m-2" to="/" id="nav-link">
                  <img src={HomeIcon} alt="Home" className="iconHome" />
                  <p id="iconHomeName">Home</p>
                </Link>
                <Link className="m-2" to="/login" id="nav-link">
                  <img className="iconHome" src={login} alt="login" />
                  <p id="iconHomeName">Login</p>
                </Link>
              </Nav>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className="m-2" to="/" id="nav-link"></Link>
                </Nav>
                <Nav id="nav">
                  {[null, undefined].includes(token) && (
                    <Link className="m-2" to="/" id="nav-link">
                      Login
                    </Link>
                  )}
                  {![null, undefined].includes(token) &&
                    (["finance"].includes(type) ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            // id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            <p id="nav-link" className="username">
                              Domestic
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/finance/clientDomestic"
                                id="nav-link"
                              >
                                Client Domestic
                              </Link>
                              <Link
                                className="m-2"
                                to="/finance/internalDomestic"
                                id="nav-link"
                              >
                                Internal Domestic
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            // id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            <p id="nav-link" className="username">
                              International
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/finance/clientInternational"
                                id="nav-link"
                              >
                                Client International
                              </Link>
                              <Link
                                className="m-2"
                                to="/finance/internalInternational"
                                id="nav-link"
                              >
                                Internal International
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : ["hr"].includes(type) ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            {/* <img src={profilepic} alt="profile" className="img" /> */}
                            <p id="nav-link" className="username">
                              Employee
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/hr/addEmployee"
                                id="nav-link"
                              >
                                Create Employee
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/register"
                                id="nav-link"
                              >
                                Create Credentials
                              </Link>

                              <Link
                                className="m-2"
                                to="/hr/promoteEmployee"
                                id="nav-link"
                              >
                                Promote Employee
                              </Link>
                              <Link
                                className="m-2"
                                to="/transferEmployee"
                                id="nav-link"
                              >
                                Transfer Employee
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/exitEmployee"
                                id="nav-link"
                              >
                                Release Employee
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            {/* <img src={profilepic} alt="profile" className="img" /> */}
                            <p id="nav-link" className="username">
                              Employee info
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/hr/addDepartment"
                                id="nav-link"
                              >
                                Add departments
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/addEmpType"
                                id="nav-link"
                              >
                                Add employee type
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/updateSupervisorId"
                                id="nav-link"
                              >
                                Update reporting person
                              </Link>

                              <Link
                                className="m-2"
                                to="/hr/updateDesignation"
                                id="nav-link"
                              >
                                Update Hierarchy
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/addSubDepartment"
                                id="nav-link"
                              >
                                Add Sub departments
                              </Link>

                              <Link
                                className="m-2"
                                to="/hr/addAddressType"
                                id="nav-link"
                              >
                                Add address type
                              </Link>
                              <Link
                                className="m-2"
                                to="/hr/addDesignation"
                                id="nav-link"
                              >
                                Add designation
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Button
                      variant="link"
                      id="nav-link"
                      onClick={() => handleOnClick()}
                    >
                      Profile
                    </Button>
                    <Link
                      className="m-2"
                      to="/"
                      onClick={handlefunction}
                      id="nav-link"
                    >
                      Logout
                    </Link> */}
                      </>
                    ) : [
                        "md",
                        "general_manager",
                        "vicePresident",
                        "ch",
                        "vicepresident",
                      ].includes(type) ? (
                      <>
                        <Form className="formHeader" onSubmit={handleSubmit}>
                          <Form.Group className="formHeader">
                            <Form.Label className="formLabelHeader">
                              From
                            </Form.Label>
                            <Form.Control
                              className="formInput"
                              required
                              type="date"
                              name="fromDate"
                              onChange={handleChange}
                            />
                          </Form.Group>{" "}
                          <Form.Group className="formHeader">
                            <Form.Label className="formLabelHeader">
                              To
                            </Form.Label>
                            <Form.Control
                              className="formInput"
                              required
                              type="date"
                              name="toDate"
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <button className="btn" type="submit" id="btnHeader">
                            Submit
                          </button>
                          <p className="text-danger mb-1">{msg}</p>
                        </Form>
                        <p className="total">
                          {total > 0 ? "Profit" : "Loss"}: <nobr />
                          <span
                            className={
                              total > 0
                                ? "text-success font-weight-bold"
                                : "text-danger font-weight-bold"
                            }
                            id="nav-link"
                          >
                            {total}
                          </span>
                        </p>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            {/* <img src={profilepic} alt="profile" className="img" /> */}
                            <p id="nav-link" className="username">
                              Employee
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/transferEmployee"
                                id="nav-link"
                              >
                                Transfer Employee
                              </Link>
                              <Link
                                className="m-2"
                                to="/releaseRequest"
                                id="nav-link"
                              >
                                Release employee
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : ["manager"].includes(type) ? (
                      <>
                        <Form className="formHeader" onSubmit={handleSubmit}>
                          <Form.Group className="formHeader">
                            <Form.Label className="formLabelHeader">
                              From
                            </Form.Label>
                            <Form.Control
                              className="formInput"
                              required
                              type="date"
                              name="fromDate"
                              defaultValue={data.fromDate}
                              onChange={handleChange}
                            />
                          </Form.Group>{" "}
                          <Form.Group className="formHeader">
                            <Form.Label className="formLabelHeader">
                              To
                            </Form.Label>
                            <Form.Control
                              className="formInput"
                              required
                              type="date"
                              name="toDate"
                              defaultValue={data.toDate}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <button type="submit" id="btnHeader">
                            Submit
                          </button>
                          <p className="text-danger mb-1">{msg}</p>
                        </Form>
                        <p className="total">
                          {total > 0 ? "Profit" : "Loss"} : <nobr />
                          <span
                            className={
                              total > 0
                                ? "text-success font-weight-bold"
                                : "text-danger font-weight-bold"
                            }
                            id="nav-link"
                          >
                            {total}
                          </span>
                        </p>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            {/* <img src={profilepic} alt="profile" className="img" /> */}
                            <p id="nav-link" className="username">
                              Client
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/manager/addClientDetails"
                                id="nav-link"
                              >
                                Add Client details
                              </Link>
                              <Link
                                className="m-2"
                                to="/manager/addClientNames"
                                id="nav-link"
                              >
                                Add Client Names
                              </Link>
                              <Link
                                className="m-2"
                                to="/manager/editClientDetails"
                                id="nav-link"
                              >
                                Edit Client details
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Link
                          className="m-2"
                          to="/releaseRequest"
                          id="nav-link"
                        >
                          Release employee
                        </Link> */}

                        <Dropdown>
                          <Dropdown.Toggle
                            className="toggle"
                            variant=""
                            id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                          >
                            {/* <img src={profilepic} alt="profile" className="img" /> */}
                            <p id="nav-link" className="username">
                              Employee
                            </p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Row>
                              <Link
                                className="m-2"
                                to="/transferEmployee"
                                id="nav-link"
                              >
                                Transfer Employee
                              </Link>
                              <Link
                                className="m-2"
                                to="/releaseRequest"
                                id="nav-link"
                              >
                                Release employee
                              </Link>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Button
                      variant="link"
                      id="nav-link"
                      onClick={() => handleOnClick()}
                    >
                      Profile
                    </Button>
                        <Link
                      className="m-2"
                      to="/"
                      onClick={handlefunction}
                      id="nav-link"
                    >
                      Logout
                    </Link> */}
                      </>
                    ) : ["lead"].includes(type) ? (
                      <>
                        <p className="total">
                          {total > 0 ? "Profit" : "Loss"} :
                          <nobr />
                          <span
                            className={
                              total > 0
                                ? "text-success font-weight-bold"
                                : "text-danger font-weight-bold"
                            }
                            id="nav-link"
                          >
                            {total}
                          </span>
                        </p>
                      </>
                    ) : (
                      ""
                    ))}
                  <Dropdown>
                    <Dropdown.Toggle
                      className="toggle"
                      variant=""
                      id="dropdown-basic dropdownMenu dropdown-autoclose-true "
                    >
                      {/* <img src={profilepic} alt="profile" className="img" /> */}
                      <p id="nav-link" className="username">
                        My profile
                      </p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Row>
                        <Link
                          className="m-2"
                          to="/"
                          id="nav-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOnClick();
                          }}
                        >
                          {user}
                        </Link>
                        <Link
                          className="m-2"
                          to="/"
                          onClick={handlefunction}
                          id="nav-link"
                        >
                          Logout
                        </Link>
                      </Row>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
      <ModelComponent
        data={id}
        // type={props.type}
        show={modalShow}
        // view={view}
        onHide={() => {
          setModalShow(false);
          // setData({});
        }}
      />
    </>
  );
}
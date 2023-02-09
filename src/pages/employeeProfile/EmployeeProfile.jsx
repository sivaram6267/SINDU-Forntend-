import React, { Fragment } from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
// import moment from "moment";
import "./EmployeeProfile.css";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import SubEmployee from "../../components/subEmployee/SubEmployee";
import { useLocation } from "react-router-dom";
import FileSaver from "file-saver";

function EmployeeProfile() {
  // console.log(props.data);
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [fName, setFName] = useState("");
  const [allowanceData, setAllowanceData] = useState();
  const [resumeUrl, setResumeUrl] = useState("");
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  // const handleEdit = () => {
  //   setDisabled(true);
  // };
  const handleClose = () => {
    //props.onHide()
    //setData("")
  };
  const extractFileName = (contentDispositionValue) => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  const handleResume = async () => {
    //const { name, id } = e.target;
    //e.preventDefault();
    const id = data.detailsResponse?.employeeId;
    console.log(id);
    await ApiService.DownloadResume(id)
      .then((res) => {
        console.log(res.data);
        const filename = extractFileName(res.headers["content-disposition"]);
        if (filename !== null) {
          setFName(filename);
          setMsg("");
          console.log("File Name: ", filename);
          var fileDownload = require("js-file-download");
          fileDownload(res.data, filename);
        } else {
          setMsg("resume not found");
        }
      })

      .catch((error) => {
        alert(JSON.stringify(error));

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  // const handleResume = async() =>{
  //   //const { name, id } = e.target;
  //   //e.preventDefault();
  //   const id = data.detailsResponse?.employeeId;
  //   console.log(id);
  //  await ApiService.DownloadResume(id)
  //   .then((res) => {
  //     console.log(res.data);
  //     const filename= ""//extractFileName(res.headers['content-disposition']);
  //  if(filename !== "")
  //  {
  //     setFName(filename)
  //     setMsg("")
  //     console.log("File Name: ",filename);
  //     if(res.data.size > 0)
  //     {
  //       let fileDownload = require('js-file-download');
  //       fileDownload(res.data, filename);
  //     }
  //  }
  //  else{
  //   alert("Resume not available for this employee")
  //  }
  //     })

  // .catch((error) => {
  //   alert(JSON.stringify(error));

  //   setMsg(
  //     error.response.data.errorMessage
  //       ? error.response.data.errorMessage
  //       : error.message
  //   );
  // });

  // }

  //   }

  useEffect(() => {
    console.log(location.state.empId);

    if (location.state.empId) {
      setStatus(true);
      //console.log(props)
      console.log(data);

      ApiService.getEmployeeById(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setData("");
          setStatus(false);
          setMsg(err.message);
        });
      ApiService.specialallowance(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setAllowanceData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setAllowanceData("");
          setStatus(false);
          setMsg(err.message);
        });

      ApiService.getAllClientsByEmpId(location.state.empId)
        .then((res) => {
          console.log(data);
          console.log(res.data.addres);
          setClient(res.data);
          setStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setClient({});
          setStatus(false);
        });
    }
  }, [location.state.empId]);

  return (
    <>
      <div id="add-employee" className="container-sm">
        <h1 className="title text-center">Employee Profile</h1>

        {status && <p className="text-success mb-1">loading...</p>}
        <p className="text-danger">{msg}</p>
        {!status && (
          <Form onSubmit={handleSubmit}>
            <Row xs="auto">
              <Col>
                <div id="modelSection">
                  <h5 className="modelHeading">Employee Details</h5>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="employeeId">
                      <b>Employee ID</b>
                    </Form.Label>
                    <Form.Control
                      name="employeeId"
                      id="employeeId"
                      required
                      disabled={disabled ? "" : "disabled"}
                      type="text"
                      placeholder=""
                      defaultValue={data.detailsResponse?.employeeId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="firstName">
                      <b>First Name</b>
                    </Form.Label>
                    <Form.Control
                      name="firstName"
                      id="firstName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastName">
                      <b>Last Name</b>
                    </Form.Label>
                    <Form.Control
                      name="lastName"
                      id="lastName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="joiningDate">
                      <b>Joining Date</b>
                    </Form.Label>
                    <Form.Control
                      name="joiningDate"
                      id="joiningDate"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.joiningDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      id="email"
                      // autoComplete="email"
                      required
                      type="email"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="dateOfBirth">
                      <b>Date Of Birth</b>
                    </Form.Label>
                    <Form.Control
                      name="dob"
                      id="dateOfBirth"
                      required
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="gender">
                      <b>Gender</b>
                    </Form.Label>
                    <Form.Control
                      name="gender"
                      id="gender"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.gender}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="employeeType">
                      <b>Employee Type</b>
                    </Form.Label>
                    <Form.Control
                      name="employeeType"
                      id="employeeType"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.employeeType}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">
                      <b>Location</b>
                    </Form.Label>
                    <Form.Control
                      name="location"
                      id="location"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.location}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subDepartName">
                      <b>Sub Department Name</b>
                    </Form.Label>
                    <Form.Control
                      name="subDepartName"
                      id="subDepartName"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.subDepartName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="designation">
                      <b>Designation</b>
                    </Form.Label>
                    <Form.Control
                      name="designation"
                      id="designation"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.designation}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">
                      <b>Department</b>
                    </Form.Label>
                    <Form.Control
                      name="depart"
                      id="depart"
                      required
                      type="text"
                      placeholder=""
                      disabled={disabled ? "" : "disabled"}
                      defaultValue={data.detailsResponse?.department}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col>
                <div id="modelSection">
                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="benchTenure">
                        <b>Bench Tenure</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="benchTenure"
                        type="number"
                        name="benchTenure"
                        defaultValue={ip.benchTenure}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone number">
                      <b>Phone Number</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="phone number"
                      type="tel"
                      disabled={disabled ? "" : "disabled"}
                      // pattern="[+91][0-9]{13}"
                      // pattern="[0-9]{10}"
                      message="please enter correct number"
                      placeholder=""
                      name="phoneNo"
                      title="enter phone number like +919999999999"
                      defaultValue={data.detailsResponse?.phoneNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="salary">
                      <b>Salary</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="salary"
                      type="text"
                      placeholder=""
                      name="salary"
                      title="enter salary"
                      defaultValue={data.salary}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="firstName">
                        <b>Country</b>
                      </Form.Label>
                      <Form.Control
                        name="country"
                        id="country"
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.country}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="state">
                        <b>State</b>
                      </Form.Label>
                      <Form.Control
                        name="state"
                        id="state "
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        onChange={handleChange}
                        defaultValue={it.state}
                      />
                    </Form.Group>
                  ))}{" "}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="city">
                        <b>City</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="city"
                        type="text"
                        name="city"
                        placeholder=""
                        // disabled={disabled ? "" : "disabled"}
                        defaultValue={it.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    // {it.city}
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="street">
                        <b>Street</b>
                      </Form.Label>
                      <Form.Control
                        name="street"
                        id="street"
                        enable
                        required
                        type="text"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.street}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.addres?.map((it) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="zipCode">
                        <b>Pincode</b>
                      </Form.Label>
                      <Form.Control
                        name="zipCod"
                        id="zipCod"
                        required
                        type="number"
                        placeholder=""
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={it.zipCod}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastStatus">
                      <b>Last Status</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="lastStatus"
                      type="text"
                      placeholder="Enter Status"
                      name="lastStatus"
                      title="enter lastStatus"
                      defaultValue={data.lastStatus}
                      // onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="releasedDate">
                      <b>Released Date</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="releasedDate"
                      type="text"
                      placeholder="Enter releasedDate"
                      name="releasedDate"
                      title="enter releasedDate"
                      defaultValue={data.releasedDate}
                      // onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="releasedDate">
                      <b>Exit Type</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="exitType"
                      type="text"
                      placeholder="Enter exitType"
                      name="exitType"
                      title="enter exitType"
                      defaultValue={data.exitType}
                      // onChange={handleChange}
                    />
                    <br />

                    <b>Resume Download</b>
                    <br />
                    <button className="buttonDownload" onClick={handleResume}>
                      <a className="button" href="" download={fName}>
                        Download Resume
                      </a>
                    </button>

                    {/* <a href=""class="buttonDownload"   id="resumeDownload" onClick={handleResume(data.detailsResponse?.employeeId)}>Download</a>  */}
                  </Form.Group>
                  {/* <Form.Group className="mb-3">
                    <Form.Label htmlFor="resumeDownload">
                      <b>Resume Download</b>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={disabled ? "" : "enabled"}
                      id="resumeDownload"
                      // type="text"
                      // placeholder="Enter releasedDate"
                      name="releasedDate"
                      title="enter releasedDate"
                      defaultValue={data.resumeDownload}
                       onChange={handleResume}
                    />
                  </Form.Group> */}
                  {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="employeeId">
                        Reporting Person
                      </Form.Label>
                      <Form.Control
                        name="reportingperson"
                        id="reportingperson"
                        required
                        disabled={disabled ? "" : "disabled"}
                        type="text"
                        placeholder="Enter reportingperson"
                        defaultValue={
                          data.detailsResponse?.reportingperson
                        }
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                  {/* <Form.Group className="mb-3">
                    //   <Form.Label htmlFor="city">city</Form.Label>
                    //   <Form.Control
                    //     disabled
                    //     id="city"
                    //     type="text"
                    //     name="city"
                    //     placeholder="please enter city name"
                    //     // defaultValue={it.city}
                    //     onChange={handleChange}
                    //   />
                    // </Form.Group> */}
                  {/* <Form.Group className="mb-3 checkbox">
                <Form.Label>Gender : </Form.Label>{" "}
                <Form.Check
                  required
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Male";
                  }}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Female";
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone number">Phone Number</Form.Label>
                <Form.Control
                  // required
                  id="phone number"
                  type="tel"
                  disabled={disabled ? "" : "disabled"}
                  // pattern="[+91][0-9]{13}"
                  // pattern="[0-9]{10}"
                  message="please enter correct number"
                  placeholder="please enter phone number"
                  name="phoneNo"
                  // placeholder="+919999999999"
                  // pattern="[+91][0-9].{11}"
                  // maxLength={13}
                  title="enter phone number like +919999999999"
                  defaultValue={data.phoneNo}
                  onChange={handleChange}
                />
              </Form.Group> */}
                  {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="practice">Practice</Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="practice"
                    type="text"
                    placeholder="please enter practice"
                    name="practice"
                    title="enter salary"
                    defaultValue={data.practice}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                  {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="designationAtLs">
                    Designation at Lancesoft
                  </Form.Label>
                  <Form.Control
                    required
                    disabled={disabled ? "" : "disabled"}
                    id="designationAtLs"
                    type="text"
                    placeholder="please enter designation at Lancesoft"
                    name="designationAtLs"
                    title="enter designation"
                    defaultValue={data.designationAtLs}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                  {/* <Form.Group className="mb-3">
                  <Form.Label htmlFor="tenure">Tenure</Form.Label>
                  <Form.Control
                    disabled
                    id="tenure"
                    type="text"
                    name="tenure"
                    defaultValue={data.internalExpenses?.tenure}
                    // onChange={handleChange}
                  />

                </Form.Group> */}
                  {/* {data.addres?.map((it) => (
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="addressId">AddressId</Form.Label>
                        <Form.Control
                          name="addressId"
                          id="addressId"
                          required
                          type="text"
                          placeholder="enter addressId "
                          disabled={disabled ? "" : "disabled"}
                          defaultValue={it.addressId}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    ))} */}
                  {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="designation">
                        Working Internal
                      </Form.Label>
                      <Form.Control
                        name="WorkingInternal"
                        id="WorkingInternal"
                        required
                        type="text"
                        placeholder="status"
                        disabled={disabled ? "" : "disabled"}
                        defaultValue={data.detailsResponse?.WorkingInternal}
                        onChange={handleChange}
                      />
                    </Form.Group> */}
                </div>
              </Col>

              <Col>
                <div id="modelSection" className="container-sm ">
                  <h5 className="modelHeading">Bill</h5>
                  <hr></hr>
                  {/* <Form.Group className="mb-3">
                      <Form.Label htmlFor="paidTillNow">
                        Total salary paid till now
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="paidTillNow"
                        type="text"
                        name="paidTillNow"
                        defaultValue={
                          data.internalExpenses?.totalSalPaidTillNow
                        }
                        onChange={handleChange}
                      />
                    </Form.Group> */}

                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="paidTillNow">
                        <b>Total Salary Paid Till Now</b>
                      </Form.Label>
                      <Form.Control
                        name="paidTillNow"
                        id="paidTillNow"
                        required
                        type="text"
                        placeholder=""
                        disabled
                        defaultValue={ip.totalSalPaidTillNow}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="totalExpenses">
                        <b>Total Expences</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="totalExpenses"
                        type="text"
                        name="totalExpenses"
                        placeholder=""
                        defaultValue={ip.totalExpenses}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}

                  {data.internalExpenses?.map((ip) => (
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="profitOrLoss">
                        <b>Profit/Loss</b>
                      </Form.Label>
                      <Form.Control
                        disabled
                        id="profitOrLoss"
                        type="text"
                        name="profitOrLoss"
                        defaultValue={ip.profitOrLoss}
                      />
                    </Form.Group>
                  ))}
                  {/* {data.allClientsEarning?.map((ip) => ( */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="profitOrLoss">
                      <b>AllClientsEarning</b>
                    </Form.Label>
                    <Form.Control
                      disabled
                      id="allClientsEarning"
                      type="text"
                      name="allClientsEarning"
                      defaultValue={data.allClientsEarning}
                    />
                  </Form.Group>
                  {/* ))} */}

                  <SubEmployee id={location.state.empId} />
                </div>
                <Row xs="auto">
                  <Col>
                    {/* {["lead", "Consultant"].includes( */}
                    {/* data.employeeDetailsResponse?.designation
                  ) && ( */}
                    {/* <> */}
                    {data.atClientAllowances?.map((allowanceData, index) => (
                      <div id="modelSection" key={index} className="container ">
                        <h5 className="modelHeading">Allowance {index + 1}</h5>
                        <hr></hr>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="ShiftAllowance">
                            <b>ShiftAllowance</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="ShiftAllowance"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="ShiftAllowance"
                            title="enter Total ShiftAllowance"
                            defaultValue={allowanceData.shiftAllowance}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="workMode">
                            <b>specialAllowance</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="specialAllowance"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="specialAllowance"
                            title="enter specialAllowance"
                            defaultValue={allowanceData.specialAllowance}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="joingBonus">
                            <b>joingBonus</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="joingBonus"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="joingBonus"
                            title="enter joingBonus"
                            defaultValue={allowanceData.joingBonus}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="joiningBonusTenure">
                            <b>joiningBonusTenure</b>
                          </Form.Label>
                          <Form.Control
                            // required
                            id="joiningBonusTenure"
                            type="text"
                            disabled={disabled ? "" : "disabled"}
                            placeholder=""
                            name="joiningBonusTenure"
                            title="enter joiningBonusTenure"
                            defaultValue={allowanceData.joiningBonusTenure}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row xs="auto">
              {/* {["lead", "Consultant"].includes( */}
              {/* data.employeeDetailsResponse?.designation
                  ) && ( */}
              {/* <> */}
              {data.employeeAtClientsDetails?.map((client, index) => (
                <div id="modelSection" key={index} className="container ">
                  <h5 className="modelHeading">Client {index + 1}</h5>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientSalary">
                      <b>Client Salary</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientSalary"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalEarningAtclient"
                      title="enter Total Client billing"
                      defaultValue={client.clientSalary}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="podate">
                      <b>Podate</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="podate"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="podate"
                      title="enter podate"
                      defaultValue={client.podate}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="poSdate">
                      <b>PO Start date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="poSdate"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="poSdate"
                      title="enter PO Start date"
                      defaultValue={client.posdate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="poEdate">
                      <b>PO end date</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="poEdate"
                      disabled={disabled ? "" : "disabled"}
                      type="text"
                      placeholder=""
                      name="poEdate"
                      title=""
                      defaultValue={client.poedate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="offerReleaseDate">
                      <b>OfferReleaseDate</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="offerReleaseDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="offerReleaseDate "
                      title="enter offerReleaseDate "
                      defaultValue={client.offerReleaseDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientJoiningDate">
                      <b>ClientJoiningDate</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientJoiningDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientJoiningDate "
                      title="enter clientJoiningDate "
                      defaultValue={client.clientJoiningDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientsNames">
                      <b>Client Name</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clients"
                      disabled={disabled ? "" : "disabled"}
                      type="text"
                      placeholder=""
                      name="clients"
                      title="enter client name"
                      defaultValue={client.clients}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="desgAtClient">
                      <b>Designation at Client</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="desgAtClient"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="desgAtClient"
                      title="enter designation"
                      defaultValue={client.desgAtClient}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="skillSet">
                      <b>SkillSet</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="skillSet"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="skillSet"
                      title="enter skillSet"
                      defaultValue={client.skillSet}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="clientLocation">
                      <b>ClientLocation</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientLocation"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientLocation"
                      title="enter clientLocation"
                      defaultValue={client.clientLocation}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="workMode">
                      <b>WorkMode</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="workMode"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="workMode"
                      title="enter workMode"
                      defaultValue={client.workMode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Manager Name</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientManagerName"
                      type="email"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientManagerName"
                      title="enter client Manager Name"
                      defaultValue={client.clientManagerName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Email</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientEmail"
                      type="email"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientEmail"
                      title="enter client mail"
                      defaultValue={client.clientEmail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="towerHead">
                      <b>TowerHead</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="towerHead"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="towerHead"
                      title="enter towerHead"
                      defaultValue={client.towerHead}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="towerLead">
                      <b>TowerLead</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="towerLead"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="towerLead"
                      title="enter towerLead"
                      defaultValue={client.towerLead}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="recruiter">
                      <b>Recruiter</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="recruiter"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="recruiter"
                      title="enter recruiter"
                      defaultValue={client.recruiter}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ClientLastWorkingDate">
                      <b>ClientLastWorkingDate</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientLastWorkingDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientLastWorkingDate "
                      title="enter clientLastWorkingDate "
                      defaultValue={client.clientLastWorkingDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lancesoftLastWorkingDate">
                      <b>LancesoftLastWorkingDate</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="lancesoftLastWorkingDate "
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="lancesoftLastWorkingDate "
                      title="enter lancesoftLastWorkingDate "
                      defaultValue={client.lancesoftLastWorkingDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Client Tenure</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="clientTenure"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="clientTenure"
                      title="enter clientTenure"
                      defaultValue={client.clientTenure}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>Total Billing at Client</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="totalEarningAtclient"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalEarningAtclient"
                      title="enter Total Client billing"
                      defaultValue={client.totalEarningAtclient}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="povalue">
                      <b>Povalue</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="povalue"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="povalue"
                      title="enter povalue"
                      defaultValue={client.povalue}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ponumber">
                      <b>PONUMBER</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="ponumber"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="ponumber"
                      title="enter ponumber"
                      defaultValue={client.ponumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>IGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="igst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="igst"
                      title="enter igst number"
                      defaultValue={client.igst}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="cgst">
                      <b>CGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="cgst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="cgst"
                      title="enter cgst number"
                      defaultValue={client.cgst}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalEarningAtclient">
                      <b>SGST</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="sgst"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="sgst"
                      title="enter sgst number"
                      defaultValue={client.sgst}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="totalTax">
                      <b>TotalTax</b>
                    </Form.Label>
                    <Form.Control
                      // required
                      id="totalTax"
                      type="text"
                      disabled={disabled ? "" : "disabled"}
                      placeholder=""
                      name="totalTax"
                      title="enter totalTax"
                      defaultValue={client.totalTax}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              ))}
            </Row>
          </Form>
        )}
      </div>
    </>
  );
}
export default EmployeeProfile;

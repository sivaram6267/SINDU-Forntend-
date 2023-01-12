import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

function AbscondEmployee() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState(false);
  const [status, setStatus] = useState(false);
  const [empTypes, setEmpTypes] = useState([]);
  const [desgs, setDesgs] = useState(null);
  const [msg, setMsg] = useState("");
  const [selemp, setSelemp] = useState(null);
  const [assignEmp, setAssignemp] = useState(null);
  const [reportsto, setReportsto] = useState(null);
  const [assignid, setAssignid] = useState(null);
  const [abscondemp, setAbscondemp] = useState(null);
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    let type = sessionStorage.getItem("type");
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });

    //  if (type === "hr") {
    //   ApiService.getAllEmployees(value)
    //     .then((res) => {
    //       console.log(res.data);
    //       setAbscondemp(res.data);
    //       setMsg("");
    //     })
    //     .catch((error) => {
    //       // console.log(error);
    //       alert(JSON.stringify(error));
    //       setMsg(
    //         error.response.data.errorMessage
    //           ? error.response.data.errorMessage
    //           : error.message
    //       );
    //     });
    //  }
    if (type === "hr" && name === "Designationid") {
      ApiService.getAllEmployees1(value)
        .then((res) => {
          console.log(res.data);
          setAbscondemp(res.data);
        })

        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
    //};
  };
  const handleSelectEmployee = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSelemp(value);
    // setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    console.log(data);
    // setErrors(false);
    ApiService.abscondEmp(data.releasedDate, selemp)
      .then((res) => {
        console.log(res.data);
        alert("absconded successfully ");
        navigate("/hr");
        setStatus(false);
        // setErrors(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setStatus(false);
        // setErrors(true);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  // useEffect(() => {
  //   ApiService.getDesignations()
  //     .then((res) => {
  //       //  console.log(res.data);
  //       setDesgs(res.data);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // }, []);

  useEffect(() => {
    //api1
    ApiService.getDesignations()
      .then((res) => {
        //  console.log(res.data);
        setDesgs(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
    //
  };
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Abscond Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="chooseDesignation">
            Choose designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="chooseDesignation"
            aria-label="employee Type"
            className="selectInput"
            name="Designationid"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {desgs?.map((type) => (
              <option key={type.desgNames} value={type.desgId}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectEmp">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="SelectEmp"
            aria-label="employee Type"
            className="selectInput"
            name="selectEmp"
            required
            onChange={handleSelectEmployee}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {abscondemp?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" width="50px">
          <Form.Label htmlFor="releaseDate">
            <b>Released Date</b>
          </Form.Label>
          <Form.Control
            required={true}
            id="releaseDate"
            type="date"
            placeholder="Enter releaseDate"
            name="releasedDate"
            title="enter releaseDate"
            defaultValue={data.releaseDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          submit
        </Button>{" "}
        <Button variant="danger" onClick={handleCancel} className="px-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default AbscondEmployee;

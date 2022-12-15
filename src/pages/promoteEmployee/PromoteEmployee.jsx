import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

function PromoteEmployee() {
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
  const [empIDs, setEmpIDs] = useState(null);
  const [secondarypromote, setSecondarypromote] = useState(null);

  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    //console.log(value);
    if (name === "Designationid" && value !== "") {
      ApiService.selectEmployee(value)
        .then((res) => {
          //console.log(res.data);
          setSelemp(res.data);
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

    if (name === "selectEmp" && value !== "") {
      setEmpIDs(value);
      // ApiService.AssignTo(value)
      //   .then((res) => {
      //     // console.log(res.data);
      //     setAssignemp(res.data);
      //   })

      //   .catch((error) => {
      //     alert(JSON.stringify(error));
      //     setMsg(
      //       error.response.data.errorMessage
      //         ? error.response.data.errorMessage
      //         : error.message
      //     );
      //   });

      ApiService.ReportsTo(value) //primary manager
        .then((res) => {
          console.log(res.data);
          setReportsto(res.data);
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
    if (name === "reportsTo" && value !== "") {
      console.log(value);

      ApiService.secondarymanagerpromote(empIDs, value)
        .then((res) => {
          console.log(res.data);
          setSecondarypromote(res.data);
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    console.log(data);
    // ApiService.AssignEmp(data.selectEmp, data.AssignTo)
    //   .then((res) => {
    //     console.log(res);
    //     alert("assignemp is successfully ");
    //     setMsg("");

    if (data.salary === undefined) data.salary = 0;
    if (data.secondarymanager === undefined) data.secondarymanager = null;
    ApiService.promoteEmp(
      data.selectEmp,
      data.reportsTo,
      data.secondarymanager,
      data.salary
    )
      .then((res) => {
        console.log(res);
        alert("promte emp is successfully");
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

  // .catch((error) => {
  //   alert(JSON.stringify(error));
  //   setMsg(
  //     error.response.data.errorMessage
  //       ? error.response.data.errorMessage
  //       : error.message
  //   );
  // });
  // };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  useEffect(() => {
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

  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Promote Employee</h1>
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
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {selemp?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">Salary</Form.Label>
          <Form.Control
            name="salary"
            id="salary"
            // required
            type="number"
            placeholder="Enter salary"
            defaultValue={data.salary}
            onChange={handleChange}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="AssignEmp">
            Assign To
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="AssignEmp"
            aria-label="employee Type"
            className="selectInput"
            name="AssignTo"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
       
            {assignEmp?.map((type) => (
              <option key={type.typeName} value={type.lancesoft}>
                {type.firstName} {type.lastName}
                {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group> */}
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="reportsTo">
            Primary Reports To
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            id="reportsTo"
            aria-label="employee Type"
            className="selectInput"
            name="reportsTo"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {reportsto?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="reportsTo">
            secondary ReportsTo
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            id="secondarymanager"
            aria-label="employee Type"
            className="selectInput"
            name="secondarymanager"
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {secondarypromote?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          submit
        </Button>{" "}
        <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default PromoteEmployee;

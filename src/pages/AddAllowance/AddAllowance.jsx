import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./AddAllowance.css";
function AddAllowance() {
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
    // e.preventDefault();
    // e.target.reset();
    console.log(name);
    setData({ ...data, [name]: value });
    console.log(value);
    if (name === "Designationid" && value !== "") {
      ApiService.selectEmployee(value) //select employee
        .then((res) => {
          console.log(res.data);
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
  };
  //     if (name === "selectEmp" && value !== "") {
  //       console.log("hi");
  //       setEmpIDs(value);
  //       ApiService.ReportsTo(value) //primary manager
  //         .then((res) => {
  //           console.log(res.data);
  //           setReportsto(res.data);
  //         })
  //         .catch((error) => {
  //           alert(JSON.stringify(error));
  //           setMsg(
  //             error.response.data.errorMessage
  //               ? error.response.data.errorMessage
  //               : error.message
  //           );
  //         });
  //     }
  //     if (name === "reportsTo" && value !== "") {
  //       console.log(value);

  //       ApiService.secondarymanagerpromote(empIDs, value) //secondary manager
  //         .then((res) => {
  //           console.log(res.data);
  //           setSecondarypromote(res.data);
  //         })
  //         .catch((error) => {
  //           alert(JSON.stringify(error));
  //           setMsg(
  //             error.response.data.errorMessage
  //               ? error.response.data.errorMessage
  //               : error.message
  //           );
  //         });
  //     }
  //   };
  // const handleSubmit = (e) => {
  //   setStatus(true);
  //   console.log(data);
  //   const { name, value } = e.target;
  //   // e.preventDefault();
  //   // e.target.reset();
  //   console.log(name);
  //   setData({ ...data, [name]: value });
  //   console.log(data);
  //   ApiService.AddAllowance(data)
  //     .then((res) => {
  //       e.preventDefault();
  //       e.target.reset();
  //       console.log(res.data);
  //       alert("update salary  successfully");
  //       navigate("/hr");
  //     })
  //     .catch((error) => {
  //       alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // };
  if (data.ShiftAllowance === undefined) data.ShiftAllowance = 0;
  if (data.SpecialAllowance === undefined) data.SpecialAllowance = 0;
  if (data.JoiningBonus === undefined) data.JoiningBonus = 0;
  if (data.BonusApplicable === undefined) data.BonusApplicable = 0;
  const handleSubmit = (e) => {
    setStatus(true);
    console.log(data);
    const { name, value } = e.target;
    // e.preventDefault();
    // e.target.reset();
    console.log(name);
    setData({ ...data, [name]: value });
    console.log(data);
    ApiService.AddAllowance(
      data.ShiftAllowance,
      data.SpecialAllowance,
      data.JoiningBonus,
      data.BonusApplicable,
      data.selectEmp
    )
      .then((res) => {
        // e.preventDefault();
        // e.target.reset();
        console.log(res);
        alert("data inserted");
        navigate("/hr");
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

  // };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };

  useEffect(() => {
    ApiService.getDesignations() //choose designation
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
      <h1 className="title text-center">Add Allowance</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="chooseDesignation">
            Select Designation
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
          <Form.Label htmlFor="salary">Shift Allowance</Form.Label>
          <Form.Control
            name="ShiftAllowance"
            id="ShiftAllowance"
            type="number"
            placeholder=""
            //defaultValue={data.ShiftAllowance}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="salary">Special Allowance</Form.Label>
          <Form.Control
            name="Special Allowance"
            id="SpecialAllowance"
            type="number"
            placeholder=""
            //defaultValue={data.salary}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="groove">
          <Form.Group className="mb-3 px-2 text-danger">
            <Form.Label htmlFor="salary">Joining Bonus</Form.Label>
            <Form.Control
              name="JoiningBonus"
              id="JoiningBonus"
              variant="danger"
              type="number"
              placeholder=""
              //defaultValue={data.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 px-2 text-danger">
            <Form.Label htmlFor="salary" className="danger">
              Bonus Applicable(Tenure)
            </Form.Label>
            <Form.Control
              name="BonusApplicable"
              id="BonusApplicable"
              type="number"
              className="danger"
              placeholder=""
              //defaultValue={data.salary}
              onChange={handleChange}
            />
          </Form.Group>
        </div>{" "}
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
        </Form.Group> */}{" "}
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

export default AddAllowance;

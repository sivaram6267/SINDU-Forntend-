import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/ApiService";
import { FormInputs } from "../../components/formInputs/FormInputs";

function Recruiter() {
  const [status, setStatus] = useState(false);
  const [desgination, setDesgination] = useState(null);
  const [data, setData] = useState({});
  const [emp, setEmp] = useState(null);
  const [deleteto, setDeleteto] = useState(null);
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState(false);
  const [hiring, setHiring] = useState(null);
  const [desgs, setDesgs] = useState(null);
  const [selemp, setSelemp] = useState(null);
  const [clientname, SetClientname] = useState(null);
  const [assignname, SetAssignname] = useState(null);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  let type = sessionStorage.getItem("type");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
    // if (name === "clientname" && value !== "") {
    //   ApiService.clientnames(name) //get client names dropdowm
    //     .then((res) => {
    //       console.log(res.data);
    //       SetClientname(res.data);
    //     })

    //     .catch((error) => {
    //       alert(JSON.stringify(error));
    //       setMsg(
    //         error.response.data.errorMessage
    //           ? error.response.data.errorMessage
    //           : error.message
    //       );
    //     });
    // }
    // if (name === "selectEmployeeprom" && value !== "") {

    // }
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   navigate(`/${type}`);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setStatus(true);
  //   if (type === "manager") {
  //     // setErrors(false);
  //     ApiService.jobstringsubmit(
  //       {
  //         budget: "",
  //         closeDate: "",
  //         jd: " ",
  //         openDate: "",
  //         ticketStatus: "",
  //         totalPosition: "",
  //       },
  //       file
  //     )
  //       .then((res) => {
  //         console.log(data);
  //         // alert("successfull");
  //         navigate(`/${type}`);
  //         setStatus(false);
  //         setMsg("");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setStatus(true);
  //         setErrors(false);
  //         // alert(JSON.stringify(error));
  //         setMsg(
  //           error.response.data.errorMessage
  //             ? error.response.data.errorMessage
  //             : error.message
  //         );
  //       });
  //   }
  // };
  // const handleok = (e) => {
  //   e.preventDefault();
  //   setStatus(true);
  //   // setErrors(false);
  //   ApiService.deleteEmployeefor(data.selectEmp)
  //     .then((res) => {
  //       console.log(res.data);
  //       // alert("successfull");
  //       navigate(`/${type}`);
  //       setStatus(false);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setStatus(true);
  //       setErrors(false);
  //       // alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // };

  // useEffect(() => {
  //   ApiService.HiringType()
  //     .then((res) => {
  //       //  console.log(res.data);
  //       setHiring(res.data);
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
  //   ApiService.clientnames() //get client names dropdowm
  //     .then((res) => {
  //       console.log(res.data);
  //       SetClientname(res.data);
  //     })

  //     .catch((error) => {
  //       alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  //   if (type === "manager") {
  //     ApiService.AssignName()
  //       .then((res) => {
  //         console.log(res.data);
  //         SetAssignname(res.data);
  //       })
  //       .catch((error) => {
  //         alert(JSON.stringify(error));
  //         setMsg(
  //           error.response.data.errorMessage
  //             ? error.response.data.errorMessage
  //             : error.message
  //         );
  //       });
  //   }
  // }, []);

  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Recruiter Module</h1>
      <Form>
        <div className="mb-3">
          <label htmlFor="email">Job Description </label>
          <textarea
            className="form-control"
            placeholder="text"
            type="text"
            name="job description"
            noValidate
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Budget</label>
          <input
            className="form-control"
            placeholder="Enter Budget"
            type=""
            name="text"
            noValidate
          />
        </div>
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Hiring Type
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          <Form.Select
            id="Hiring"
            aria-label="employee Type"
            className="selectInput"
            name="HiringType"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {hiring?.map((type) => (
              <option key={type.desgNames} value={type.typeName}>
                {type.typeName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mb-3">
          <label htmlFor="email">No of position </label>
          <input
            className="form-control"
            placeholder="Enter Budget"
            type=""
            name="text"
            noValidate
          />
        </div>
        <div>Postion Open</div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="firstName">Start Date</label>
            <input
              className="form-control"
              placeholder="First Name"
              type="date"
              name="firstName"
              noValidate
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName">End Date</label>
            <input
              className="form-control"
              placeholder="Last Name"
              type="date"
              name="lastName"
              noValidate
            />
          </div>
        </div>
        <br />
        <FormInputs
          id="pdfFile"
          title="Sample Resume"
          name="resume"
          type="file"
          required={true}
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
            setFile(e.target.files[0]);
            // setData({
            //   ...data,
            //   masterEmployeeDetails: {
            //     ...data.masterEmployeeDetails,
            //     dob: e.target.value,
          }}
        />
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Client Name
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          <Form.Select
            id="clientname"
            aria-label="employee Type"
            className="selectInput"
            name="clientname"
            // required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {clientname?.map((type) => (
              <option key={type.desgNames} value={type.desgId}>
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="email">Job Description </label>
          <input
            className="form-control"
            placeholder="text"
            type=""
            name="email"
            noValidate
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="chooseDesignation">
            Assign Name
            <nobr />
            <span className="text-danger"> *</span>
          </label>
          <Form.Select
            id="chooseDesignation"
            aria-label="employee Type"
            className="selectInput"
            name="Designationid"
            // required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {assignname?.map((type) => (
              <option key={type.desgNames} value={type.desgId}>
                {type.empId} {type.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <Button variant="primary" type="submit" onClick={handleShow}>
          send
        </Button>{" "}
      </Form>

      {status && (
        <p className="text-success mb-2">
          Please wait while we are processing your request.
        </p>
      )}
    </div>
  );
}
export default Recruiter;

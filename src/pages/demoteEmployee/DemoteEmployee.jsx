import React, { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

import { Button, Form } from "react-bootstrap";
function DemoteEmployee () {
    const [status,setStatus] = useState(false);
    const [desgs,setDesgs] = useState(null);
    const [emp,setEmp] = useState(null);
    const [desgination, setDesgination] = useState(null);
    const [demoteto, setDemotesto]  = useState(null);
    const [demoteto1, setDemotesto1]  = useState(null);
    const [data,setData]=useState({});
    const [msg,setMsg] = useState("")


    const navigate = useNavigate();
    let type = sessionStorage.getItem("type");
    const handleChange = (e) => {
        const{name, value}=e.target;
        setData({ ...data, [name]: value});
        if(name === "Designationid" && value !== "") {
          ApiService.getAllDesignationEmployees(value) //get all employeess for selected designation
          .then((res) => {
            console.log(res.data);
            setDesgination(res.data);
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
       console.log(value);
       setEmp(value);
        ApiService.addSupervisor(value)
          .then((res) => {
            console.log(res.data);
            setDemotesto(res.data);
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
        console.log(emp, value);
        // if (data.addSecondarySupervisor === undefined) data.addSecondarySupervisor = 0;
         ApiService.addSecondarySupervisor(emp, value)
           .then((res) => {
             console.log(res.data);
             setDemotesto1(res.data);
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
            if (data.addSecondarySupervisor === undefined) data.addSecondarySupervisor = null;
            ApiService.demoteEmp(data.selectEmp, data.reportsTo, data.addSecondarySupervisor, data.salary)
              .then((res) => {
                console.log(res);
                alert("Demote emp is successfully");
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

          const handleCancel = (e) => {
            e.preventDefault();
            navigate(`/${type}`);
          };


// useEffect (() => {
//     ApiService.getAllDemoteDesignation()
//     .then((res) => {
//       console.log(res.data);
//         setDesgs(res.data);
//         setMsg("");
//     })
//     .catch((error) => {
//         alert(JSON.stringify(error));
//         setMsg(
//           error.response.data.errorMessage
//             ? error.response.data.errorMessage
//             : error.message
//         );
//     });
// },[]);

useEffect(() => {
  ApiService.getAllDemoteDesignation()
    .then((res) => {
      console.log(res.data)
      setDesgs(res.data)
      setMsg("")
    })
    .catch((error) => {
      // console.log(error);
      alert(JSON.stringify(error))
      setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
    })
}, [])




return (
    <div id="add-employee" className="container-sm">
        <h1 className="title text-center">Demote Employee</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="chooseDesignation">
            Present Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          {/* <Form.Select
            id="chooseDesignation"
            aria-label="employee Type"
            className="selectInput"
            name="Designationid"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
     
            {desgs?.map((type) => (
              <option key={type.desgNames} value={type.desgId}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select> */}
         < Form.Select id="empTypeId" aria-label="employee Type" className="selectInput" name="Designationid" onChange={handleChange}>
              <option value="">{status ? "loading" : "select "}</option>

              {desgs?.map((type) => (
                <option key={type.typeName} value={type.desgId}>
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
            {desgination?.map((type) => (
              <option key={type.empId} value={type.lancesoft }>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="reportsTo">
           New Primary Manager 
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
            {demoteto?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="secondManager">
           New Secondary Manager
            <nobr />
            {/* <span className="text-danger"> *</span> */}
          </Form.Label>
          <Form.Select
            id="secondManager"
            aria-label="employee Type"
            className="selectInput"
            name="secondManager"
           
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {demoteto1?.map((type) => (
              <option key={type.empId} value={type.lancesoft}>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
                         <Form.Group className="mb-3 px-2">
                            <Form.Label htmlFor="salary">
                                    Salary
                            </Form.Label>
                            <Form.Control
                            name="salary"
                            id="salary"
                            type="number"
                            placeholder="Enter salary"
                            defaultValue={data.salary}
                              onChange={handleChange}
                           />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>{" "}
                            <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
                            </Form>
                            </div>
  )
}


export default DemoteEmployee;

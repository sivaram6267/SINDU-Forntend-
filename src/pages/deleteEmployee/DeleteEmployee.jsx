import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";


function DeleteEmployee(){
    const [status,setStatus] = useState(false);
    const [desgination , setDesgination] =useState(null);
    const[data,setData] =useState({});
    const[emp,setEmp]=useState(null)
    const[deleteto , setDeleteto]=useState(null)
    const[msg,setMsg]=useState(null);
    const[desgs,setDesgs]=useState(null);
    const[selemp , setSelemp]=useState(null);
const navigate = useNavigate();
    let type = sessionStorage.getItem("type");
    const handleChange = (e) => {
        const{name, value}=e.target;
        setData({ ...data, [name]: value});
        if(name === "Designationid" && value !== "") {
          ApiService.ShowEmployeesToDelete(value) //get all employeess for selected designation
          .then((res) => {
            console.log(res.data);
            setDeleteto(res.data);
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
    }
     
      const handleDelete = (e) => {
        e.preventDefault();
        navigate(`/${type}`);
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        
        const{name, value}=e.target;
        setData({ ...data, [name]: value});
        console.log(data.selectEmp);
        ApiService.deleteEmployee(data.selectEmp)
          .then((res) => {
            console.log(res);
            alert("delete emp is successfully");
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

    
  
      useEffect(() => {
        ApiService.DesinationsForDeleteModule()
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
    
 return(
  <div id="add-employee" className="container-sm ">
  <h1 className="title text-center">Delete Employee</h1>
  <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3 px-2">
      <Form.Label htmlFor="chooseDesignation">
        Present Designation
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
        {deleteto?.map((type) => (
          <option key={type.empId} value={type.lancesoft}>
            {type.lancesoft}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
    <Button variant="primary" type="submit">
          submit
        </Button>{" "}
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
  </Form>
</div>
);
}
export default DeleteEmployee;

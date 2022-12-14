import React, {  useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";


function DeleteEmployee(){
    const [status,setStatus] = useState(false);
    const [desgination , setDesgination] =useState(null);
    const[data,setData] =useState({});
    const[emp,setEmp]=useState(null)
    const[deleteto , setDeleteto]=useState(null)
    const[msg,setMsg]=useState(null);

const navigate = useNavigate();
let type =sessionStorage.getItem("type");
const handleChange = (e) =>{
    const{name , value} = e.target;
    setData({...data , [name]:value});
    if (name === "selectEmp" && value !== "") {
        console.log(value);
        setEmp(value);
         ApiService.DeleteEmployee(value)
           .then((res) => {
             console.log(res.data);
             setDeleteto(res.data);
             alert("Delete emp is successfully");
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
 return(
        <div id="add-employee" className="container-sm">
            <h1 className="title text-center">Delete Employee</h1>
            <Form >
                <Form.Group className="mb=3 px-2">
                    <Form.Label htmlFor="selectEmp">
                        selectEmployee
                        <nobr />
                        <span className="text-danger">*</span>
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
              <option key={type.empId} value={type.lancesoft }>
                {type.firstName} {type.lastName} {type.lancesoft}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        </Form>
         </div>
    )

}
export default DeleteEmployee;

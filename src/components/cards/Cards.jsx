import React, { Fragment, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModelComponent from "../../modelComponent/ModelComponent";
import "./cards.css";
import ApiService from "../../services/ApiService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Cards(props) {
  let type = sessionStorage.getItem("type");
  // console.log(props.data);
  const [status, setStatus] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  // const [view, setView] = useState();
  // const [data, setData] = useState({});
  // const navigate = useNavigate();

  const handleClick = (id) => {
    setSubEmpId(id);
    setSubEmp(true);
    setModalShow(true);
  };
  const handleView = (e) => {
    e.preventDefault();
    setViewEmployee(!viewEmployee);
    ApiService.getUnderEmployee(props.data.empId)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnClick = () => {
    console.log(props.data.empId);
    setModalShow(true);
    setSubEmpId("");
    setSubEmp(false);
    // ApiService.getEmployeeById(props.data.id)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };




  
  const showStatus = (status) =>{
    if(status == "BENCH"){
  return{'backgroundColor':'#FFEB3B',color:'#000','padding-left':"10px",'padding-right':"10px"}
  }else if(status == "CLIENT"){
    return{'backgroundColor':'#66BB6A',color:'#000','padding-left':"10px",'padding-right':"10px" }
  }
  else if(status =="MANAGMENT" ){
    return{'backgroundColor': '#424242',color:'#ffffff','padding-left':"10px",'padding-right':"10px"}
  }
  else if(status == 'ABSCONDED')
  {
  return{'backgroundColor':'#F6C3CC', color:'#ffffff','padding-left':"10px",'padding-right':"10px"}
  }
  else if(status ==  'RELEASED')
  {
  return{'backgroundColor':'##F6C3CC','padding-left':"10px",'padding-right':"10px"}
  }
  else if(status == 'TERMINATED')
  {
  return{'backgroundColor':'#F6C3CC','padding-left':"10px",'padding-right':"10px"}
  }
  else if(status == 'EXIT')
  {
  return{'backgroundColor':'#EF5350',color:'#000','padding-left':"10px",'padding-right':"10px"}
  } 
  }

  return (
    <>
      <ModelComponent
        data={subEmp ? subEmpId : props?.data?.empId}
        type={type}
        show={modalShow}
        // view={view}
        onHide={() => {
          setModalShow(false);
          // setData({});
        }}
      />

 
 {/* <Link to="/hr/editEmployee" state={{ empId: props?.data?.empId, name: "" }}> */}
 <Link to="/hr/EmployeeProfile" state={{ empId: props?.data?.empId, type: type }} style={{ textDecoration: 'none' }}>
<div className="employee-card" >
   <img src={props?.data?.photo} alt="Profile Photo"/>
  <div className="info">
    <h2>{props?.data?.employeeName}</h2>
    <span style= {showStatus(props?.data?.status)}>  {props?.data?.status}</span>
    <p> {props?.data?.lancesoftId}</p>
    <p>{props?.data?.designation}</p>
  </div>
  <div className="manager primary">
  
    <div className="name">{props?.data?.managerName	} </div> &nbsp; 
    <div className="title" >Primary Manager</div>
    {/* <div class="title">{props?.data?.managerName	}</div> */}
  </div>
  <div className="manager secondary">
    <div className="name">{props?.data?.subordinateManagerName	} </div> &nbsp;
    <div className="title"> Secondary Manager</div>
  </div>
</div>

</Link>






      {/* <Card className="card-template">
        <Card.Img
          
          className="card-image"
          src={props?.data?.photo}
        />
        
          {/* Profile Photo&emsp; {props?.data?.ProfilePhoto}<br/>   */}
        {/* <Card.Body>
          <Card.Title> Name:&emsp;{props?.data?.employeeName}</Card.Title>  
          <Card.Text>
       
            LancesoftId: &emsp; {props?.data?.	lancesoftId} <br /> 
            
            {/* {props?.data?.firstName} {props?.data?.lastName} <br /> */}
            {/* Profile Photo:&emsp; {props?.data?.ProfilePhoto}<br/> */}
            {/* Designation:&emsp; {props?.data?.designation}<br/>
            Status:&emsp; {props?.data?.status} <br />
            Primary Manager	:&emsp; {props?.data?.managerName	} <br />
            Secondary Manager	:&emsp; {props?.data?.subordinateManagerName	} <br /> */}
            {/* Edit	:&emsp; {props?.data?.Edit	} <br />
            View	:&emsp; {props?.data?.View	} <br /> */}
          {/* </Card.Text> */}
        
          {/* {props?.data?.button === "Exit" ? ( 
            status ? (
              <>
                <Button
                  className="card-btn"
                  // onClick={() => setStatus()}
                >
                  Request
                </Button>{" "}
                <Button
                  variant="danger"
                  // className="card-btn"
                  // onClick={() => setStatus(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button className="card-btn" onClick={() => setStatus(true)}>
                Exit
              </Button>
            )
          ) : (
            <>
              <Button
                className="card-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnClick(props.data);
                  console.log(props.data);
                }}
              >
                View
              </Button>{" "}
              {["View Employees"].includes(props.button2) && (
                <Button className="card-btn" onClick={handleView}>
                  {viewEmployee ? "Hide" : "View Employees"}
                </Button>
              )}
              {viewEmployee &&
                ["manager", "general_manager", "ch", "md"].includes(type) && (
                  <>
                    {!subEmp && employee?.length === 0 && (
                      <span className="employees">
                        <br />
                        No Employees
                      </span>
                    )}
                    {employee?.map((emp, index) => (
                      <Fragment key={index}>
                        <span
                          className="employees"
                          onClick={() => handleClick(emp.empId)}
                        >
                          {index + 1}.{" "}
                          <nobr>
                            {emp.firstName}
                            {emp.lastName}
                          </nobr>
                        </span>

                        <br />
                      </Fragment>
                    ))}
                  </> */}
                {/* )} */}
              {/* <div>
                <span className="employees" onClick={() => handleClick(1)}>
                  1. associate1
                </span>
                <br />
                <span className="employees" onClick={() => handleClick(2)}>
                  2. associate2
                </span>
                <br />
                <span className="employees" onClick={() => handleClick(3)}>
                  3. associate3
                </span>
              </div> */}
            </>
           )}
        {/* </Card.Body>  */}
      {/* </Card> */}
    // </>
  {/* );  */}
{/* } */}

export default Cards;

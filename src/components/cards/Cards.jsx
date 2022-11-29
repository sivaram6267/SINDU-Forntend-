import React, { Fragment, useState } from "react";
import { Button, Card } from "react-bootstrap";
// import ApiService from "../../services/ApiService";
// import { useNavigate } from "react-router-dom";
import ModelComponent from "../model/ModelComponent";
import "./cards.css";
import ApiService from "../../services/ApiService";
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

  return (
    <>
      <ModelComponent
        data={subEmp ? subEmpId : props.data.empId}
        type={type}
        show={modalShow}
        // view={view}
        onHide={() => {
          setModalShow(false);
          // setData({});
        }}
      />
      <Card className="card-template">
        <Card.Img
          variant="top"
          className="card-image"
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1655897437~exp=1655898037~hmac=b3cc634fd5e10bbc789099f7b0330132746d548d90a0bf505440d33dc444afa7&w=740"
        />
        <Card.Body>
          <Card.Title>{props.data.lancesoft}</Card.Title>
          <Card.Text>
            EmployeeId: &emsp; {props.data.lancesoft} <br /> Employee
            Name:&emsp;
            {props.data.firstName} {props.data.lastName} <br />
            Email:&emsp; {props.data.email}
          </Card.Text>
          {props.data?.button === "Exit" ? (
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
                  onClick={() => setStatus(false)}
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
                  </>
                )}
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
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;

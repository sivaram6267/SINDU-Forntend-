// import React, { useEffect } from "react";
// import Cards from "../../components/cards/Cards";
import Dashboard from "../dashboard/Dashboard";
// import ApiService from "../../services/ApiService";

function MD() {
  // const [status, setStatus] = React.useState(false);
  // const [employees, setEmployees] = React.useState([]);
  // const [msg, setMsg] = React.useState("Loading....");
  // useEffect(() => {
  //   setStatus(false);
  //   // eslint-disable-line

  //   ApiService.getAllEmployees()
  //     .then((res) => {
  //       // console.log(res.data);
  //       setEmployees(res.data);
  //       setStatus(true);
  //     })
  //     .catch((error) => {
  //       setStatus(false);
  //       console.log(error);
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // }, []);

  return (
    <Dashboard />
    // <div className="lead">
    //   {status ? (
    //     employees.map((employee) => (
    //       <Cards
    //         key={employee.empId}
    //         data={employee}
    //         button="View profile"
    //         button2="View Employees"
    //         type="manager"
    //       />
    //     ))
    //   ) : (
    //     <p className="text-danger mb-1">{msg}</p>
    //   )}
    // </div>
  );
}

export default MD;

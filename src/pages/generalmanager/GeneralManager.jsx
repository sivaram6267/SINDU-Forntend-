import Dashboard from "../dashboard/Dashboard";
import ApiService from "../../services/ApiService";
import { useState } from "react";

export function GeneralManager() {
  const [msg, setMsg] = useState();

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

  // ApiService.GetAllEmployesby()
  //   .then((res) => {
  //     // console.log(type);
  //     // setData(res.data);
  //     // AssignData(res.data);
  //     // setStatus(true);
  //   })

  //   .catch((error) => {
  //     alert(JSON.stringify(error));
  //     setMsg(
  //       error.response.data.errorMessage
  //         ? error.response.data.errorMessage
  //         : error.message
  //     );
  //   });

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

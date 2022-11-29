// import React, { useState } from "react";
// import { useEffect } from "react";
// import Cards from "../../components/cards/Cards";
import DataTable from "../../components/dataTable/DataTable";

// import ApiService from "../../services/ApiService";
import "./dashboard.css";
const Dashboard = () => {
  // const [status, setStatus] = React.useState(false);
  // const [employees, setEmployees] = React.useState([]);
  // const [msg, setMsg] = useState("Loading....");
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
    <div className="dashboard container-sm">
      {/* <input
        type="search"
        id="search"
        name="search"
        placeholder="search employee"
      /> */}
      <DataTable />
      {/* {status ? (
        employees.map((data, index) => <Cards key={index} data={data} />)
      ) : (
        <p className="text-danger mb-1">{msg}</p>

      )} */}
    </div>
  );
};

export default Dashboard;

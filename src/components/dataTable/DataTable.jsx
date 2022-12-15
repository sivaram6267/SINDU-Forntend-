import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmployeeProfile from "../../pages/employeeProfile/EmployeeProfile";
 import ModelComponent from "../../modelComponent/ModelComponent";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import { padding } from "@mui/system";

import Card from "react-bootstrap/Card";

export default function DataTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [EditModalShow, setEditModalShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState();
  const [msg, setMsg] = useState();

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
    setPage(newPage);
    console.log(newPage);
  };
  let pid = sessionStorage.getItem("pid");

  let type = sessionStorage.getItem("type");
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPageNumber(0);
    console.log("rowsperPage");
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },

    { id: "lsiId", label: "Lancesoft Id", minWidth: 100 },

    { id: "profilePic", label: "Profile Photo", minWidth: 100 },

    { id: "designation", label: "Designation", minWidth: 120 }, // format: (value) => value.toLocaleString("en-US"),

    { id: "manager", label: "Primary Manager", minWidth: 170 },

    // { id: "status", label: "status", minWidth: 170 },
    {
      id: "SecondaryManager",
      label: "Secondary Manager",
      minWidth: 170,
    },

    { id: "view", label: "View", minWidth: 50 },
    { id: "edit", label: "Edit", minWidth: 50 },

    // format: (value) => value.toLocaleString("en-US"),

    //   {
    //     id: "density",
    //     label: "Density",
    //     minWidth: 170,
    //     align: "right",
    //     format: (value) => value.toFixed(2),
    //   },
  ];

  function createData(
    name,
    lsiId,
    profilePic,
    designation,
    manager,
    SecondaryManager,
    view,
    edit
  ) {
    //   const density = population / size;
    return {
      name,
      lsiId,
      profilePic,
      designation,
      manager,
      SecondaryManager,
      view,
      edit,
    };
  }
  /*
  function createData(email, lastName, phoneNumber, firstName, view) {
    //   const density = population / size;
    return { email, lastName, phoneNumber, firstName, view }
  }*/

  const handleOnClick = (id) => {
    console.log("emp1");
    setModalShow(true);
    setSubEmpId(id);
    setSubEmp(true);
  };
  const handleOnClickEdit = (id) => {
    navigate("/hr/editEmployee", { state: { empId: id, name: "" } });
  };
 const handleOnClickView = (id) =>{
  //data={subEmp ? subEmpId : pid}
  //type={type}
  console.log(id, type);
   navigate("/hr/EmployeeProfile", { state: {empId: id , type: type }})

 }


  const navigate = useNavigate();
  // const handleCancel = (e) => {
  //   e.preventDefault()
  //   navigate(`/${type}`)
  // }
  let [rows, setRows] = useState([
    createData(
      "emp2",
      "34",
      "",
      "",
      "emp2@gmail.com",
      9596961,

      <Button
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleOnClick("emp1");
          console.log("emp1");
        }}
      >
        View
      </Button>,

      <Button
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleOnClickEdit("emp1");
        }}
      >
        Edit
      </Button>
    ),
  ]);

  const AssignsearchData = (items) => {
    let temp = [];

    // console.log(items.Employees)

    items?.map((item) => {
      temp.push(
        createData(
          //item.managerName,
          //item.lancesoftId,

          item.employeeName,
          item.lancesoftId,
          <div>
            <img src={item.photo} alt="Profile Photo" width="100px" />
          </div>,
          item.designation,
          item.managerName,
          item.subordinateManagerName,

          //item.designation,

          <Button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickView(item.empId);
              console.log(item.empId);
            }}
          >
            View
          </Button>,

          <Button
            variant="danger"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickEdit(item.empId);
              console.log(item.empId);
            }}
          >
            Edit
          </Button>
        )
      );
    });
    setRows(temp);
  };

  const AssignData = (items) => {
    let temp = [];

    // console.log(items.Employees)

    items.Employees?.map((item) => {
      temp.push(
        createData(
          item.employeeName,
          item.lancesoftId,
          <div>
            <img src={item.photo} alt="Profile Photo" width="100px" />
          </div>,
          item.designation,
          item.managerName,
          item.subordinateManagerName,

          <Button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickView(item.empId);
              console.log(item.empId);
            }}
          >
            View
          </Button>,

          <Button
            variant="danger"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickEdit(item.empId);
              console.log(item.empId);
            }}
          >
            Edit
          </Button>
        )
      );
    });
    setRows(temp);
  };

  useEffect(() => {
    if (type === "hr") {
      ApiService.GetAllEmployes(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setPageNumber(res.data.currentPage)
          // setPageSize()
        })
        .catch((err) => {
          alert(err.message);
          setStatus(false);
        });
    }

    if (type === "manager") {
      ApiService.GetAllEmployesby(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setGeneralassignEmp(res.data);
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
    if (type === "lead") {
      ApiService.GetAllEmployesby(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setGeneralassignEmp(res.data);
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
    if (type === "ch") {
      ApiService.GetAllEmployesby(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setGeneralassignEmp(res.data);
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
    if (type === "md") {
      ApiService.GetAllEmployesby(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setGeneralassignEmp(res.data);
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
    if (type === "general_manager") {
      ApiService.GetAllEmployesby(pageNumber, pageSize)
        .then((res) => {
          console.log(data);
          setData(res.data);
          AssignData(res.data);
          setStatus(true);
          // setPageNumber(res.data.currentPage)
          // setPageSize()
        })
        .catch((err) => {
          alert(err.message);
          setStatus(false);
        });
    }
  }, [pageNumber, pageSize]);

  // if (type === "manager") {
  //   ApiService.GetAllEmployesby()
  //     .then((res) => {
  //       console.log(type);
  //       setData(res.data);
  //       AssignData(res.data);
  //       setStatus(true);
  //       // setGeneralassignEmp(res.data);
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
  //   currentPage: 0
  // totalItems: 120
  // totalPage:12

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.SearchEmployees(search.search)
      .then((res) => {
        setData(res.data);
        AssignsearchData(res.data);
        setStatus(true);
      })
      .catch((error) => {
        setStatus(false);
        console.log(error);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...data, [name]: value });
  };

  return (
    <>
      {/* { <ModelComponent
        data={subEmp ? subEmpId : pid}
        type={type}
        show={modalShow}
        // view={view}
        onHide={() => {
          setModalShow(false);
          // setData({});
        }}
      /> } */}
      {/* { <EmployeeProfile
       data={subEmp ? subEmpId : pid}
       type={type}
       show={modalShow}
       // view={view}
       onHide={() => {
         setModalShow(false);
         // setData({});
       }}
     /> } */}

      <form id="searchForm" onSubmit={handleSubmit}>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Enter ID"
          onChange={handleChange}
        />
        <button type="submit" className="searchclick">
          Search
        </button>
      </form>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

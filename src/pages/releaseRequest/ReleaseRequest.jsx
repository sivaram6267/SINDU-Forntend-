import React, { Fragment, useState } from "react"
import { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"

function ReleaseRequest() {
  const [data, setData] = useState({})
  const [status, setStatus] = useState(true)
  const [msg, setMsg] = useState("")
  const [empTypes, setEmpTypes] = useState(null)
  const [Releasereq, setReleasereq] = useState(null)
  const [resp, setResp] = useState(null)
  const [assignresp, setAssignresp] = useState(null)

  const navigate = useNavigate()
  let type = sessionStorage.getItem("type")
  const handleCancel = (e) => {
    e.preventDefault()
    console.log("called")
    navigate(`/${type}`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    console.log(value)

    if (name === "Releaserequest") {
      ApiService.selectEmployeeAssign(value)
        .then((res) => {
          // console.log(res.data);
          setAssignresp(res.data)
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }

    //     ApiService.selectEmployeeAssign(value)
    //     .then((res) => {
    //       // console.log(res.data);
    //       setAssignresp(res.data);
    //     })
    //     .catch((error) => {
    //       alert(JSON.stringify(error));
    //       setMsg(
    //         error.response.data.errorMessage
    //           ? error.response.data.errorMessage
    //           : error.message
    //       );

    //     });

    // };
  }
  //      if(name==="Releaserequest"){
  //    ApiService.selectEmployeeReq(value)
  //        .then((res) => {
  //     console.log(res.data);
  //     setResp(res.data);

  //        })

  //      .catch((error) =>{
  //       alert(JSON.stringify(error));
  //       setMsg(
  //        error.response.data.errorMessage
  //            ? error.response.data.errorMessage
  //           : error.message
  //       );

  //       });
  //    }

  // };
  // useEffect(() => {
  //   ApiService.ReleaseEmp()
  //     .then((res) => {
  //      console.log(res.data);
  //      setReleaseemp(res.data);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       alert(JSON.stringify(error))
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // }, []);

  useEffect(() => {
    ApiService.selectEmployeeReq()
      .then((res) => {
        console.log(res.data)
        setResp(res.data)
        setMsg("")
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error))
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
  }, [])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setStatus(true);
  //   ApiService.ApproveEmployee(data.emp_id, data.emp_status)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("successfull");
  //       navigate("/hr");
  //       setStatus(false);
  //       // setErrors(false);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       // console.log(error)
  //       alert(JSON.stringify(error));
  //       setStatus(false);
  //       // setErrors(true);
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(false)
    console.log(data)
    if (type === "ch") {
      ApiService.ApproveEmployee(data.Releaserequest, status)
        .then((res) => {
          console.log(res)
          alert("succcessfull")
          setMsg("")
          // if (data.salary === undefined) data.salary = 0;
          // ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
          //   .then((res) => {
          //     console.log(res);
          //     alert("successfully complete");
          //   })

          //   .catch((error) => {
          //     alert(JSON.stringify(error));
          //     alert("mistake");
          //     setMsg(
          //       error.response.data.errorMessage
          //         ? error.response.data.errorMessage
          //         : error.message
          //     );
          //   });
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }
    if (type === "manager") {
      ApiService.ApproveEmployee(data.Releaserequest, status)
        .then((res) => {
          console.log(res)
          alert("succcessfull")
          setMsg("")
          // if (data.salary === undefined) data.salary = 0;
          ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
            .then((res) => {
              console.log(res)
              alert("successfully complete")
            })

            .catch((error) => {
              alert(JSON.stringify(error))
              alert("mistake")
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
            })
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }
    if (type === "lead") {
      ApiService.ApproveEmployee(data.Releaserequest, status)
        .then((res) => {
          console.log(res)
          alert("succcessfull")
          setMsg("")
          // if (data.salary === undefined) data.salary = 0;
          ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
            .then((res) => {
              console.log(res)
              alert("successfully complete")
            })

            .catch((error) => {
              alert(JSON.stringify(error))
              alert("mistake")
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
            })
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }

    if (type === "md") {
      ApiService.ApproveEmployee(data.Releaserequest, status)
        .then((res) => {
          console.log(res)
          alert("succcessfull")
          setMsg("")
          // if (data.salary === undefined) data.salary = 0;
          ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
            .then((res) => {
              console.log(res)
              alert("successfully complete")
            })

            .catch((error) => {
              alert(JSON.stringify(error))
              alert("mistake")
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
            })
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }
    if (type === "general_manager") {
      ApiService.ApproveEmployee(data.Releaserequest, status)
        .then((res) => {
          console.log(res)
          alert("succcessfull")
          setMsg("")
          // if (data.salary === undefined) data.salary = 0;
          ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
            .then((res) => {
              console.log(res)
              alert("successfully complete")
            })

            .catch((error) => {
              alert(JSON.stringify(error))
              alert("mistake")
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
            })
        })

        .catch((error) => {
          alert(JSON.stringify(error))
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }
    // ApiService.ApproveEmployee(data.Releaserequest, status)
    //   .then((res) => {
    //     console.log(res);
    //     alert("successfully");
    //   })

    //   .catch((error) => {
    //     alert(JSON.stringify(error));
    //     alert("mistake");
    //     setMsg(
    //       error.response.data.errorMessage
    //         ? error.response.data.errorMessage
    //         : error.message
    //     );
    //   });
    // ApiService.setsupervisior(data.Releaserequest, data.Releasereq)
    // .then((res) => {
    //   console.log(data);
    //   alert("successfully");
    // })

    // .catch((error) => {
    //   alert(JSON.stringify(error));
    //   alert("mistake");
    //   setMsg(
    //     error.response.data.errorMessage
    //       ? error.response.data.errorMessage
    //       : error.message
    //   );
    // });
  }
  // }
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Release request</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="AssignEmp">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select id="AssignEmp" aria-label="employee Type" className="selectInput" name="Releaserequest" required onChange={handleChange}>
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
            {resp?.map((type) => (
              <option key={type.desgNames} value={type.lancesoft}>
                {type.lancesoft}
                {type.firstName}
                {type.lancesoft}
                {type.status}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="AssignEmp">
            Assign To
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label> */}
        {/* <Form.Select
            id="AssignEmp"
            aria-label="employee Type"
            className="selectInput"
            name="Releasereq"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
        {/* {assignresp?.map((type) => (
              <option key={type.lancesoft} value={type.lancesoft}>
                {type.lancesoft}
              </option>
            ))}
          </Form.Select> */}
        {/* <Form.Select
            id="AssignEmp"
            aria-label="employee Type"
            className="selectInput"
            name="Releasereq"
            required
            onChange={handleChange}
          >
            <option value="">{status ? "loading" : "select "}</option>
            {/* <option value="1">N/A</option> */}
        {/* {assignresp?.map((type) => (
          <option key={type.empId} value={type.lancesoft}>
            {type.lancesoft}
          </option>
        ))} */}
        {/* </Form.Select>
        </Form.Group> */}{" "}
        {/* <Button variant="success">Approve</Button>{" "} */}
        <Button className="btn-signup px-2" variant="success" type="submit">
          Approve
        </Button>{" "}
        <Button variant="danger">Decline</Button>{" "}
        <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
      </Form>
    </div>
  )
}

export default ReleaseRequest

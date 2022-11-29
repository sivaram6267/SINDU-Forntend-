import React, { Fragment, useState } from "react"

import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FormInputs } from "../../components/formInputs/FormInputs"

import ApiService from "../../services/ApiService"
import { useEffect } from "react"

function EditClientDetails() {
  const [data, setData] = useState({})
  const [status, setStatus] = useState(false)
  const [clients, setClients] = useState(null)
  const [emp, setEmp] = useState(null)
  const [empdetail, setEmpDetail] = useState(null)
  const [client2, setClient2] = useState({})
  //let [client2, setClient2] = useState([2, "email", "managername", 4000, "desig", "2022-03-18", "2022-03-18"])

  const [msg, setMsg] = useState("")
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  let type = sessionStorage.getItem("type")

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const handleClients = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    //console.log(name + ":" + value);
    // eslint-disable-next-line  no-unused-vars
    // if (name === "ClientDetails") {
    // if (name === "ClientDetails" && value !== "") {
    // if (name === "employeeID" && value !== "") {
    ApiService.getEmpdetail(value)
      .then((res) => {
        // let id = res.data;
        //setStatus(false);
        console.log(res.data)
        setEmpDetail(res.data)
        console.log(empdetail)
      })

      .catch((error) => {
        alert(JSON.stringify(error))
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })

    // if (value > 0 && name === "employeeID") {
    //   ApiService.getEmpdetail(value)
    //     .then((res) => {
    //       // console.log(res.data);
    //       setEmpDetail(res.data);
    //       setMsg("");
    //     })
    //     .catch((error) => {
    //       // console.log(error);
    //       alert(JSON.stringify(error));
    //       setEmpDetail(null);
    //       setMsg(
    //         error.response.data.errorMessage
    //           ? error.response.data.errorMessage
    //           : error.message
    //       );
    //     });
    // if (name === "clientsId" && value !== "")
    ApiService.getClients()
      .then((res) => {
        console.log(res.data)
        // console.log(data);
        setData(res.data)
        setClients(res.data)
        setStatus(false)
        console.log(clients)

        setMsg("")
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error))
        setClients(null)
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
    // }
    // }
  }

  const handleMasterDatas = (e) => {
    setData({
      ...data,
      masterEmployeeDetails: {
        ...data.masterEmployeeDetails,
        [e.target.name]: e.target.value,
      },
    })
  }
  const handleClientDetail = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

    ApiService.getClientDetail(value)
      .then((res) => {
        //let id = res.data;
        setStatus(false)
        // console.log(id);
        // setMsg("");

        setClient2(res.data[0])
        //client2 = { ...res.data[0] }
        console.log(res.data.clientId)
        console.log(client2)
      })

      .catch((error) => {
        alert(JSON.stringify(error))
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(true)
    // setErrors(false);
    ApiService.addClientDetails(data, data.clientsId, data.employeeID)
      .then((res) => {
        // console.log(res.data);
        alert("successfull")
        navigate(`/${type}`)
        setStatus(false)
        setMsg("")
      })
      .catch((error) => {
        // console.log(error);
        setStatus(true)
        setErrors(false)
        alert(JSON.stringify(error))
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
  }
  const handleclientManagerEmail = (e) => {
    setData({
      ...data,
      clientManagerEmail: {
        ...data.clientManagerEmail,
        [e.target.name]: e.target.value,
      },
    })
  }
  useEffect(() => {
    ApiService.getSelectEmp()
      .then((res) => {
        //  console.log(res.data);
        setEmp(res.data)
        setMsg("")
        console.log(emp)
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error))
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
  }, [])

  const formData = [
    {
      id: "employeeID",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="employeeID" aria-label="Client Name" className="selectInput" name="employeeID" onChange={handleClients}>
            <option value="">{status ? "loading..." : "select "}</option>
            {emp?.map((type, index) => (
              <option key={index} value={type.empId}>
                {type.lastName}({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "ClientDetails",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="ClientDetails">
            Select Client Details
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="ClientDetails" aria-label="Client Name" className="selectInput" name="ClientDetails" onChange={handleClientDetail}>
            <option value="">{status ? "loading..." : "select "}</option>
            {empdetail?.map((type, index) => (
              <option key={index} value={type.clientId}>
                {type.clientName} {type.poSDate}({type.poEDate})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "clientEmail",
      title: "client Manager email",
      name: "clientEmail",
      type: "email",
      placeholder: "Enter client email",
      required: true,
      //defaultValue: client2.clientManagerEmail,
      handleChange: handleclientManagerEmail,
    },
    {
      id: "clientManagerName",
      title: "Client Manager Name",
      name: "clientManagerName",
      type: "text",
      placeholder: "Enter client Manager Name",
      required: true,
      //defaultValue: clientdetail.clientManagerName,
      handleChange: handleChange,
    },
    {
      id: "clientsId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="clientsId">
            Client
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="clientsId" aria-label="Client Name" className="selectInput" name="clientsId" onChange={handleChange}>
            <option value="">{status ? "loading" : "select "}</option>
            {clients?.map((type, index) => (
              <option key={"clientsId" + index} value={type.clientsId}>
                {type.clientsNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    // {
    //   id: "clientName",
    //   title: "Client Name",
    //   name: "clientName",
    //   type: "text",
    //   placeholder: "Enter client name",
    //   required: true,
    //   defaultValue: data.clientName,
    //   handleChange: handleChange,
    // },
    {
      id: "clientSalary",
      title: "Client Salary",
      name: "clientSalary",
      type: "text",
      placeholder: "Enter client billing",
      required: true,
      //defaultValue: client2.clientSalary,
      handleChange: handleChange,
    },
    {
      id: "desgAtClient",
      title: "Desgination at client",
      name: "desgAtClient",
      type: "text",
      placeholder: "Enter designation at client",
      required: true,
      //defaultValue: clientdetail.desgAtClient,
      handleChange: handleChange,
    },
    {
      id: "Posdate",
      title: "POS Date",
      name: "posdate",
      type: "date",
      placeholder: "Enter POS Date",
      required: true,
      // defaultValue: clientdetail.posdate,
      handleChange: handleChange,
    },
    {
      id: "Poedate",
      title: "POE Date",
      name: "poedate",
      type: "date",
      placeholder: "Enter POE Date",
      required: false,
      //defaultValue: clientdetail.poedate,
      handleChange: handleChange,
    },
  ]
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Edit Client Details</h1>

      <Form onSubmit={handleSubmit}>
        <h4>Employee Details</h4>
        <hr></hr>
        {errors && <p className="text-danger mb-2">Network problem please try again</p>}
        {!errors && (
          <div className="form">
            {formData.map((item) => (
              <Fragment key={item.id}>{item?.data ? item.data : <FormInputs id={item.id} title={item.title} name={item.name} type={item.type} placeholder={item.placeholder} required={item.required} defaultValue={item.defaultValue} handleChange={item.handleChange} />}</Fragment>
            ))}
          </div>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {status && <p className="text-success mb-2">Please wait while we are processing your request.</p>}

        {<p className="text-danger mb-2">{msg}</p>}
      </Form>
    </div>
  )
}

export default EditClientDetails

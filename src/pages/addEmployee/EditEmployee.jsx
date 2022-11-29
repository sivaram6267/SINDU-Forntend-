import React, { Fragment, useState } from "react"
import { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FormInputs } from "../../components/formInputs/FormInputs"
import { useLocation } from "react-router-dom"

import ApiService from "../../services/ApiService"

import "./addEmployee.css"

const EditEmployee = () => {
  const [data, setData] = useState({})
  const [status, setStatus] = useState(false)
  const [msg, setMsg] = useState("")
  const [empTypes, setEmpTypes] = useState(null)
  const [desgs, setDesgs] = useState(null)
  const [addTypes, setAddTypes] = useState(null)
  const [departs, setDeparts] = useState(null)
  const [subDep, setSubDep] = useState(null)
  const [supId, setSupId] = useState(null)
  const [file, setFile] = useState("")
  const [pic, setPic] = useState("")
  const [apistatus, setApistatus] = useState(false)
  // const [errors, setErrors] = useState(false);

  //to get employee Id from dashboard
  const location = useLocation()
  //console.log(location.state.empId)
  let gDesId = 0
  const handleChange = (e) => {
    const { name, value } = e.target
    //console.log(name + " value: " + value)
    setData({ ...data, [name]: value })

    if (value > 0 && name === "desgId") {
      ApiService.supervisorId(value)
        .then((res) => {
          // console.log(res.data);
          setSupId(res.data)
          setMsg("")
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error))
          setSupId(null)
          setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
        })
    }
    // setData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
    // console.log({ data });
  }
  // eslint-disable-next-line  no-unused-vars
  // eslint-disable-next-line

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(true)
    console.log("*********")
    console.log(data)
    // setErrors(false);
    ApiService.updateEmployee(data, location.state.empId)
      .then((res) => {
        //console.log(res.data)
        alert("employee update details successfull")
        let id = res.data
        //let id = res.data
        setStatus(false)
        // setErrors(false);

        setMsg("")
        /*
        if (file) {
          ApiService.AddResume(file, id)
            .then((res) => {
              console.log(res.data)
              alert(" resume upload successfull")
              setMsg("")
            })
            .catch((error) => {
              console.log(error)
              setStatus(false)
              // setErrors(true);
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error)
            })
        }*/

        if (pic) {
          ApiService.UpdateImage(pic, data.masterEmployeeDetails?.lancesoft)
            .then((res) => {
              console.log(res.data)
              alert("photo upload successfully")
              setMsg("")
              //navigate("/hr")
            })
            .catch((error) => {
              console.log(error)
              setStatus(false)
              // setErrors(true);
              setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
            })
        }
      })
      .catch((error) => {
        console.log(error)
        setStatus(false)
        // setErrors(true);
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      })
  }

  // useEffect(() => {

  // },[apistatus])

  const handleMasterData = (e) => {
    setData({
      ...data,
      masterEmployeeDetails: {
        ...data.masterEmployeeDetails,
        [e.target.name]: e.target.value,
      },
    })
  }
  const handleInternalData = (e) => {
    setData({
      ...data,
      internalExpenses: {
        ...data.internalExpenses,
        [e.target.name]: e.target.value,
      },
    })
  }
  const handleAddressData = (e) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [e.target.name]: e.target.value,
      },
    })
  }
  /*const handleSalary = (e) => {
    setData({
      ...data,
      salary: {
        ...data.salary,
        [e.target.name]: e.target.value,
      },
    })
  }*/

  useEffect(() => {
    ApiService.getEmployeeforUpdate(location.state.empId)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
        gDesId = res.data.designations
        console.log(gDesId)
        //setStatus(false)
        //setMsg("")
      })
      .catch((err) => {
        console.log(err)
        //setData("")
        //setStatus(false)
        //setMsg(err.message)
      })
      .then(() => {
        ApiService.supervisorId(gDesId)
          .then((res) => {
            // console.log(res.data);
            setSupId(res.data)
            setMsg("")
          })
          .catch((error) => {
            // console.log(error);
            alert(JSON.stringify(error))
            setSupId(null)
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      })

    ApiService.empType()
      .then((res) => {
        console.log(res.data)
        setEmpTypes(res.data)
        setStatus(false)
        // setErrors(false);
      })
      .catch((error) => {
        console.log(error)
        setEmpTypes(null)
        setStatus(false)
        // setErrors(true);
      })

    ApiService.getAllDesg()
      .then((res) => {
        console.log(res.data)
        setDesgs(res.data)
      })
      .catch((error) => {
        console.log(error)
        setDesgs(null)
      })

    //data.designations
    /* console.log("at api: " + gDesId)
    ApiService.supervisorId(gDesId)
      .then((res) => {
        // console.log(res.data);
        setSupId(res.data)
        setMsg("")
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error))
        setSupId(null)
        setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
      }) */
    ApiService.getAllAddType()
      .then((res) => {
        console.log(res.data)
        setAddTypes(res.data)
      })
      .catch((error) => {
        console.log(error)
        setAddTypes(null)
      })
    ApiService.getAllSubDepart()
      .then((res) => {
        console.log(res.data)
        setSubDep(res.data)
      })
      .catch((error) => {
        console.log(error)
        setSubDep(null)
      })

    // ApiService.getAllClients()
    //   .then((res) => {
    //     console.log(res.data);
    //     setClients(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setClients(null);
    //   });
    ApiService.getAllDepart()
      .then((res) => {
        console.log(res.data)
        setDeparts(res.data)
      })
      .catch((error) => {
        console.log(error)
        setDeparts(null)
      })
  }, [])

  const formData = [
    {
      id: "firstName",
      title: "First name",
      name: "firstName",
      type: "text",
      placeholder: "Enter Employee first name",
      required: true,
      defaultValue: data.masterEmployeeDetails?.firstName,
      handleChange: handleMasterData,
    },
    {
      id: "lastName",
      title: "Last name",
      name: "lastName",
      type: "text",
      placeholder: "Enter Employee last name",
      required: true,
      defaultValue: data.masterEmployeeDetails?.lastName,
      handleChange: handleMasterData,
    },

    {
      id: "email",
      title: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      required: true,
      defaultValue: data.masterEmployeeDetails?.email,
      handleChange: handleMasterData,
    },
    {
      id: "phoneNo",
      title: "Phone Number",
      name: "phoneNo",
      maxLength: "10",
      //pattern: "[0-9]{10}",
      message: "Please enter valid phone number",
      type: "tel",
      placeholder: "Enter Phone Number",
      required: true,
      defaultValue: data.masterEmployeeDetails?.phoneNo,
      handleChange: handleMasterData,
    },

    {
      id: "location",
      title: "Work Location",
      name: "location",
      type: "text",
      placeholder: "Enter location",
      required: true,
      defaultValue: data.masterEmployeeDetails?.location,
      handleChange: handleMasterData,
    },
    /*{
      id: "empTypeId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="empTypeId">
            Employee Type <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="empTypeId" aria-label="employee Type" className="selectInput" name="empTypeId" onChange={handleChange}>
            <option value="">{data.masterEmployeeDetails?.employeeType}</option>
            {/* <option value="1">N/A</option> */ //}
    /*    {empTypes?.map((type) => (
              <option key={type.typeName} value={type.empTypeId}>
                {type.typeName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },*/
    // {
    //   id: "i_c",
    //   title: "I/C",
    //   name: "i_c",
    //   type: "text",
    //   placeholder: "Enter I/C",
    //   required: true,
    //   defaultValue: data.i_c,
    //   handleChange: handleChange,
    // },
    {
      id: "status",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="status">
            Status
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select value={data.masterEmployeeDetails?.status} required id="status" aria-label="status" className="selectInput" name="status" onChange={handleMasterData}>
            <option value="BENCH">BENCH</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXIT">EXIT</option>
            <option value="MANAGMENT">MANAGMENT</option>
          </Form.Select>
        </Form.Group>
      ),
    },
    // {
    //   id: "status",
    //   title: "Status",
    //   name: "status",
    //   type: "text",
    //   placeholder: "Enter Status",
    //   required: true,
    //   defaultValue: data.status,
    //   handleChange: handleChange,
    // },

    // {
    //   id: "Position",
    //   title: "Position",
    //   name: "position",
    //   type: "text",
    //   placeholder: "Enter Position",
    //   required: true,
    //   defaultValue: data.position,
    //   handleChange: handleChange,
    // },
    // {
    //   id: "department",
    //   title: "Department",
    //   name: "department",
    //   type: "text",
    //   placeholder: "Enter Department",
    //   required: true,
    //   defaultValue: data.department,
    //   handleChange: handleChange,
    // },

    {
      id: "departId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="departId">
            Department
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="departId" aria-label="Department" className="selectInput" name="departments" onChange={handleChange}>
            <option value="0">N/A</option>
            {departs?.map((type) => (
              <option key={type.depart} value={type.departId} selected={type.departId === data.departments}>
                {type.depart}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "subDepartId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="subDepartId">
            Sub-department
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="subDepartId" aria-label="Sub department" className="selectInput" name="subDepartments" onChange={handleChange}>
            <option value="0">N/A</option>
            {subDep?.map((type) => (
              <option key={type.subDepartmentNames} value={type.subDepartId} selected={type.subDepartId === data.subDepartments}>
                {type.subDepartmentNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "vertical",
      title: "Vertical",
      name: "vertical",
      type: "text",
      placeholder: "Enter vertical",
      required: true,
      defaultValue: data.masterEmployeeDetails?.vertical,
      handleChange: handleMasterData,
    },
    /*
    // {
    //   id: "partice",
    //   title: "Partice",
    //   name: "partice",
    //   type: "text",
    //   placeholder: "Enter Partice",
    //   required: true,
    //   defaultValue: data.partice,
    //   handleChange: handleChange,
    // },
    // {
    //   id: "hrId",
    //   title: "HR Id",
    //   name: "hrId",
    //   type: "text",
    //   placeholder: "Enter HR Id",
    //   required: true,
    //   defaultValue: data.hrId,
    //   handleChange: handleChange,
    // },
    */
    {
      id: "lancesoft",
      title: "Lancesoft ID",
      name: "lancesoft",
      pattern: "[LSI]{3}[0-9]{3,5}",
      type: "text",
      placeholder: "Enter Lancesoft Id",
      message: "Please enter valid Lancesoft Id i.e. LSI123",
      required: true,
      defaultValue: data.masterEmployeeDetails?.lancesoft,
      handleChange: handleMasterData,
    },
    /*
    // {
    //   id: "employeeType",
    //   title: "Employee Type",
    //   name: "employeeType",
    //   type: "text",
    //   placeholder: "Enter Employee Type",
    //   required: true,
    //   defaultValue: data.employeeType,
    //   handleChange: handleChange,
    // },
    */
    {
      id: "desgId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="desgId">
            Employee Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>

          <Form.Select id="desgId" aria-label="employee designation" className="selectInput" name="designations" onChange={handleChange}>
            {desgs?.map((type) => (
              <option key={type.desgId} value={type.desgId} selected={type.desgId === data.designations}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "supervisorId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="supervisorId">
            {/* Supervisor */}
            Reporting person
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select id="supervisorId" aria-label="Supervisor Id" className="selectInput" name="supervisor" onChange={handleChange}>
            {supId?.map((type) => (
              <option key={type.lancesoftId} value={type.empId} selected={type.empId === data.supervisor}>
                {type.firstName} {type.lastName} ({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    // {
    //   id: "SupervisorId",
    //   title: "Supervisor Id",
    //   name: "supervisorId",
    //   type: "text",
    //   placeholder: "Enter Supervisor Id",
    //   required: true,
    //   defaultValue: data.supervisorId,
    //   handleChange: handleChange,
    // },
    {
      id: "country",
      title: "Country",
      name: "country",
      type: "text",
      placeholder: "Enter Country",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.country : "",
      defaultValue: data.address?.country,
      handleChange: handleAddressData,
    },
    {
      id: "state",
      title: "State",
      name: "state",
      type: "text",
      placeholder: "Enter State",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.state : "",
      defaultValue: data.address?.state,
      handleChange: handleAddressData,
    },
    {
      id: "city",
      title: "City",
      name: "city",
      type: "text",
      placeholder: "Enter City",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.city : "",
      defaultValue: data.address?.city,
      handleChange: handleAddressData,
    },
    {
      id: "street",
      title: "Street",
      name: "street",
      type: "text",
      placeholder: "Enter Street",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.street : "",
      defaultValue: data.address?.street,
      handleChange: handleAddressData,
    },
    {
      id: "zipCod",
      title: "Pincode",
      name: "zipCod",
      type: "number",
      placeholder: "Enter pinCode",
      required: true,
      //defaultValue: data.address != null ? data.address[0]?.zipCod : "",
      defaultValue: data.address?.zipCod,
      handleChange: handleAddressData,
    },

    // {
    //   id: "HouseNo",
    //   title: "HouseNo",
    //   name: "houseNo",
    //   type: "text",
    //   placeholder: "Enter HouseNo",
    //   required: true,
    //   defaultValue: data.houseNo,
    //   handleChange: handleChange,
    // },
    /* {
      id: "addTypeId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="addTypeId">
            Address status
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select required id="addTypeId" aria-label="addressType" className="selectInput" name="addTypeId" onChange={handleChange}>
            <option value="">{status ? "loading" : "select "}</option>
            {addTypes?.map((type) => (
              <option key={type.addType} value={type.addTypeId}>
                {type.addType}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    }, */
    {
      id: "isInternal",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="isInternal">
            Working internal ?<nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select value={data.masterEmployeeDetails?.isInternal} required id="isInternal" aria-label="isInternal" className="selectInput" name="isInternal" onChange={handleMasterData}>
            <option key="IsInternal" value="">
              select
            </option>
            <option key="IsInternal true" value="true">
              True
            </option>
            <option key="IsInternal false" value="false">
              False
            </option>
          </Form.Select>
        </Form.Group>
      ),
    },
    // {
    //   id: "addressType",
    //   title: "Address Type",
    //   name: "addressType",
    //   type: "text",
    //   placeholder: "Enter Address Type",
    //   required: true,
    //   defaultValue: data.addressType,
    //   handleChange: handleChange,
    // },

    // {
    //   id: "cubicalCost",
    //   title: "Cubical Cost",
    //   name: "cubicleCost",
    //   type: "number",
    //   placeholder: "Enter Cubical Cost",
    //   required: true,
    //   defaultValue: data.internalExpenses?.cubicleCost,
    //   handleChange: handleInternalData,
    // },
    // {
    //   id: "transportationCost",
    //   title: "Transport Cost",
    //   name: "transportationCost",
    //   type: "number",
    //   placeholder: "Enter Transport Cost",
    //   required: true,
    //   defaultValue: data.internalExpenses?.transportationCost,
    //   handleChange: handleInternalData,
    // },
    // {
    //   id: "foodCost",
    //   title: "Food Cost",
    //   name: "foodCost",
    //   type: "number",
    //   placeholder: "Enter Food Cost",
    //   required: true,
    //   defaultValue: data.internalExpenses?.foodCost,
    //   handleChange: handleInternalData,
    // },
    {
      id: "salary",
      title: "Salary",
      name: "salary",
      type: "number",
      placeholder: "Enter Salary",
      required: true,
      defaultValue: data.salary,
      handleChange: handleChange,
    },
    {
      id: "joiningDate",
      data: <FormInputs id="joiningDate" title="Joining Date" name="joiningDate" type="date" required={true} defaultValue={data.masterEmployeeDetails?.joiningDate} handleChange={handleMasterData} />,
    },
    {
      id: "dob",
      data: (
        <FormInputs
          id="dob"
          title="Date of Birth"
          name="dob"
          type="date"
          placeholder="Enter Date of Birth"
          required={true}
          max="2022-07-31"
          defaultValue={data.masterEmployeeDetails?.dob}
          handleChange={(e) => {
            setData({
              ...data,
              masterEmployeeDetails: {
                ...data.masterEmployeeDetails,
                dob: e.target.value,
              },
            })
          }}
        />
      ),
    },
    {
      id: "gender",
      data: (
        <Form.Group className="my-4 checkbox">
          <Form.Label>
            Gender <nobr />
            <span className="text-danger"> *</span> :{" "}
          </Form.Label>{" "}
          <Form.Check
            required
            inline
            label="Male"
            name="gender"
            type="radio"
            checked={data.masterEmployeeDetails?.gender === "Male"}
            //defaultValue={data.masterEmployeeDetails?.gender}
            onChange={(e) => {
              setData({
                ...data,
                masterEmployeeDetails: {
                  ...data.masterEmployeeDetails,
                  [e.target.name]: "Male",
                },
              })
            }}
          />
          <Form.Check
            inline
            label="Female"
            name="gender"
            type="radio"
            checked={data.masterEmployeeDetails?.gender === "Female"}
            //defaultValue={data.masterEmployeeDetails?.gender}
            onChange={(e) => {
              setData({
                ...data,
                masterEmployeeDetails: {
                  ...data.masterEmployeeDetails,
                  [e.target.name]: "Female",
                },
              })
            }}
          />
        </Form.Group>
      ),
    },

    {
      id: "pdf",
      data: (
        <FormInputs
          id="pdfFile"
          title="Resume"
          name="resume"
          type="file"
          accept=".pdf"
          defaultValue={file}
          handleChange={(e) => {
            if (e.target.files[0]) setFile(e.target.files[0])
            // setData({
            //   ...data,
            //   masterEmployeeDetails: {
            //     ...data.masterEmployeeDetails,
            //     dob: e.target.value,
            //   },
            // })
          }}
        />
      ),
    },
    {
      id: "pic",
      data: (
        <FormInputs
          id="picture"
          title="Picture"
          name="picture"
          type="file"
          accept=".png, .jpg, .jpeg"
          defaultValue={pic}
          handleChange={(e) => {
            if (e.target.files[0]) setPic(e.target.files[0])
            // setData({
            //   ...data,
            //   masterEmployeeDetails: {
            //     ...data.masterEmployeeDetails,
            //     dob: e.target.value,
            //   },
            // });
          }}
        />
      ),
    },
  ]
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Edit Employee Details</h1>

      <Form id="my-5" onSubmit={handleSubmit}>
        <hr></hr>
        <div className="form">
          {formData.map((item) => (
            <Fragment key={item.id}>
              {item?.data ? (
                item.data
              ) : (
                <FormInputs
                  id={item.id}
                  title={item.title}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  required={item.required}
                  defaultValue={item.defaultValue}
                  handleChange={item.handleChange}
                  pattern={item.pattern}
                  message={item.message}
                  max={item.max}
                  maxLength={item.maxLength}
                  // min={item.min}
                />
              )}
            </Fragment>
          ))}
        </div>
        <Button className="btn-signup px-2" type="submit">
          Save
        </Button>
        &emsp;
        <Button as={Link} to="/hr" variant="danger" className="px-2">
          Back
        </Button>
        {/* </Col> */}
        {status && <p className="text-success mb-2">Please wait while we are processing your request.</p>}
        {/* {errors && (
            <p className="text-danger mb-2">
              Network error. Please try again later.
            </p>
          )} */}
        {<p className="text-danger mb-2">{msg}</p>}
      </Form>
    </div>
  )
}

export default EditEmployee
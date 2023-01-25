import React, { Fragment, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";

import ApiService from "../../services/ApiService";
import { useEffect } from "react";

function AddClientDetails() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [clients, setClients] = useState(null);
  const [emp, setEmp] = useState(null);
  const [practice, setPractice] = useState(null);
  const [emplo, setEmplo] = useState(null);
  const [practiceno, setPracticeno] = useState(null);
  const [msg, setMsg] = useState("");
  let type = sessionStorage.getItem("type");
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData({ ...data, [name]: value });
    console.log(name + " " + value);
    if (data.lancesoftId === undefined) data.lancesoftId = "";
    if (type === "hr") {
      console.log(data);
      ApiService.getEmploy(value, practiceno)
        .then((res) => {
          console.log(res.data);
          setEmplo(res.data);
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
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
  };
  const handlePractice = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setPracticeno(value);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  // eslint-disable-next-line  no-unused-vars
  const [errors, setErrors] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.addClientDetails(data, data.clientsId, data.employeeID)
      .then((res) => {
        console.log(data);
        alert("successfull");
        navigate(`/${type}`);
        setStatus(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        setStatus(true);
        setErrors(false);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    ApiService.getAllClients()
      .then((res) => {
        // console.log(res.data);
        setClients(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setClients(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
    ApiService.getEmployeeId()
      .then((res) => {
        // console.log(res.data);
        setEmp(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setEmp(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });

    if (type === "hr") {
      ApiService.selectPractice()
        .then((res) => {
          console.log(res.data);
          setPractice(res.data);
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));
          setPractice(null);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  }, []);

  const formData = [
    {
      id: "SelectPractice",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice">
            Select Practice
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="SelectPractice"
            aria-label="Client Name"
            className="selectInput"
            name="SelectPractice"
            onChange={handlePractice}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {practice?.map((type, index) => (
              <option key={index} value={type.subDepartId}>
                {type.subDepartmentNames}
                {type.depart}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "lancesoftId",
      title: "lancesoftId",
      name: "lancesoftId",
      type: "text",
      placeholder: "Enter search",
      // required: true,
      defaultValue: data.lancesoftId,
      handleChange: handleChange,
    },
    {
      id: "employeeID",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Employee ID
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="employeeID"
            aria-label="Client Name"
            className="selectInput"
            name="employeeID"
            onChange={handleData}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {emplo?.map((type, index) => (
              <option key={index} value={type.lancesoftId}>
                {type.firstName} {type.name}({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "clientEmail",
      title: "client email",
      name: "clientEmail",
      type: "email",
      placeholder: "Enter client email",
      required: true,
      defaultValue: data.clientEmail,
      handleChange: handleData,
    },
    {
      id: "clientManagerName",
      title: "Client Manager Name",
      name: "clientManagerName",
      type: "text",
      placeholder: "Enter client Manager Name",
      required: true,
      defaultValue: data.clientManagerName,
      handleChange: handleData,
    },
    {
      id: "clientsId",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="clientsId">
            Client Name
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="clientsId"
            aria-label="Client Name"
            className="selectInput"
            name="clientsId"
            onChange={handleData}
          >
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
      title: "Client billing",
      name: "clientSalary",
      type: "number",
      pattern: "[+91][0-9]{13}",
      placeholder: "Enter client billing",
      required: true,
      defaultValue: data.clientSalary,
      handleChange: handleData,
    },
    {
      id: "desgAtClient",
      title: "Desgination at client",
      name: "desgAtClient",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "Enter designation at client",
      required: true,
      defaultValue: data.desgAtClient,
      handleChange: handleData,
    },

    {
      id: "cgst",
      title: "CGST",
      name: "cgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter cgst number",

      defaultValue: data.cgst,
      handleChange: handleData,
    },
    {
      id: "igst",
      title: "IGST",
      name: "igst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter igst number",

      defaultValue: data.igst,
      handleChange: handleData,
    },
    {
      id: "sgst",
      title: "SGST",
      name: "sgst",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter sgst number",

      defaultValue: data.sgst,
      handleChange: handleData,
    },
    {
      id: "TotalTax",
      title: "TotalTax",
      name: "totalTax",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter totaltax",

      defaultValue: data.totalTax,
      handleChange: handleData,
    },
    {
      id: "povalue",
      title: "Povalue",
      name: "povalue",
      type: "number",
      // pattern: "[0-9]{10}",

      placeholder: "Enter povalue",
      required: true,
      defaultValue: data.povalue,
      handleChange: handleData,
    },
    {
      id: "towerHead",
      title: "TowerHead",
      name: "towerHead",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "enter towerhead name",
      required: true,
      defaultValue: data.towerHead,
      handleChange: handleData,
    },
    {
      id: "ponumber",
      title: "ponumber",
      name: "ponumber",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "enter ponumber",
      required: true,
      defaultValue: data.ponumber,
      handleChange: handleData,
    },
    {
      id: "handledBy",
      title: "handledBy",
      name: "handledBy",
      type: "text",
      // pattern: "[0-9]{10}",

      placeholder: "enter handledby name",
      required: true,
      defaultValue: data.handledBy,
      handleChange: handleData,
    },
    // {
    //   id: "tenure",
    //   title: "Tenure",
    //   name: "tenure",
    //   type: "text",
    //   // pattern: "[0-9]{10}",

    //   placeholder: "",
    //   required: true,
    //   defaultValue: data.tenure,
    //   handleChange: handleData,
    // },
    // {
    //   id: "totalEarningAtclient",
    //   title: "totalEarningAtclient",
    //   name: "totalEarningAtclient",
    //   type: "number",
    //   // pattern: "[0-9]{10}",

    //   placeholder: "",
    //   required: true,
    //   defaultValue: data.totalEarningAtclient,
    //   handleChange: handleData,
    // },
    {
      id: "podate",
      title: "PoDate",
      name: "podate",
      type: "date",
      // pattern: "[0-9]{10}",

      placeholder: "",
      required: true,
      defaultValue: data.podate,
      handleChange: handleData,
    },
    {
      id: "Posdate",
      title: "POS Date",
      name: "posdate",
      type: "date",
      placeholder: "Enter POS Date",
      required: true,
      defaultValue: data.posdate,
      handleChange: handleData,
    },
    {
      id: "Poedate",
      title: "POE Date",
      name: "poedate",
      type: "date",
      placeholder: "Enter POE Date",
      required: false,
      defaultValue: data.poedate,
      handleChange: handleData,
    },
  ];
  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Add Client Details</h1>

      <Form onSubmit={handleSubmit}>
        <h4>Employee Details</h4>
        <hr></hr>
        {errors && (
          <p className="text-danger mb-2">Network problem please try again</p>
        )}
        {!errors && (
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
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button onClick={handleCancel} variant="danger">
          Cancel
        </Button>
        {status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
        {<p className="text-danger mb-2">{msg}</p>}
      </Form>
    </div>
  );
}

export default AddClientDetails;

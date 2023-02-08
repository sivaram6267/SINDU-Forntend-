import React, { Fragment, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import Select from "react-select";

function AssignResponsibilities() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [clients, setClients] = useState(null);
  const [emp, setEmp] = useState(null);
 const [selempdeg, setSelempdeg] = useState(null);
  const [Selmanager2, setSelmanager2] = useState(null);
  const [responsible, setResponsible] = useState(null);
  const [resp1, setResp1] = useState(null);
  const [selectemployer, setSelectemployer] = useState(null);
  const [second, setSecond] = useState(null);
const [secondary, setSecondary] = useState(null);
  const [secondaryManager, setSecondaryManager] = useState(null);
  const [preemp, setpreemp] = useState(null);
  const [msg, setMsg] = useState("");

  const[options,setOptions]=useState(null)
let type = sessionStorage.getItem("type");
 const [show, setShow] = useState(false);

 const [selectedOptions, setSelectedOptions] = useState();
 const [respList, setRespList] = useState(null);

//  const optionList = [
//   { value: "red", label: "Red" },
//   { value: "green", label: "Green" },
//   { value: "yellow", label: "Yellow" },
//   { value: "blue", label: "Blue" },
//   { value: "white", label: "White" }
// ];


function handleSelect(resps) {
  
    setSelectedOptions(resps);
    console.log(resps)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(name + " " + value);
    setEmp(value) //empId

    if (data.lancesoftId === undefined) data.lancesoftId = "";
    
    if (type === "hr" && name === "lancesoftIds") {
      console.log(preemp); //preemp - designation
      ApiService.EmployeeDesId(preemp, value)
        .then((res) => {
          console.log(res.data);
         
          setSelectemployer(res.data);
          
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
    if (type === "hr" && name === "lancesoft") {
      ApiService.selectmanager(secondary, value)
        .then((res) => {
          console.log(res.data);
          setSelmanager2(res.data);
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

    
    if (name === "employeeIDs" ) {
    ApiService.Responsibility(value)
        .then((res) => {
          console.log(res.data);
          
      let arr = res.data?.map(item => ({
        value: item,
        label: item
      }))
      setRespList(arr)
      // setRespList(responsible?.map(item => ({
      //        value: item,
      //        label: item
      //      })));

      console.log(respList);


          setOptions(res.data)
          setMsg("");
        })
        .catch((error) => {
          // console.log(error);
          alert(JSON.stringify(error));

          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
      };
    

};

  const handledesgination = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setpreemp(value);
  };

  const  handleresponsibilities = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setResp1(value);

    
  };

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setSecond(value);

    ApiService.secondarymanager(preemp)
      .then((res) => {
        console.log(res.data);
        setSecondaryManager(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        setSecondaryManager(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  // eslint-disable-next-line  no-unused-vars
  const [errors, setErrors] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //  const {  value,resp3,resp2 } = e.target;
    // setData({ ...data, [name]: value });

    setStatus(false);
    // setErrors(false);
    //if(resp1 === undefined) resp1 = null
    //if(resp2 === undefined) resp2 = null
   let resp1 = selectedOptions[0]?.value;
   let resp2 = selectedOptions[1]?.value;
   let resp3 = selectedOptions[2]?.value;

   console.log(resp1);
    

    //console.log(value,resp1);
    ApiService.SetResponsibilities(emp,resp1, resp2, resp3)
      .then((res) => {
        console.log(res.data);
        //alert("successfull");
        // navigate(`/${type}`);
        // navigate("/hr/assignResponsibilites")
       setMsg("Assign Responsibilitiese Done Successfully");
        setStatus(true);
        
      })
      .catch((error) => {
        console.log(error);
        setStatus(true);
        setErrors(false);
        // alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  
  };

  // const handleok = (e) => {
  //   e.preventDefault();
  //   setStatus(true);
  //   // setErrors(false);
  //   ApiService.setsecondaryfor(second, secondary)
  //     .then((res) => {
  //       console.log(res.data);
  //       // alert("successfull");
  //       navigate(`/${type}`);
  //       setStatus(false);
  //       setMsg("");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setStatus(true);
  //       setErrors(false);
  //       // alert(JSON.stringify(error));
  //       setMsg(
  //         error.response.data.errorMessage
  //           ? error.response.data.errorMessage
  //           : error.message
  //       );
  //     });
  // };

  useEffect(() => {
  // if (type === "hr") {
 ApiService.Designations()
      .then((res) => {
        console.log(res.data);
        setSelempdeg(res.data);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        alert(JSON.stringify(error));
        // alert(JSON.stringify(error));
        setSelempdeg(null);
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${type}`);
    //
  };

  const formData = [
    {
      id: "Employeedesgs",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice">
            Select Employee Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="Employeedesgs"
            aria-label="Client Name"
            className="selectInput"
            name="Employeedesgs"
            // disabled={disabled ? "" : "disabled"}
            onChange={handledesgination}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {selempdeg?.map((type, index) => (
              <option key={index} value={type.desigId}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },

    {
      id: "lancesoftId",
      title: "TypeName or Lancesoftid",
      name: "lancesoftIds",
      type: "text",
      placeholder: "Enter search",
      required: true,
      defaultValue: data.lancesoftId,
      // disabled: { disabled },
      disabled: true,
      handleChange: handleChange,
    },
    {
      id: "employeeIDs",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="employeeID">
            Select Employee
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="employeeIDs"
            aria-label="Client Name"
            className="selectInput"
            name="employeeIDs"
            // disabled={disabled ? "" : "disabled"}
            onChange={handleChange}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {selectemployer?.map((type, index) => (
              <option key={index} value={type.empId}>
                {type.name}({type.lancesoftId})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ),
    },
    {
      id: "Responsibilities",
      data: (
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="SelectPractice">
         Responsibilities
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          
              <Select  

                options={respList}
                placeholder="Select Responsibility"
                value={selectedOptions}
                isClearable
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              >
                
              </Select>
              
           

          {/* <Form.Select multiple
            required
            
             id="Responsibilities"
            aria-label="Client Name"
            className="selectInput"
            name="SelectResponsibilities"
            // disabled={disabled ? "" : "disabled"}
            onChange={handleresponsibilities}
          >
       

            <option value="">{status ? "loading..." : "select "}</option>
            {responsible?.map((type, index) => (
              <option key={index} value={type.desgId}>
                {type}
                {type.desgNames}
              </option>
            ))}
          </Form.Select> */}
        </Form.Group>
      ),
    },
   
   

  ];


  
  return (
    <div id="add-employee" className="container-sm ">
      {/* <h1 className="title text-center">Secondary Manager Details</h1> */}

      <Form onSubmit={handleSubmit}>
        <h4>Assign Responsibilities</h4>
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
                    disabled={item.disabled}
                    defaultValue={item.defaultValue}
                    handleChange={item.handleChange}
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}
        <Button variant="primary" type="submit" onClick={handleShow}>
          submit
        </Button>{" "}
        {/* {data.response.errorMessage?.map((it) => (
          <Button
            className="btn-signup px-2"  
            type="submit"
            onClick={handleShow}
            defaultValue={it.response}
          >
            Submit
          </Button>
        ))} */}
        {/* alert(" resume upload successfull"); */}
        {/* <Modal show={show} onHide={handleClose} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <p className="text-danger mb-2" onClick={handleShow}>
              {msg}{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={handleok}
              // onclick={handleSubmit}
              onSubmit={handleSubmit}
              type="submit"
            >
              yes
            </Button>

            <Button
              variant="primary"
              onClick={handleCancel}
              // onClick={handleClose}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal> */}
        <Button variant="danger" onClick={handleCancel} className="px-2">
          Cancel
        </Button>
        {/* {status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
        {<p className="text-danger mb-2">{msg}</p>} */}
      </Form>

      {status && (
        <p className="text-success mb-2">
          {/* Please wait while we are processing your request. */}
          {msg}
        </p>
      )}
      {
        // <p className="text-danger mb-2" onClick={handleShow}>
        //   {msg}{" "}
        // </p>
      }
      {/* <Form.Select
            required
            isMulti={true}
            value={selectedOption}
        
            options={options}
            id="Responsibilities"
            aria-label="Client Name"
            className="selectInput"
            name="SelectResponsibilities"
            // disabled={disabled ? "" : "disabled"}
            onChange={handleresponsibilities}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {secondaryManager?.map((type, index) => (
              <option key={index} value={type.desgId}>
                {type.name}
                {type.desgNames}
              </option>
            ))}
          </Form.Select> */}
     {/* <Select
          isMulti={true}
          value={selectedOption}
          onChange={handleresponsibilities}
          options={options}
        /> */}

        {/* {this.state.selectedOption.length ? (
          <div>
            <h3>Select Responsibility</h3>
            <ul>
              {this.state.selectedOption.map((option) =>
                <li key={option.value}>
                  {option.label}
                </li>
              )}
            </ul>
          </div>) : ''
        } */}



    </div>
  );
}

export default AssignResponsibilities;

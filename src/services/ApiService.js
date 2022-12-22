import axios from "axios";
// const BASE_URL = 'https://lsi-employeetracker.herokuapp.com'; // heruko.

// const BASE_URL = "http://18.209.60.4:8080/LESM-Status-Monitor-0.0.1-SNAPSHOT"; // devops

// const BASE_URL = "http://10.81.4.23:2022"; //server port
// const BASE_URL = "http://10.81.4.23:9090/LESM-Status-Monitor123";

// const BASE_URL ="http://18.188.242.190:8081/LESM-Status-Monitor-0.0.1-SNAPSHOT"; // NEW ONE DEVOPS API

// const BASE_URL = "http://10.81.4.191:2030"; // sudheer pc
const BASE_URL = "http://10.81.4.195:2022"; // umer pc
//const BASE_URL = "http://localhost:2032"
// const BASE_URL = "http://10.81.4.198:2022"; //sowmya pc
// const BASE_URL = "http://10.81.4.197:2022"; // chamu pc
// const BASE_URL = "http://10.81.3.30:9090"; // charan pc
// const BASE_URL = "http://10.81.4.198:2022"; //sowmya pc
//const  BASE_URL="http://10.81.4.188:2021";  //santhosh pc
// const BASE_URL = "http://10.81.4.231:2022"; //teju pc
//get
const ALL_EMPLOYEES = `${BASE_URL}/api/v1/emp/getEmps`;
const ALL_EMPLOYEES_BY_ID = `${BASE_URL}/api/v1/emp/get-emp-crosspnd-details?id=`;
// const ALL_EMPLOYEES_BY_ID = `${BASE_URL}/api/v1/emp/details?empId=`;

const EMPLOYEE_TYPE = `${BASE_URL}/api/v1/fields/get-all-empTypes`;
//post
const LOGIN_API_URL = `${BASE_URL}/api/v1/auth/login`;
// const REGISTER_API_URL = `${BASE_URL}/api/register`;
const INSERT_EMP_DETAILS_API_URL = `${BASE_URL}/api/v1/emp/insert-emp-details`;
const TEST = `${BASE_URL}/api/v1/admin/create-roles`;
const BILL_EXPENSE = `${BASE_URL}/api/v1/exp/insert-expenses`;

//delete

export function auth() {
  const token = sessionStorage.getItem("Access_Token");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

export default new (class ApiService {
  login(data) {
    return axios.post(LOGIN_API_URL, data);
  }

  // register(data) {
  //   return axios.post(REGISTER_API_URL, data);
  // }
  insertEmployee(data, primaryMgr) {
    return axios.post(
      `${INSERT_EMP_DETAILS_API_URL}?addressTypeId=${data.addTypeId}&departId=${data.departId}&desgId=${data.desgId}&subDepartId=${data.subDepartId}&subVId=${primaryMgr}&typeId=${data.empTypeId}`,
      data,
      auth()
    );
  }
  updateEmployee(data, id) {
    return axios.put(
      `${BASE_URL}/api/v1/emp/update-emp?id=${id}`,
      data,
      auth()
    );
  }

  getAllEmployees() {
    return axios.get(ALL_EMPLOYEES, auth());
  }
  getEmployeeforUpdate(id) {
    return axios.get(`${BASE_URL}/api/v1/emp/update-emp-req?id=${id}`, auth());
  }
  getEmployeeById(id) {
    // return axios.get(ALL_EMPLOYEES_BY_ID + id, auth());
    // `${BASE_URL}/api/v1/emp/details?empId=`;
    return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());
  }
  getTest(data) {
    return axios.post(TEST, data);
  }
  getBillExpense(data, id, typeId) {
    return axios.post(
      `${BILL_EXPENSE}?empId=${id}&expTypeId=${typeId}`,
      data,
      auth()
    );
  }
  empType() {
    return axios.get(EMPLOYEE_TYPE, auth());
  }
  //addEmployee
  getAllDesg() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-desg`, auth());
  }

  // http://localhost:2022/api/v1/drop-down/designaton

  //http://10.81.4.195:2022/api/v1/fields/get-all-addType
  getAllAddType() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-addType`, auth());
  }
  //http://10.81.4.195:2022/api/v1/fields/get-all-clients
  getAllClients() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  //http://10.81.4.195:2022/api/v1/fields/get-all-Depart
  getAllDepart() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-Depart`, auth());
  }
  getAllSubDepart() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  getUnderEmployee(id) {
    if (id >= 0) {
      return axios.get(
        `${BASE_URL}/api/v1/emp/get-under-emps?id=${id}`,
        auth()
      );
    }
  }
  addClientDetails(data, cId, eId) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/insert-empat-client?clientId=${cId}&empId=${eId}`,
      data,
      auth()
    );
  }

  addClientDetails2(cId, data) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/update-client-details?clientDetailId=${cId}`,
      data,
      auth()
    );
  }

  // http://localhost:2022/api/v1/emp/update-client-details?clientDetailId=5

  supervisorId(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/primary-manager-desig?desigId=${id}`,
      auth()
    );
  }
  //edit employee
  supervisorIdmanager(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/primary-manager-desig?desigId=${id}`,
      auth()
    );
  }

  primarydesgs(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/all-employee-by-desig?desgId=${id}`,
      auth()
    );
  }
  primarydesgsination(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/all-employee-by-desig?desgId=${id}`,
      auth()
    );
  }

  // http://localhost:2022/api/v1/drop-down/all-employee-by-desig?desgId=5

  getEmployeeId() {
    //localhost:2022/api/v1/emp/client-emp-dropdown
    return axios.get(`${BASE_URL}/api/v1/emp/client-emp-dropdown`, auth());
  }
  addClientnames(data) {
    return axios.post(`${BASE_URL}/api/v1/fields/insert-clients`, data, auth());
  }
  getAllRoles() {
    return axios.get(`${BASE_URL}/api/v1/admin/all-roles`, auth());
  }
  // register
  signup(data, id) {
    // http://localhost:2022/api/v1/admin/sign-up?roleName=LEAD
    return axios.post(
      `${BASE_URL}/api/v1/admin/sign-up?roleName=${id}`,
      data,
      auth()
    );
  }
  insetDepart(data) {
    // http://localhost:2022/api/v1/fields/insert-depart
    return axios.post(`${BASE_URL}/api/v1/fields/insert-depart`, data, auth());
  }
  totalLead(data) {
    // http://10.81.4.195:2022/Total/lead
    return axios.post(`${BASE_URL}/Total/lead`, data, auth());
  }
  totalManager(data) {
    return axios.post(`${BASE_URL}/Total/managerCalculation`, data, auth());
  }
  totalGeneralManager(data) {
    return axios.post(
      `${BASE_URL}/Total/generalManagerCalculation`,
      data,
      auth()
    );
  }
  totalvicepresident(data) {
    return axios.post(`${BASE_URL}/Total/vicePresident`, data, auth());
  }
  totalCH(data) {
    return axios.post(`${BASE_URL}/Total/countryHeadCalculation`, data, auth());
  }
  totalMD(data) {
    return axios.post(
      `${BASE_URL}/Total/managingDirectorCalculation`,
      data,
      auth()
    );
  }
  addSubDepart(data, id) {
    // http://localhost:2022/api/v1/fields/insert-sub-depart/5
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-sub-depart/${id}`,
      data,
      auth()
    );
  }
  addDesg(data, id) {
    // http://localhost:2022/api/v1/fields/insert-desig?id=10
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-desig?id=${id}`,
      data,
      auth()
    );
  }
  addEmpType(data) {
    // http://localhost:2022/api/v1/fields/insert-employee-type
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-employee-type`,
      data,
      auth()
    );
  }
  addAddType(data) {
    // http://localhost:2022/api/v1/fields/insert-adsress-types
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-adsress-types`,
      data,
      auth()
    );
  }
  getAllClientsByEmpId(id) {
    // http://localhost:2022/api/v1/emp/get-emp-clientDetails?id=58
    return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());

    // return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());
  }

  updateSupervisorId(id, sId) {
    // http://localhost:2022/api/v1/emp/update-supervisor-id/LSI0633/65
    return axios.get(
      `${BASE_URL}/api/v1/hr/update-supervisor-id/${id}/${sId}`,
      auth()
    );
  }
  getEmpIdForSupervisor() {
    // http://localhost:2022/api/v1/hr/Hr-dropDown
    return axios.get(`${BASE_URL}/api/v1/hr/Hr-dropDown`, auth());
  }
  updateDesg(id, dId) {
    // http://localhost:2022/api/v1/hr/update-desg-hierarchy?desgId=89&newSupId=984
    return axios.get(
      `${BASE_URL}/api/v1/hr/update-desg-hierarchy?desgId=${id}&newSupId=${dId}`,
      auth()
    );
  }
  //add employee
  AddResume(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.post(`${BASE_URL}/Resumeupload?id=${id}`, formData, auth());
  }
  AddImage(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.post(
      `${BASE_URL}/api/v1/emp/photo-upload?lancesoftId=${id}`,

      formData,
      auth()
    );
  }

  UpdateImage(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.put(
      `${BASE_URL}/api/v1/emp/update-photo?lancesoftId=${id}`,

      formData,
      auth()
    );
  }
  UpdateResume(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.put(`${BASE_URL}/ResumeUpdate?id=${id}`, formData, auth());
  }

  // HR DASHBOARD//
  getDesignations() {
    return axios.get(`${BASE_URL}/getAllDesignation`, auth());
  }
  selectEmployee(des_id) {
    return axios.get(`${BASE_URL}/getByDesignationId/${des_id}`, auth());
  }

  AssignTo(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }

  ReportsTo(lanceId) {
    return axios.get(`${BASE_URL}/ReportsToPrimary/${lanceId}`, auth());
  }

  secondarymanagerpromote(lanceId, primaryId) {
    return axios.get(
      `${BASE_URL}/ReportsToSecondary/${lanceId}/${primaryId}`,
      auth()
    );
  }

  // http://localhost:2022/ReportsToSecondary/{lanceId}/{primaryId}

  promoteEmp(emp_id, sub_id, sub_id2, newSalary) {
    return axios.get(
      `${BASE_URL}/PromoteEmpDetails/${emp_id}/${sub_id}/${sub_id2}/${newSalary}`,
      auth()
    );
  }

  // http://localhost:2022/PromoteEmpDetails/lsi013/LSI011/LSI003/987

  getDesignationses() {
    return axios.get(`${BASE_URL}/get-all-designations`, auth());
  }

  ReleaseEmps(des_id) {
    // return axios.get(`${BASE_URL}/getall`, auth());
    return axios.get(`${BASE_URL}/getByDesignationId/${des_id}`, auth());
  }

  // http://localhost:2022/getByDesignationId/{des_id}
  ReleaseEmpCmp(lancesoftId) {
    return axios.get(`${BASE_URL}/ReleaseEmp/${lancesoftId}`, auth());
  }

  //Abscond employee
  // AbscondEmo(id){
  //   return axios.get(`${BASE_URL}/getallemployees1/${id}`,auth())
  // }
  // AbscondEmoCmp(lancesoft){
  //   return axios.get(`${BASE_URL}/getemp1/${lancesoft}`,auth())
  // }

  //HR DASHBOARD// TRANSFER EMPLOYEE//
  getPromDesignations() {
    return axios.get(`${BASE_URL}/getAllDesignation`, auth());
  }
  selectEmployeeprom(id) {
    return axios.get(`${BASE_URL}/getByDesignation?des_id=${id}`, auth());
  }
  AssignToprom(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }
  ReleaseEmpprom(id) {
    return axios.get(
      `${BASE_URL}/reportstodropdownsuperadmin?LancesoftId=${id}`,
      auth()
    );
  }
  secondarymanagertransfer(empId, mgrId) {
    return axios.get(
      `${BASE_URL}/secondaryreportstodropdownsuperadmin?LancesoftId=${empId}&primaryLancesoftId=${mgrId}`,
      auth()
    );
  }

  // http://localhost:2022/secondaryreportstodropdownsuperadmin?LancesoftId=LSI006&primaryManagerID=LSI5200
  AssigntransferEmp(id, id2) {
    return axios.get(`${BASE_URL}/setSupervisor/${id}/${id2}`, auth());
  }
  // promotetransferEmp(id, id2, Salary, Location) {
  //   return axios.get(
  //     `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Location}&Salary=${Salary}&TansferLancesoftId=${id2}`,
  //     auth()
  //   );
  // }
  // http://localhost:2022/transfer?LancesoftId=LSI006&Location=ff&Salary=0.0&primaryLancesoftId=LSI5200&secondaryLancesoftId=null

  promotetransferEmp(id, id2, id3, Salary, Location) {
    return axios.get(
      `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Salary}&Salary=${Location}&primaryLancesoftId=${id2}&secondaryLancesoftId=${id3}`,
      auth()
    );
  }
  // TRANSFER EMPLOYEE END //
  selectEmployeeReq() {
    return axios.get(`${BASE_URL}/getOnHoldEmployees`, auth());
  }
  selectEmployeeAssign(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }
  GetAllEmployes(pageNumber, pageSize) {
    return axios.get(
      `${BASE_URL}/api/v1/hr/card-detail?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      auth()
    );
  }
  SearchEmployees(data) {
    return axios.get(`${BASE_URL}/api/v1/hr/search?keyword=${data}`, auth());
  }
  ApproveEmployee(lancesoft, emp_status) {
    return axios.get(`${BASE_URL}/send/${lancesoft}/${emp_status}`, auth());
  }
  // generalTransferEmplloyee(name) {
  //   return axios.get(
  //     `${BASE_URL}/getAllEmployeeUndercurrentlogin?name=${name}`,
  //     auth()
  //   );
  // }
  generalTransferEmplloyee(name) {
    return axios.get(
      // `${BASE_URL}/getAllEmployeeUndercurrentlogin?name=${name}`,
      // auth()
      `${BASE_URL}/consultants`,
      auth()
    );
  }
  // generalSelectEmploye(id) {
  //   return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  // }
  // generalAssignEmployee(id) {
  //   return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  // }
  ReleaseEmployee(id) {
    return axios.get(
      // `${BASE_URL}/principalDesignationsDropdown?name=${name}`,
      // auth()
      `${BASE_URL}/reportstodropdown?LancesoftId=${id}`,
      auth()
    );
  }
  TransferEmplo(id, id2) {
    return axios.post(
      `${BASE_URL}/saveAndNext?LancesoftId=${id}&assign_id=${id2}`,

      auth()
    );
  }
  transferEmpgeneral(id, id2, Salary, Location) {
    return axios.get(
      `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Location}&Salary=${Salary}&TansferLancesoftId=${id2}`,
      auth()
    );
  }
  GetAllEmployesby(pageNumber, pageSize) {
    return axios.get(
      `${BASE_URL}/api/v1/emp/repotees?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      auth()
    );
  }
  getSelectEmp() {
    return axios.get(`${BASE_URL}/api/v1/emp/client-emp-dropdown`, auth());
  }
  getEmpdetail(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-clients?empId=${id}`,
      auth()
    );
  }
  getClientDetail(id) {
    return axios.get(
      `${BASE_URL}/api/v1/emp/edit-client-req?clientDetailId=${id}`,
      auth()
    );
  }
  getClients() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  selectPractice() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  selectPractices() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  getEmploy(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/consultants?lancesoftId=${id}&subDId=${value}`,
      auth()
    );
  }

  getEmploys(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/consultants?lancesoftId=${id}&subDId=${value}`,
      auth()
    );
  }
  selectempdesgination() {
    return axios.get(`${BASE_URL}/api/v1/drop-down/designaton`, auth());
  }
  selectempdesgns(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-by-desig?desgId=${id}&keyword=${value}`,
      auth()
    );
  }
  secondarymanager(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/report-to-desigs?desigId=${id}`,
      auth()
    );
  }
  selectmanager(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-by-desig?desgId=${id}&keyword=${value}`,
      auth()
    );
  }

  setsecondarymanager(id, id2, data) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/subordinate-manager?empId=${id}&flag=false&supervisorId=${id2}`,
      data,
      auth()
    );
  }
  setsecondaryfor(id, id2, data) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/subordinate-manager?empId=${id}&flag=true&supervisorId=${id2}`,
      data,
      auth()
    );
  }

  //AbscondEmployee
  getAllEmployees1(id) {
    return axios.get(`${BASE_URL}/getByDesignationId/${id}`, auth());
  }

  abscondEmp(lancesoft) {
    return axios.get(`${BASE_URL}/AbscondEmp/${lancesoft}`, auth());
  }

  //Demote employee
  //alldesignations
  getAllDemoteDesignation() {
    return axios.get(`${BASE_URL}/getAllDemoteDesignations`, auth());
  }
  //select emp
  getAllDesignationEmployees(id, data) {
    return axios.post(
      `${BASE_URL}/getAlldesignationEmployees/${id}`,
      data,
      auth()
    );
  }
  // primary manager reports to
  addSupervisor(lanceId) {
    return axios.get(`${BASE_URL}/addSupervisor/${lanceId}`, auth());
  }
  // secondary manager reports to
  addSecondarySupervisor(empId, superId) {
    return axios.get(
      `${BASE_URL}/addSecondSupervisor?empId=${empId}&superId=${superId}`,
      auth()
    );
  }
  //submit
  demoteEmp(id, id1, id2, Salary) {
    return axios.get(
      `${BASE_URL}/demote/${id}/${id1}/${id2}/${Salary}`,
      auth()
    );
  }

  //Delete Employee
  DesinationsForDeleteModule() {
    return axios.get(
      `${BASE_URL}/api/v1/admin/ShowDesinationsForDeleteModule`,
      auth()
    );
  }

  ShowEmployeesToDelete(empid) {
    return axios.get(
      `${BASE_URL}/api/v1/admin/ShowEmployeesToDelete/${empid}`,
      auth()
    );
  }

  deleteEmployee(lancesoftid) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/delete-employee/${lancesoftid}`,
      auth()
    );
  }

  ShowEmployeesToDelete(empid) {
    return axios.get(
      `${BASE_URL}/api/v1/admin/ShowEmployeesToDelete/${empid}`,
      auth()
    );
  }

  deleteEmployee(lancesoft) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/delete-employee/${lancesoft}/${false}`,
      auth()
    );
  }
  deleteEmployeefor(lancesoft) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/delete-employee/${lancesoft}/${true}`,
      auth()
    );
  }
})();

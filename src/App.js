import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AddEmployee from "./pages/addEmployee/AddEmployee";
import EditEmployee from "./pages/addEmployee/EditEmployee";
import PrivateRoutes from "./routes/PrivateRoutes";
// import PromoteEmployee from "./pages/promoteEmployee/PromoteEmployee";
import ExitEmployee from "./pages/exitEmployee/ExitEmployee";
import Finance from "./components/finance/Finance";
import ClientDomestic from "./pages/clientDomestic/ClientDomestic";
import InternalDomestic from "./pages/internalDomestic/InternalDomestic";
import ClientInternational from "./pages/clientinternational/ClientInternational";
import InternalInternational from "./pages/internalInternational/InternalInternational";
import MD from "./pages/md/MD";
import Manager from "./pages/manager/Manager";
import AddClientDetails from "./pages/addClientDetails/AddClientDetails";
import Lead from "./pages/lead/Lead";
import { GeneralManager } from "./pages/generalmanager/GeneralManager";
import { Ch } from "./pages/ch/Ch";
import AddClientNames from "./pages/addClientNames/AddClientNames";
import Register from "./pages/register/Register";
import AddDepartment from "./pages/addDepartment/AddDepartment";
import { AddSubDepartment } from "./pages/addSubDepartment/AddSubDepartment";
import { AddDesignation } from "./pages/addDesignation/AddDesignation";
import { AddEmpType } from "./pages/addEmpType/AddEmpType";
import { AddAddressType } from "./pages/addAddressType/AddAddressType";
import UpdateSupervisor from "./pages/updateSupervisor/UpdateSupervisor";
import { UpdateDesignation } from "./pages/updateDesignation/UpdateDesignation";
import Home from "./pages/home/Home";
import TransferEmployee from "./pages/transferEmployee/TransferEmployee";
import ReleaseRequest from "./pages/releaseRequest/ReleaseRequest";
import EditClientDetails from "./pages/editClientDetails/EditClientDetails";
import Subordinatesupervisior from "./components/subordinatesupervisior/Subordinatesupervisior";
// import DemoteEmployee from "./pages/demoteEmployee/DemoteEmployee";
import AbscondEmployee from "./pages/abscondEmployee/AbscondEmployee";
import ModelComponent from "./modelComponent/ModelComponent";
import EmployeeProfile from "./pages/employeeProfile/EmployeeProfile";
import DeleteEmployee from "./pages/deleteEmployee/DeleteEmployee";

import AddAllowance from "./pages/AddAllowance/AddAllowance";

import TerminateEmployee from "./pages/terminateEmployee/TerminateEmployee";
import Updatesalary from "./pages/updatesalary/Updatesalary";
import PromoteDemote from "./pages/promoteDemote/PromoteDemote";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Recruiter from "./components/Recruiter/Recruiter";
import AssignResponsibilites from "./pages/assignResponsibilites/AssignResponsibilites";
import RecruiterDashboard from "./pages/recruiterDashboard/RecruiterDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="transferEmployee"
            element={
              <PrivateRoutes>
                <TransferEmployee />
              </PrivateRoutes>
            }
          />

          <Route
            path="releaseRequest"
            element={
              <PrivateRoutes>
                <ReleaseRequest />
              </PrivateRoutes>
            }
          />

          <Route path="/hr">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />

            <Route
              path="register"
              element={
                <PrivateRoutes>
                  <Register />
                </PrivateRoutes>
              }
            />
            <Route
              path="addEmployee"
              element={
                <PrivateRoutes>
                  <AddEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="editEmployee"
              element={
                <PrivateRoutes>
                  <EditEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="employeeProfile"
              element={
                <PrivateRoutes>
                  <EmployeeProfile />
                </PrivateRoutes>
              }
            />
            <Route
              path="deleteEmployee"
              element={
                <PrivateRoutes>
                  <DeleteEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="Recruiter"
              element={
                <PrivateRoutes>
                  <Recruiter />
                </PrivateRoutes>
              }
            />
              <Route
              path="recruiterDashboard"
              element={
                <PrivateRoutes>
                  <RecruiterDashboard />
                </PrivateRoutes>
              }
            />
            <Route
              path="addDepartment"
              element={
                <PrivateRoutes>
                  <AddDepartment />
                </PrivateRoutes>
              }
            />
            <Route
              path="addSubDepartment"
              element={
                <PrivateRoutes>
                  <AddSubDepartment />
                </PrivateRoutes>
              }
            />
            <Route
              path="addDesignation"
              element={
                <PrivateRoutes>
                  <AddDesignation />
                </PrivateRoutes>
              }
            />

            <Route
              path="addAddressType"
              element={
                <PrivateRoutes>
                  <AddAddressType />
                </PrivateRoutes>
              }
            />
            <Route
              path="updateDesignation"
              element={
                <PrivateRoutes>
                  <UpdateDesignation />
                </PrivateRoutes>
              }
            />
            <Route
              path="addEmpType"
              element={
                <PrivateRoutes>
                  <AddEmpType />
                </PrivateRoutes>
              }
            />
            {/* <Route
              path="promoteEmployee"
              element={
                <PrivateRoutes>
                  <PromoteEmployee />
                </PrivateRoutes>
              }
            /> */}

            <Route
              path="AbscondEmployee"
              element={
                <PrivateRoutes>
                  <AbscondEmployee />
                </PrivateRoutes>
              }
            />
            {/* <Route
              path="demoteEmployee"
              element={
                <PrivateRoutes>
                  <DemoteEmployee />
                </PrivateRoutes>
              }
            /> */}
            <Route
              path="promoteDemote"
              element={
                <PrivateRoutes>
                  <PromoteDemote />
                </PrivateRoutes>
              }
            />

            <Route
              path="terminateEmployee"
              element={
                <PrivateRoutes>
                  <TerminateEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="Updatesalary"
              element={
                <PrivateRoutes>
                  <Updatesalary />
                </PrivateRoutes>
              }
            />

            <Route
              path="AddAllowance"
              element={
                <PrivateRoutes>
                  <AddAllowance />
                </PrivateRoutes>
              }
            />

            <Route
              path="assignResponsibilities"
              element={
                <PrivateRoutes>
                  <AssignResponsibilites />
                </PrivateRoutes>
              }
            />

            <Route
              path="subordinatesupervisior"
              element={
                <PrivateRoutes>
                  <Subordinatesupervisior />
                </PrivateRoutes>
              }
            />
            <Route
              path="exitEmployee"
              element={
                <PrivateRoutes>
                  <ExitEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="updateSupervisorId"
              element={
                <PrivateRoutes>
                  <UpdateSupervisor />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route path="/finance">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Finance />
                </PrivateRoutes>
              }
            />
            <Route
              path="clientDomestic"
              element={
                <PrivateRoutes>
                  <ClientDomestic />
                </PrivateRoutes>
              }
            />
            <Route
              path="internalDomestic"
              element={
                <PrivateRoutes>
                  <InternalDomestic />
                </PrivateRoutes>
              }
            />
            <Route
              path="clientInternational"
              element={
                <PrivateRoutes>
                  <ClientInternational />
                </PrivateRoutes>
              }
            />
            <Route
              path="internalInternational"
              element={
                <PrivateRoutes>
                  <InternalInternational />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route path="modelComponent">
            <Route
              index
              element={
                <PrivateRoutes>
                  <ModelComponent />
                </PrivateRoutes>
              }
            />
          </Route>

          <Route
            path="/md"
            element={
              <PrivateRoutes>
                <MD />
              </PrivateRoutes>
            }
          />
          <Route
            path="/vicepresident"
            element={
              <PrivateRoutes>
                <MD />
              </PrivateRoutes>
            }
          />
          <Route path="/manager">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Manager />
                </PrivateRoutes>
              }
            />
            <Route
              path="addClientDetails"
              element={
                <PrivateRoutes>
                  <AddClientDetails />
                </PrivateRoutes>
              }
            />
            <Route
              path="addClientNames"
              element={
                <PrivateRoutes>
                  <AddClientNames />
                </PrivateRoutes>
              }
            />
            <Route
              path="editClientDetails"
              element={
                <PrivateRoutes>
                  <EditClientDetails />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route
            path="/lead"
            element={
              <PrivateRoutes>
                <Lead />
              </PrivateRoutes>
            }
          />
          <Route
            path="/general_manager"
            element={
              <PrivateRoutes>
                <GeneralManager />
              </PrivateRoutes>
            }
          />
          <Route
            path="/changePassword"
            element={
              <PrivateRoutes>
                <ChangePassword />
              </PrivateRoutes>
            }
          />
          <Route
            path="/ch"
            element={
              <PrivateRoutes>
                <Ch />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

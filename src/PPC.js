// import React from 'react';
// import Login from './login/Login'
// import Dashboard from './dashboard/Dashboard'
// import CreateUser from './createUser/CreateUser'
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Transmital from './Project/Engineering/dcc/main/Create-Transmital'
// import SubsidiaryTransmital from './Project/Engineering/dcc/subsidiary/Create-Transmital'
// import EditProfile from './edit-profile/EditProfile'
// import Table from './table/table'
// import NotFound from './404/404'
// import ListUser from './list-user/userlist'
// import DCC from './Project/Engineering/dcc/dcc'
// import ShowTransmittal from './Project/Engineering/dcc/main/ShowTransmittal'
// import VendorShowTransmittal from './Project/vendorTransmittal/ShowTransmittal'
// import InternalShowTransmittal from './Project/Engineering/dcc/subsidiary/ShowTransmittal'
// import Mokatebat from './Project/Mokatebat/Mokatebat'
// import EditMokatebat from './Project/Mokatebat/Edit'
// import EditTransmittal from './Project/Engineering/dcc/main/EditTransmittal'
// import InternalEditTransmittal from './Project/Engineering/dcc/subsidiary/EditTransmittal'
// import VendorEditTransmittal from './Project/vendorTransmittal/EditTransmittal'
// import indexMokatebat from './Project/Mokatebat/index-Mokatebat'
// import MokatebatDisabled from './Project/Mokatebat/MokatebatDisabled'
// import FieldEngineering from './Project/Engineering/FieldEngineering'
// import CommodityEngineering from './Project/Engineering/commodityEngineering'
// import Endorsement from './Project/Engineering/Endorsement'
// import CreateGallery from './gallery/Create'
// import Gallery from './gallery/Gallery'
// import EditGallery from './gallery/Edit'
// import Archive from './gallery/archive'
// import Mre from './mre/Mre'
// import AVL from './avl/Avl'
// import Index_Avl from './avl/index-Avl'
// import CreateMeeting from './Meeting-management/Create'
// import CreateMeeting2 from './Meeting-management/second-section'
// import CreateMeeting3 from './Meeting-management/third-section'
// import DashboardLibrary from './library/dashboard'
// import IndexLibrary from './library/index-library'
// import DailyReport from './daily-report/Daily-report'
// import Contact from './contact/index-contact'
// import EditContact from './contact/edit'
// import CreateContact from './contact/create'
// import IndexMetting from './Meeting-management/index-metting'
// import SystemManagement from './System-management/SystemManagement'
// import EditMetting from './Meeting-management/edit-metting'
// import EditSecond from './Meeting-management/edit-second'
// import CreateVendorTransmittal from './Project/vendorTransmittal/Transmital'
// import CreateVendorDocument from './Project/Engineering/vendorDocument/CreateVendor'
// import IndexReports from './Project/Engineering/dcc/reports/index-reports'
// import ViewProceedings from './Meeting-management/ViewProceedings'
// import forgotPassword from './forgotPassword/forgotPassword'
// import CreateMdl from './Project/Engineering/dcc/DocumentControlCenter/CreateMdl'
// import Calendar from './Tools/Calendar/Calendar'
// import StandardRequest from './library/StandardRequest'
// import TSR from './TSR/TSR'
// import IndexTSR from './TSR/IndexTSR'
// import TechnicalReport from './ARP/TechnicalReport'
// import ReportVariousDisciplines from './ARP/ReportVariousDisciplines'
// import ReviewReports from './ARP/ReviewReports'
// import CorrectiveActions from './ARP/CorrectiveActions'
// import IndexARP from './ARP/IndexARP'
// import TechnicalArchiveEngineering from './TechnicalArchive/TechnicalArchiveEngineering'
// import TechnicalArchiveFinalBooklet from './TechnicalArchive/TechnicalArchiveFinalBooklet'
// import TechnicalArchiveBirthCertificate from './TechnicalArchive/TechnicalArchiveBirthCertificate'
// import Chat from './Tools/Chat/Chat'
// import CreateUserGroup from './createUser/CreateUserGroup'
// import IndexUserGroup from './createUser/IndexUserGroup'
// import EditUserGroup from './createUser/EditUserGroup'

// import IndexBuilder from './index-builder/IndexBuilder'

// const Routes = (
//   <Router>
//     <Switch>
//       <Route exact path="/" component={Dashboard} />
//       <Route exact path="/Home" component={Dashboard} />
//       <Route exact path="/Login" component={Login} />
//       <Route exact path="/forgetPassword" component={forgotPassword} />
//       <Route exact path="/index-reports" component={IndexReports} />
//       <Route exact path="/Create-Transmital" component={Transmital} />
//       <Route exact path="/Create-SubsidiaryTransmital" component={SubsidiaryTransmital} />
//       <Route exact path="/Create-User" component={CreateUser} />
//       <Route exact path="/Edit-Profile" component={EditProfile} />
//       <Route exact path="/Table" component={Table} />
//       <Route exact path="/list-user" component={ListUser} />
//       <Route exact path="/dcc" component={DCC} />
//       <Route exact path="/correspondence" component={indexMokatebat} />
//       <Route exact path="/Create-correspondence" component={Mokatebat} />
//       <Route exact path="/edit-correspondence-:id" component={EditMokatebat} />
//       <Route exact path="/transmittal-:id" component={ShowTransmittal} />
//       <Route exact path="/vendorTransmittal-:id" component={VendorShowTransmittal} />
//       <Route exact path="/InternalTransmittal-:id" component={InternalShowTransmittal} />
//       <Route exact path="/editTransmittal-:id" component={EditTransmittal} />
//       <Route exact path="/VendorEditTransmittal-:id" component={VendorEditTransmittal} />
//       <Route exact path="/InternalEditTransmittal-:id" component={InternalEditTransmittal} />
//       <Route exact path="/correspondence-:id" component={MokatebatDisabled} />
//       <Route exact path="/field-engineering" component={FieldEngineering} />
//       <Route exact path="/purchase-engineering" component={CommodityEngineering} />
//       <Route exact path="/create-gallery" component={CreateGallery} />
//       <Route exact path="/gallery" component={Gallery} />
//       <Route exact path="/edit-gallery-:id" component={EditGallery} />
//       <Route exact path="/Endorsement" component={Endorsement} />
//       <Route exact path="/archive-gallery" component={Archive} />
//       <Route exact path="/create-mre" component={Mre} />
//       <Route exact path="/create-meeting" component={CreateMeeting} />
//       <Route exact path="/enter-meeting-:id" component={CreateMeeting2} />
//       <Route exact path="/signature-metting-:id" component={CreateMeeting3} />
//       <Route exact path="/create-avl" component={AVL} />
//       <Route exact path="/avl" component={Index_Avl} />
//       <Route exact path="/dashboard_library" component={DashboardLibrary} />
//       <Route exact path="/indexLibrary-:name" component={IndexLibrary} />

//       <Route exact path="/daily-report" component={DailyReport} />
//       <Route exact path="/contact" component={Contact} />
//       <Route exact path="/edit-contact-:id" component={EditContact} />
//       <Route exact path="/create-contact" component={CreateContact} />
//       <Route exact path="/index-metting" component={IndexMetting} />
//       <Route exact path="/vendor-transmittal" component={CreateVendorTransmittal} />
//       <Route exact path="/system-management" component={SystemManagement} />
//       <Route exact path="/edit-metting-:id" component={EditMetting} />
//       <Route exact path="/ViewProceedings-:id" component={ViewProceedings} />
//       <Route exact path="/edit-enter-:id" component={EditSecond} />
//       <Route exact path="/create-vendor-document" component={CreateVendorDocument} />
//       <Route exact path="/create-mdl" component={CreateMdl} />
//       <Route exact path="/TSR" component={TSR} />
//       <Route exact path="/index-TSR" component={IndexTSR} />
//       <Route exact path="/index-ARP" component={IndexARP} />
//       <Route exact path="/technical-report" component={TechnicalReport} />
//       <Route exact path="/various-disciplines-report" component={ReportVariousDisciplines} />
//       <Route exact path="/review-reports" component={ReviewReports} />
//       <Route exact path="/corrective-actions" component={CorrectiveActions} />
//       <Route exact path="/engineering-document" component={TechnicalArchiveEngineering} />
//       <Route exact path="/final-data-book" component={TechnicalArchiveFinalBooklet} />
//       <Route exact path="/equipment-identify" component={TechnicalArchiveBirthCertificate} />

//       <Route exact path="/Chat" component={Chat} />
//       <Route exact path="/create-user-group" component={CreateUserGroup} />
//       <Route exact path="/index-user-group" component={IndexUserGroup} />
//       <Route exact path="/edit-user-group-:id" component={EditUserGroup} />

//       <Route exact path="/calendar" component={Calendar} />
//       <Route exact path="/standard-request" component={StandardRequest} />
//       <Route exact path="/index-builder" component={IndexBuilder} />

//       <Route exact path="/404" component={NotFound} />
//       <Redirect to="/404" />
//     </Switch>
//   </Router>
// )
// export default Routes

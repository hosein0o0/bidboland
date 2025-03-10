import React from 'react'
import Login from './login/Login'
import Dashboard from './dashboard/Dashboard'
import CreateUser from './createUser/CreateUser'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Transmital from './Project/Engineering/dcc/main/Create-Transmital'
import SubsidiaryTransmital from './Project/Engineering/dcc/subsidiary/Create-Transmital'
import EditProfile from './edit-profile/EditProfile'
import Table from './table/table'
import TqForm from './Project/TQ/TqForm'
import TableTq from './Project/TQ/TqTable'
import CompleteTQ from './Project/TQ/complete'
import NotFound from './404/404'
import ListUser from './list-user/userlist'
import DCC from './Project/Engineering/dcc/dcc'
import ShowTransmittal from './Project/Engineering/dcc/main/ShowTransmittal'
import VendorShowTransmittal from './Project/vendorTransmittal/ShowTransmittal'
import InternalShowTransmittal from './Project/Engineering/dcc/subsidiary/ShowTransmittal'
import Mokatebat from './Project/Mokatebat/Mokatebat'
import EditMokatebat from './Project/Mokatebat/Edit'
import EditTransmittal from './Project/Engineering/dcc/main/EditTransmittal'
import InternalEditTransmittal from './Project/Engineering/dcc/subsidiary/EditTransmittal'
import VendorEditTransmittal from './Project/vendorTransmittal/EditTransmittal'
import indexMokatebat from './Project/Mokatebat/index-Mokatebat'
import MokatebatDisabled from './Project/Mokatebat/MokatebatDisabled'
import FieldEngineering from './Project/Engineering/FieldEngineering'
import CommodityEngineering from './Project/Engineering/commodityEngineering'
import Endorsement from './Project/Engineering/Endorsement'
import CreateGallery from './gallery/Create'
import Gallery from './gallery/Gallery'
import EditGallery from './gallery/Edit'
import Archive from './gallery/archive'
import Mre from './mre/Mre'
import AVL from './avl/Avl'
import IndexAvl from './avl/index-Avl'
import CreateMeeting from './Meeting-management/Create'
import CreateMeeting2 from './Meeting-management/second-section'
import CreateMeeting3 from './Meeting-management/third-section'
import Library from './library/library'
import DailyReport from './daily-report/Daily-report'
import Contact from './contact/index-contact'
import EditContact from './contact/edit'
import CreateContact from './contact/create'
import IndexMetting from './Meeting-management/index-metting'
import SystemManagement from './System-management/SystemManagement'
import EditMetting from './Meeting-management/edit-metting'
import EditSecond from './Meeting-management/edit-second'
import CreateVendorTransmittal from './Project/vendorTransmittal/Transmital'
import CreateVendorDocument from './Project/Engineering/vendorDocument/CreateVendor'
import IndexReports from './Project/Engineering/dcc/reports/index-reports'
import ViewProceedings from './Meeting-management/ViewProceedings'
// import forgotPassword from './forgotPassword/forgotPassword'
import CreateMdl from './Project/Engineering/dcc/DocumentControlCenter/CreateMdl'
import DashboardLibrary from './library/dashboard'
import IndexLibrary from './library/index-library'
import Calendar from './Tools/Calendar/Calendar'
import StandardRequest from './library/StandardRequest'
import CreateUserGroup from './createUser/CreateUserGroup'
import IndexUserGroup from './createUser/IndexUserGroup'
import EditUserGroup from './createUser/EditUserGroup'
import OrderRFQ from './RFQ/order'
import UploadFileRFQ from './RFQ/uploadFile'
import UploadDocuments from './RFQ/UploadDocuments'
import CommentSheetRFQ from './RFQ/CommentSheet'
import RFQ from './RFQ/RFQ'
import IndexNotification from './notification/index-Notification'
import IndexBuilder from './index-builder/IndexBuilder'
import DynamicIndex from './index-builder/DynamicIndex'
import InternalPhonebook from './Tools/InternalPhonebook/InternalPhonebook'
import Chat from './Tools/Chat/Chat'
import FAQ from './FAQ/FAQ'
const Routes = (
  <Router>
    <Switch>
      <Route exact path='/' render={props => <Dashboard {...props} />} />
      <Route exact path='/Home' render={props => <Dashboard {...props} />} />
      <Route exact path='/Login' render={props => <Login {...props} />} />
      <Route
        exact
        path='/forgetPassword'
        render={props => <forgotPassword {...props} />}
      />
      <Route
        exact
        path='/index-reports'
        render={props => <IndexReports {...props} />}
      />
      <Route
        exact
        path='/Create-Transmital'
        render={props => <Transmital {...props} />}
      />
      <Route
        exact
        path='/Create-SubsidiaryTransmital'
        render={props => <SubsidiaryTransmital {...props} />}
      />
      <Route
        exact
        path='/Create-User'
        render={props => <CreateUser {...props} />}
      />
      <Route
        exact
        path='/Edit-Profile'
        render={props => <EditProfile {...props} />}
      />
      <Route exact path='/Table' render={props => <Table {...props} />} />
      <Route exact path='/tq-Create' render={props => <TqForm {...props} />} />
      <Route exact path='/tq-index' render={props => <TableTq {...props} />} />
      <Route exact path='/tq-:id' render={props => <CompleteTQ {...props} />} />
      <Route
        exact
        path='/list-user'
        render={props => <ListUser {...props} />}
      />
      <Route exact path='/project-engineering' render={props => <DCC {...props} />} />
      <Route
        exact
        path='/correspondence'
        render={props => <indexMokatebat {...props} />}
      />
      <Route
        exact
        path='/Create-correspondence'
        render={props => <Mokatebat {...props} />}
      />
      <Route
        exact
        path='/edit-correspondence-:id'
        render={props => <EditMokatebat {...props} />}
      />
      <Route
        exact
        path='/transmittal-:id'
        render={props => <ShowTransmittal {...props} />}
      />
      <Route
        exact
        path='/vendorTransmittal-:id'
        render={props => <VendorShowTransmittal {...props} />}
      />
      <Route
        exact
        path='/InternalTransmittal-:id'
        render={props => <InternalShowTransmittal {...props} />}
      />
      <Route
        exact
        path='/editTransmittal-:id'
        render={props => <EditTransmittal {...props} />}
      />
      <Route
        exact
        path='/VendorEditTransmittal-:id'
        render={props => <VendorEditTransmittal {...props} />}
      />
      <Route
        exact
        path='/InternalEditTransmittal-:id'
        render={props => <InternalEditTransmittal {...props} />}
      />
      <Route
        exact
        path='/correspondence-:id'
        render={props => <MokatebatDisabled {...props} />}
      />
      <Route
        exact
        path='/field-engineering'
        render={props => <FieldEngineering {...props} />}
      />
      <Route
        exact
        path='/purchase-engineering'
        render={props => <CommodityEngineering {...props} />}
      />
      <Route
        exact
        path='/create-gallery'
        render={props => <CreateGallery {...props} />}
      />
      <Route exact path='/gallery' render={props => <Gallery {...props} />} />
      <Route
        exact
        path='/edit-gallery-:id'
        render={props => <EditGallery {...props} />}
      />
      <Route
        exact
        path='/Endorsement'
        render={props => <Endorsement {...props} />}
      />
      <Route
        exact
        path='/archive-gallery'
        render={props => <Archive {...props} />}
      />
      <Route exact path='/create-mre' render={props => <Mre {...props} />} />
      <Route
        exact
        path='/create-meeting'
        render={props => <CreateMeeting {...props} />}
      />
      <Route
        exact
        path='/enter-meeting-:id'
        render={props => <CreateMeeting2 {...props} />}
      />
      <Route
        exact
        path='/signature-metting-:id'
        render={props => <CreateMeeting3 {...props} />}
      />
      <Route exact path='/create-avl' render={props => <AVL {...props} />} />
      <Route exact path='/avl' render={props => <IndexAvl {...props} />} />
      <Route exact path='/library' render={props => <Library {...props} />} />
      <Route
        exact
        path='/daily-report'
        render={props => <DailyReport {...props} />}
      />
      <Route exact path='/contact' render={props => <Contact {...props} />} />
      <Route
        exact
        path='/edit-contact-:id'
        render={props => <EditContact {...props} />}
      />
      <Route
        exact
        path='/create-contact'
        render={props => <CreateContact {...props} />}
      />
      <Route
        exact
        path='/index-metting'
        render={props => <IndexMetting {...props} />}
      />
      <Route
        exact
        path='/vendor-transmittal'
        render={props => <CreateVendorTransmittal {...props} />}
      />
      <Route
        exact
        path='/system-management'
        render={props => <SystemManagement {...props} />}
      />
      <Route
        exact
        path='/edit-metting-:id'
        render={props => <EditMetting {...props} />}
      />
      <Route
        exact
        path='/ViewProceedings-:id'
        render={props => <ViewProceedings {...props} />}
      />
      <Route
        exact
        path='/edit-enter-:id'
        render={props => <EditSecond {...props} />}
      />
      <Route
        exact
        path='/create-vendor-document'
        render={props => <CreateVendorDocument {...props} />}
      />
      <Route
        exact
        path='/create-mdl'
        render={props => <CreateMdl {...props} />}
      />
      <Route
        exact
        path='/dashboard_library'
        render={props => <DashboardLibrary {...props} />}
      />
      <Route
        exact
        path='/indexLibrary-:name'
        render={props => <IndexLibrary {...props} />}
      />
      <Route exact path='/calendar' render={props => <Calendar {...props} />} />
      <Route
        exact
        path='/standard-request'
        render={props => <StandardRequest {...props} />}
      />
      <Route
        exact
        path='/create-user-group'
        render={props => <CreateUserGroup {...props} />}
      />
      <Route
        exact
        path='/index-user-group'
        render={props => <IndexUserGroup {...props} />}
      />
      <Route
        exact
        path='/edit-user-group-:id'
        render={props => <EditUserGroup {...props} />}
      />
      <Route
        exact
        path='/order-rfq'
        render={props => <OrderRFQ {...props} />}
      />
      <Route
        exact
        path='/uploadFile-rfq'
        render={props => <UploadFileRFQ {...props} />}
      />
      <Route
        exact
        path='/uploadDocuments-rfq'
        render={props => <UploadDocuments {...props} />}
      />
      <Route
        exact
        path='/commentSheet-rfq'
        render={props => <CommentSheetRFQ {...props} />}
      />
      <Route
        exact
        path='/index-notification'
        render={props => <IndexNotification {...props} />}
      />
      <Route
        exact
        path='/index-builder'
        render={props => <IndexBuilder {...props} />}
      />
      <Route
        exact
        path='/dynamic-index-:id'
        render={props => <DynamicIndex {...props} />}
      />
      <Route
        exact
        path='/internal-phonebook'
        render={props => <InternalPhonebook {...props} />}
      />
      <Route exact path='/Chat' render={props => <Chat {...props} />} />
      <Route exact path='/RFQ' render={props => <RFQ {...props} />} />
      <Route exact path='/FAQ' render={props => <FAQ {...props} />} />
      <Route exact path='/404' render={props => <NotFound {...props} />} />
      <Redirect to='/404' />
    </Switch>
  </Router>
)
export default Routes

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
import IndexMokatebat from './Project/Mokatebat/index-Mokatebat'
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
import DashboardLibrary from './library/dashboard'
import IndexLibrary from './library/index-library'
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
import ForgotPassword from './forgotPassword/forgotPassword'
import CreateMdl from './Project/Engineering/dcc/DocumentControlCenter/CreateMdl'
import Calendar from './Tools/Calendar/Calendar'
import StandardRequest from './library/StandardRequest'
import IndexRequest from './library/IndexRequest'
// import TSR from './TSR/TSR'
import IndexTSR from './TSR/IndexTSR'
import ShowTSR from './TSR/ShowTSR'
import IndexARP from './ARP/IndexARP'
import ARP from './ARP/ARP'
import ShowArp from './ARP/ShowArp'
import TechnicalArchiveEngineering from './TechnicalArchive/TechnicalArchiveEngineering'
import TechnicalArchiveFinalBooklet from './TechnicalArchive/TechnicalArchiveFinalBooklet'
import TechnicalArchiveBirthCertificate from './TechnicalArchive/TechnicalArchiveBirthCertificate'
import TechnicalArchive from './TechnicalArchive/TechnicalArchive'
import Chat from './Tools/Chat/Chat'
import CreateUserGroup from './createUser/CreateUserGroup'
import IndexUserGroup from './createUser/IndexUserGroup'
import EditUserGroup from './createUser/EditUserGroup'
import IndexBuilder from './index-builder/IndexBuilder'
import DynamicIndex from './index-builder/DynamicIndex'
import ListIndexes from './index-builder/ListIndexes'
import InternalPhonebook from './Tools/InternalPhonebook/InternalPhonebook'
import CreateInternalPhonebook from './Tools/InternalPhonebook/Create'
import FAQ from './FAQ/FAQ'
import CreateFAQ from './FAQ/Create'
import EditFAQ from './FAQ/Edit'
import IndexFAQ from './FAQ/IndexFAQ'
import GeneralSearch from './layout/GeneralSearch'
import ResultPage from './layout/ResultPage'
import WBS from './WBS/WBS'
import DashbordPPC from './dashboard-ppc/dashboard'
import BasicEngineeringForm from './TechnicalArchive/BasicEngineeringForm'
import BasicEngineeringFormEdit from './TechnicalArchive/BasicEngineeringFormEdit'
import DetailedEngineeringForm from './TechnicalArchive/DetailedEngineeringForm'
import BuildersEngineeringForm from './TechnicalArchive/BuildersEngineeringForm'
import BuildersEngineeringFormEdit from './TechnicalArchive/BuildersEngineeringFormEdit'
import PFDForm from './TechnicalArchive/PFDForm'
import PFDFormEdit from './TechnicalArchive/PFDFormEdit'
import PAndIDForm from './TechnicalArchive/P&IDForm'
import PAndIDFormEdit from './TechnicalArchive/P&IDFormEdit'
import LineListForm from './TechnicalArchive/LineListForm'
import LineListFormEdit from './TechnicalArchive/LineListFormEdit'
import IsoMetricForm from './TechnicalArchive/IsoMetricForm'
import IsoMetricFormEdit from './TechnicalArchive/IsoMetricFormEdit'
import ModelForm3D from './TechnicalArchive/3DModelForm'
import ModelForm3DEdit from './TechnicalArchive/3DModelFormEdit'
import FinalEngineeringManualForm from './TechnicalArchive/FinalEngineeringManualForm'
import FinalEquipmentManualForm from './TechnicalArchive/FinalEquipmentManual/FinalEquipmentManualForm'
import BuildFinalBookletForm from './TechnicalArchive/BuildFinalBookletForm'
import WorkFailureStructureForm from './WBS/WorkFailureStructureForm'
import PurchasePackagesForm from './WBS/PurchasePackagesForm'
import ListEngineeringDocumentsForm from './WBS/ListEngineeringDocumentsForm'
import AttachedDocumentsPurchasePackagesForm from './WBS/AttachedDocumentsPurchasePackagesForm'
import KnowledgeManagement from './knowledgeManagement/knowledgeManagement'
import AcceptedForm from './knowledgeManagement/AcceptedForm'
import RegisteredForm from './knowledgeManagement/RegisteredForm'
import EquipmentID from './TechnicalArchive/EquipmentID/EquipmentID'
import CCS from './TechnicalArchive/CCS'
import PanelNotification from './notification/PanelNotification/PanelNotification'
import IndexNotification from './notification/index-Notification'
import ProductionCalculation from './DaraBI/ProductionCalculation'
import InstrumentForm from './TechnicalArchive/InstrumentForm'
import InstrumentFormEdit from './TechnicalArchive/InstrumentFormEdit'
import CreateCCS from './TechnicalArchive/CreateCCS'
import EditCCS from './TechnicalArchive/EditCCS'
import SendMessage from './notification/SendMessage'
import EditUser from './createUser/EditUser'
import LibraryManager from './library/LibraryManager'
import DocumentRegistration from './library/DocumentRegistration'
import IndexWriters from './library/IndexWriters'
import CreateWriters from './library/CreateWriters'
import IndexPublishers from './library/IndexPublishers'
import CreatePublishers from './library/CreatePublishers'
import Email from './Tools/E-mail/Email'
import EditDrafts from './Tools/E-mail/Drafts/Edit'
import PrintARP from './Print/ARP/form'
import FormTSR from './Print/TSR/form'
import TaskManagement from './Tools/TaskManagement/TaskManagement'
import MainChart from './Chart/Main'
import NewTsr from './tsrNew/tsr'
import DashboardDCC from './Project/Engineering/dcc/dashboard/dashboard'
import BaseIndex from './tsrNew/index/BaseIndex'
import ShowTsrNew from './tsrNew/ShowTsr/ShowTsr'
import NewTSRPrint from './Print/NewTSR/FORM'
const Routes = (
  <Router>
    <Switch>
      <Route
        exact
        path='/'
        nameUrl='dashboard'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'dashboard' } }
          return <Dashboard {...merge} />
        }}
      />
      <Route
        exact
        path='/Home'
        nameUrl='dashboard'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'dashboard' } }
          return <Dashboard {...merge} />
        }}
      />
      <Route
        exact
        path='/Login'
        nameUrl='Login'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Login' } }
          return <Login {...merge} />
        }}
      />
      <Route
        exact
        path='/forgetPassword'
        nameUrl='forgotPassword'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'forgotPassword' } }
          return <ForgotPassword {...merge} />
        }}
      />
      <Route
        exact
        path='/index-reports'
        nameUrl='IndexReports'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexReports' } }
          return <IndexReports {...merge} />
        }}
      />
      <Route
        exact
        path='/Create-Transmital'
        nameUrl='Transmital'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Transmital' } }
          return <Transmital {...merge} />
        }}
      />
      <Route
        exact
        path='/Create-SubsidiaryTransmital'
        nameUrl='SubsidiaryTransmital'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'SubsidiaryTransmital' } }
          return <SubsidiaryTransmital {...merge} />
        }}
      />
      <Route
        exact
        path='/Create-User'
        nameUrl='CreateUser'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateUser' } }
          return <CreateUser {...merge} />
        }}
      />
      <Route
        exact
        path='/Edit-User-:id'
        nameUrl='EditUser'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditUser' } }
          return <EditUser {...merge} />
        }}
      />
      <Route
        exact
        path='/Edit-Profile'
        nameUrl='EditProfile'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditProfile' } }
          return <EditProfile {...merge} />
        }}
      />
      <Route
        exact
        path='/list-user'
        nameUrl='ListUser'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ListUser' } }
          return <ListUser {...merge} />
        }}
      />
      <Route
        exact
        path='/project-engineering'
        nameUrl='project_engineering'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'project_engineering' } }
          return <DCC {...merge} />
        }}
      />
      <Route
        exact
        path='/correspondence'
        nameUrl='IndexMokatebat'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexMokatebat' } }
          return <IndexMokatebat {...merge} />
        }}
      />
      <Route
        exact
        path='/Create-correspondence'
        nameUrl='Mokatebat'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Mokatebat' } }
          return <Mokatebat {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-correspondence-:id'
        nameUrl='EditMokatebat'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditMokatebat' } }
          return <EditMokatebat {...merge} />
        }}
      />
      <Route
        exact
        path='/transmittal-:id'
        nameUrl='ShowTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ShowTransmittal' } }
          return <ShowTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/vendorTransmittal-:id'
        nameUrl='VendorShowTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'VendorShowTransmittal' } }
          return <VendorShowTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/InternalTransmittal-:id'
        nameUrl='InternalShowTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'InternalShowTransmittal' } }
          return <InternalShowTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/editTransmittal-:id'
        nameUrl='EditTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditTransmittal' } }
          return <EditTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/VendorEditTransmittal-:id'
        nameUrl='VendorEditTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'VendorEditTransmittal' } }
          return <VendorEditTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/InternalEditTransmittal-:id'
        nameUrl='InternalEditTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'InternalEditTransmittal' } }
          return <InternalEditTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/correspondence-:id'
        nameUrl='MokatebatDisabled'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'MokatebatDisabled' } }
          return <MokatebatDisabled {...merge} />
        }}
      />
      <Route
        exact
        path='/field-engineering'
        nameUrl='FieldEngineering'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'FieldEngineering' } }
          return <FieldEngineering {...merge} />
        }}
      />
      <Route
        exact
        path='/purchase-engineering'
        nameUrl='CommodityEngineering'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CommodityEngineering' } }
          return <CommodityEngineering {...merge} />
        }}
      />
      <Route
        exact
        path='/create-gallery'
        nameUrl='CreateGallery'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateGallery' } }
          return <CreateGallery {...merge} />
        }}
      />
      <Route
        exact
        path='/gallery'
        nameUrl='Gallery'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Gallery' } }
          return <Gallery {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-gallery-:id'
        nameUrl='EditGallery'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditGallery' } }
          return <EditGallery {...merge} />
        }}
      />
      <Route
        exact
        path='/Endorsement'
        nameUrl='Endorsement'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Endorsement' } }
          return <Endorsement {...merge} />
        }}
      />
      <Route
        exact
        path='/archive-gallery'
        nameUrl='Archive'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Archive' } }
          return <Archive {...merge} />
        }}
      />
      <Route
        exact
        path='/create-mre'
        nameUrl='Mre'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Mre' } }
          return <Mre {...merge} />
        }}
      />
      <Route
        exact
        path='/create-meeting'
        nameUrl='CreateMeeting'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateMeeting' } }
          return <CreateMeeting {...merge} />
        }}
      />
      <Route
        exact
        path='/enter-meeting-:id'
        nameUrl='CreateMeeting2'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateMeeting2' } }
          return <CreateMeeting2 {...merge} />
        }}
      />
      <Route
        exact
        path='/signature-metting-:id'
        nameUrl='CreateMeeting3'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateMeeting3' } }
          return <CreateMeeting3 {...merge} />
        }}
      />
      <Route
        exact
        path='/create-avl'
        nameUrl='AVL'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'AVL' } }
          return <AVL {...merge} />
        }}
      />
      <Route
        exact
        path='/avl'
        nameUrl='IndexAvl'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexAvl' } }
          return <IndexAvl {...merge} />
        }}
      />
      <Route
        exact
        path='/dashboard_library'
        nameUrl='DashboardLibrary'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DashboardLibrary' } }
          return <DashboardLibrary {...merge} />
        }}
      />
      <Route
        exact
        path='/indexLibrary-:name'
        nameUrl='IndexLibrary'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexLibrary' } }
          return <IndexLibrary {...merge} />
        }}
      />
      <Route
        exact
        path='/daily-report'
        nameUrl='DailyReport'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DailyReport' } }
          return <DailyReport {...merge} />
        }}
      />
      <Route
        exact
        path='/contact'
        nameUrl='Contact'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Contact' } }
          return <Contact {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-contact-:id'
        nameUrl='EditContact'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditContact' } }
          return <EditContact {...merge} />
        }}
      />
      <Route
        exact
        path='/create-contact'
        nameUrl='CreateContact'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateContact' } }
          return <CreateContact {...merge} />
        }}
      />
      <Route
        exact
        path='/index-metting'
        nameUrl='IndexMetting'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexMetting' } }
          return <IndexMetting {...merge} />
        }}
      />
      <Route
        exact
        path='/vendor-transmittal'
        nameUrl='CreateVendorTransmittal'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateVendorTransmittal' } }
          return <CreateVendorTransmittal {...merge} />
        }}
      />
      <Route
        exact
        path='/system-management'
        nameUrl='SystemManagement'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'SystemManagement' } }
          return <SystemManagement {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-metting-:id'
        nameUrl='EditMetting'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditMetting' } }
          return <EditMetting {...merge} />
        }}
      />
      <Route
        exact
        path='/ViewProceedings-:id'
        nameUrl='ViewProceedings'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ViewProceedings' } }
          return <ViewProceedings {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-enter-:id'
        nameUrl='EditSecond'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditSecond' } }
          return <EditSecond {...merge} />
        }}
      />
      <Route
        exact
        path='/create-vendor-document'
        nameUrl='CreateVendorDocument'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateVendorDocument' } }
          return <CreateVendorDocument {...merge} />
        }}
      />
      <Route
        exact
        path='/create-mdl'
        nameUrl='CreateMdl'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateMdl' } }
          return <CreateMdl {...merge} />
        }}
      />
      {/* <Route
        exact
        path='/TSR'
        nameUrl='TSR'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'TSR' } }
          return <TSR {...merge} />
        }}
      /> */}
      <Route
        exact
        path='/index-TSR'
        nameUrl='IndexTSR'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexTSR' } }
          return <IndexTSR {...merge} />
        }}
      />
      <Route
        exact
        path='/TSR-:id'
        nameUrl='ShowTSR'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ShowTSR' } }
          return <ShowTSR {...merge} />
        }}
      />
      <Route
        exact
        path='/index-ARP'
        nameUrl='IndexARP'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexARP' } }
          return <IndexARP {...merge} />
        }}
      />
      <Route
        exact
        path='/ARP'
        nameUrl='ARP'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ARP' } }
          return <ARP {...merge} />
        }}
      />
      <Route
        exact
        path='/ARP-:id'
        nameUrl='ARP'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ARP' } }
          return <ShowArp {...merge} />
        }}
      />
      <Route
        exact
        path='/engineering-document'
        nameUrl='TechnicalArchiveEngineering'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'TechnicalArchiveEngineering' }
          }
          return <TechnicalArchiveEngineering {...merge} />
        }}
      />
      <Route
        exact
        path='/technical-document'
        nameUrl='TechnicalArchive'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'TechnicalArchive' } }
          return <TechnicalArchive {...merge} />
        }}
      />
      <Route
        exact
        path='/final-data-book'
        nameUrl='TechnicalArchiveFinalBooklet'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'TechnicalArchiveFinalBooklet' }
          }
          return <TechnicalArchiveFinalBooklet {...merge} />
        }}
      />
      <Route
        exact
        path='/equipment-identify'
        nameUrl='TechnicalArchiveBirthCertificate'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'TechnicalArchiveBirthCertificate' }
          }
          return <TechnicalArchiveBirthCertificate {...merge} />
        }}
      />
      <Route
        exact
        path='/Chat'
        nameUrl='Chat'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Chat' } }
          return <Chat {...merge} />
        }}
      />
      <Route
        exact
        path='/create-user-group'
        nameUrl='CreateUserGroup'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateUserGroup' } }
          return <CreateUserGroup {...merge} />
        }}
      />
      <Route
        exact
        path='/index-user-group'
        nameUrl='IndexUserGroup'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexUserGroup' } }
          return <IndexUserGroup {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-usergroup-:id'
        nameUrl='EditUserGroup'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditUserGroup' } }
          return <EditUserGroup {...merge} />
        }}
      />
      <Route
        exact
        path='/calendar'
        nameUrl='Calendar'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Calendar' } }
          return <Calendar {...merge} />
        }}
      />
      <Route
        exact
        path='/standard-request'
        nameUrl='StandardRequest'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'StandardRequest' } }
          return <StandardRequest {...merge} />
        }}
      />
      <Route
        exact
        path='/requested-standard'
        nameUrl='IndexRequest'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexRequest' } }
          return <IndexRequest {...merge} />
        }}
      />
      <Route
        exact
        path='/library-manager'
        nameUrl='LibraryManager'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'LibraryManager' } }
          return <LibraryManager {...merge} />
        }}
      />
      <Route
        exact
        path='/document-registration'
        nameUrl='DocumentRegistration'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DocumentRegistration' } }
          return <DocumentRegistration {...merge} />
        }}
      />
      <Route
        exact
        path='/create-writers'
        nameUrl='CreateWriters'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateWriters' } }
          return <CreateWriters {...merge} />
        }}
      />
      <Route
        exact
        path='/index-publishers'
        nameUrl='IndexPublishers'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexPublishers' } }
          return <IndexPublishers {...merge} />
        }}
      />
      <Route
        exact
        path='/index-writers'
        nameUrl='IndexWriters'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexWriters' } }
          return <IndexWriters {...merge} />
        }}
      />
      {/* IndexWriters */}
      <Route
        exact
        path='/create-publishers'
        nameUrl='CreatePublishers'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreatePublishers' } }
          return <CreatePublishers {...merge} />
        }}
      />
      {/* CreatePublishers */}
      <Route
        exact
        path='/index-builder'
        nameUrl='IndexBuilder'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexBuilder' } }
          return <IndexBuilder {...merge} />
        }}
      />
      <Route
        exact
        path='/dynamic-index-:id'
        nameUrl='DynamicIndex'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DynamicIndex' } }
          return <DynamicIndex {...merge} />
        }}
      />
      <Route
        exact
        path='/list-indexes'
        nameUrl='ListIndexes'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ListIndexes' } }
          return <ListIndexes {...merge} />
        }}
      />
      <Route
        exact
        path='/internal-phonebook'
        nameUrl='InternalPhonebook'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'InternalPhonebook' } }
          return <InternalPhonebook {...merge} />
        }}
      />
      <Route
        exact
        path='/create-internal-phonebook'
        nameUrl='CreateInternalPhonebook'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateInternalPhonebook' } }
          return <CreateInternalPhonebook {...merge} />
        }}
      />
      <Route
        exact
        path='/FAQ-:name'
        nameUrl='FAQ'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'FAQ' } }
          return <FAQ {...merge} />
        }}
      />
      <Route
        exact
        path='/Create-FAQ'
        nameUrl='CreateFAQ'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateFAQ' } }
          return <CreateFAQ {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-FAQ-:id'
        nameUrl='EditFAQ'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditFAQ' } }
          return <EditFAQ {...merge} />
        }}
      />
      <Route
        exact
        path='/index-FAQ'
        nameUrl='IndexFAQ'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexFAQ' } }
          return <IndexFAQ {...merge} />
        }}
      />
      <Route
        exact
        path='/general-search'
        nameUrl='GeneralSearch'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'GeneralSearch' } }
          return <GeneralSearch {...merge} />
        }}
      />
      <Route
        exact
        path='/result-page-:id'
        nameUrl='ResultPage'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ResultPage' } }
          return <ResultPage {...merge} />
        }}
      />
      <Route
        exact
        path='/WBS'
        nameUrl='WBS'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'WBS' } }
          return <WBS {...merge} />
        }}
      />
      <Route
        exact
        path='/dashboard-PPC'
        nameUrl='DashbordPPC'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DashbordPPC' } }
          return <DashbordPPC {...merge} />
        }}
      />
      <Route
        exact
        path='/create-basic-engineering'
        nameUrl='BasicEngineeringForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'BasicEngineeringForm' } }
          return <BasicEngineeringForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-basic-engineering-:id'
        nameUrl='BasicEngineeringFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'BasicEngineeringFormEdit' } }
          return <BasicEngineeringFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-detailed-engineering'
        nameUrl='DetailedEngineeringForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DetailedEngineeringForm' } }
          return <DetailedEngineeringForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-builders-engineering'
        nameUrl='BuildersEngineeringForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'BuildersEngineeringForm' } }
          return <BuildersEngineeringForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-builders-engineering-:id'
        nameUrl='BuildersEngineeringFormEdit'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'BuildersEngineeringFormEdit' }
          }
          return <BuildersEngineeringFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-PFD'
        nameUrl='PFDForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PFDForm' } }
          return <PFDForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-PFD-:id'
        nameUrl='PFDFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PFDFormEdit' } }
          return <PFDFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-PAndID'
        nameUrl='PAndIDForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PAndIDForm' } }
          return <PAndIDForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-PAndID-:id'
        nameUrl='PAndIDFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PAndIDFormEdit' } }
          return <PAndIDFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-linelist'
        nameUrl='LineListForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'LineListForm' } }
          return <LineListForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-linelist-:id'
        nameUrl='LineListFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'LineListFormEdit' } }
          return <LineListFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-IsoMetric'
        nameUrl='IsoMetricForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IsoMetricForm' } }
          return <IsoMetricForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-IsoMetric-:id'
        nameUrl='IsoMetricFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IsoMetricFormEdit' } }
          return <IsoMetricFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-3DModel'
        nameUrl='ModelForm3D'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ModelForm3D' } }
          return <ModelForm3D {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-3DModel-:id'
        nameUrl='ModelForm3DEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ModelForm3DEdit' } }
          return <ModelForm3DEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-final-engineering-manual'
        nameUrl='FinalEngineeringManualForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'FinalEngineeringManualForm' } }
          return <FinalEngineeringManualForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-final-equipment-manual'
        nameUrl='FinalEquipmentManualForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'FinalEquipmentManualForm' } }
          return <FinalEquipmentManualForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-build-final-booklet'
        nameUrl='BuildFinalBookletForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'BuildFinalBookletForm' } }
          return <BuildFinalBookletForm {...merge} />
        }}
      />
      <Route
        exact
        path='/index-notification'
        nameUrl='IndexNotification'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'IndexNotification' } }
          return <IndexNotification {...merge} />
        }}
      />
      <Route
        exact
        path='/create-work-failure-structure'
        nameUrl='WorkFailureStructureForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'WorkFailureStructureForm' } }
          return <WorkFailureStructureForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-engineering-document'
        nameUrl='PurchasePackagesForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PurchasePackagesForm' } }
          return <PurchasePackagesForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-engineering-documents'
        nameUrl='ListEngineeringDocumentsForm'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'ListEngineeringDocumentsForm' }
          }
          return <ListEngineeringDocumentsForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-attached-purchase'
        nameUrl='AttachedDocumentsPurchasePackagesForm'
        render={props => {
          let merge = {
            ...props,
            ...{ nameUrl: 'AttachedDocumentsPurchasePackagesForm' }
          }
          return <AttachedDocumentsPurchasePackagesForm {...merge} />
        }}
      />
      <Route
        exact
        path='/knowledge-management'
        nameUrl='KnowledgeManagement'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'KnowledgeManagement' } }
          return <KnowledgeManagement {...merge} />
        }}
      />
      <Route
        exact
        path='/recorded-lessons-learned'
        nameUrl='RegisteredForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'RegisteredForm' } }
          return <RegisteredForm {...merge} />
        }}
      />
      <Route
        exact
        path='/approved-lessons-learned'
        nameUrl='AcceptedForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'AcceptedForm' } }
          return <AcceptedForm {...merge} />
        }}
      />
      <Route
        exact
        path='/create-equipmentid'
        nameUrl='EquipmentID'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EquipmentID' } }
          return <EquipmentID {...merge} />
        }}
      />
      <Route
        exact
        path='/launch-comments-sheet'
        nameUrl='comment_sheet'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'comment_sheet' } }
          return <CCS {...merge} />
        }}
      />
      <Route
        exact
        path='/panel-notification'
        nameUrl='PanelNotification'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PanelNotification' } }
          return <PanelNotification {...merge} />
        }}
      />
      <Route
        exact
        path='/production-calculation'
        nameUrl='ProductionCalculation'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ProductionCalculation' } }
          return <ProductionCalculation {...merge} />
        }}
      />
      <Route
        exact
        path='/create-instrument'
        nameUrl='InstrumentForm'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'InstrumentForm' } }
          return <InstrumentForm {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-instrument-:id'
        nameUrl='InstrumentFormEdit'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'InstrumentFormEdit' } }
          return <InstrumentFormEdit {...merge} />
        }}
      />
      <Route
        exact
        path='/create-CCS'
        nameUrl='CreateCCS'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'CreateCCS' } }
          return <CreateCCS {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-CCS-:id'
        nameUrl='EditCCS'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditCCS' } }
          return <EditCCS {...merge} />
        }}
      />
      <Route
        exact
        path='/send-message'
        nameUrl='SendMessage'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'SendMessage' } }
          return <SendMessage {...merge} />
        }}
      />
      <Route
        exact
        path='/Management-Email'
        nameUrl='Email'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'Email' } }
          return <Email {...merge} />
        }}
      />
      <Route
        exact
        path='/edit-drafts'
        nameUrl='EditDrafts'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'EditDrafts' } }
          return <EditDrafts {...merge} />
        }}
      />
      <Route
        exact
        path='/arp/print/:id'
        nameUrl='PrintARP'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'PrintARP' } }
          return <PrintARP {...merge} />
        }}
      />
      <Route
        exact
        path='/tsr/print/:id'
        nameUrl='FormTSR'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'FormTSR' } }
          return <FormTSR {...merge} />
        }}
      />
      <Route
        exact
        path='/dashboard-report'
        nameUrl='MainChart'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'MainChart' } }
          return <MainChart {...merge} />
        }}
      />
      {/* MainChart */}
      <Route
        exact
        path='/404'
        nameUrl='NotFound'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'NotFound' } }
          return <NotFound {...merge} />
        }}
      />
      <Route
        exact
        path='/task-management'
        nameUrl='TaskManagement'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'TaskManagement' } }
          return <TaskManagement {...merge} />
        }}
      />
      <Route
        exact
        path='/new-tsr'
        nameUrl='NewTsr'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'NewTsr' } }
          return <NewTsr {...merge} />
        }}
      />
      <Route
        exact
        path='/new-index-tsr'
        nameUrl='BaseIndex'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'BaseIndex' } }
          return <BaseIndex {...merge} />
        }}
      />
      <Route
        exact
        path='/new-tsr-:id'
        nameUrl='ShowTsrNew'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'ShowTsrNew' } }
          return <ShowTsrNew {...merge} />
        }}
      />
      <Route
        exact
        path='/new-tsr/print/:id'
        nameUrl='NewTSRPrint'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'NewTSRPrint' } }
          return <NewTSRPrint {...merge} />
        }}
      />
      <Route
        exact
        path='/dashboard-project-engineering'
        nameUrl='DashboardDCC'
        render={props => {
          let merge = { ...props, ...{ nameUrl: 'DashboardDCC' } }
          return <DashboardDCC {...merge} />
        }}
      />

      <Redirect to='/404' />
    </Switch>
  </Router>
)
export default Routes

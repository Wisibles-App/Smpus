/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonMenu, IonContent, IonHeader, IonToolbar, IonCol, IonRow, IonImg, IonButtons } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Fee from './pages/fee';
import Profile from './pages/profile';
import Attendance from './pages/attendance';
import Syllabus from './pages/syllabus';
import Download from './pages/download';
import Videos from './pages/videos';
import LPlan from './pages/lession-plan';
import LiveTracking from './pages/live-tracking';
import Welcome from './pages/welcome';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login';
import TimeTable from './pages/time-table';
import Transfort from './pages/transfort';
import Exams from './pages/exams';
import Leave from './pages/leave';
import Notice from './pages/notice';
import Homework from './pages/home-work';
import Videoview from './pages/video-view';
import StartExam from './pages/start-exam';
import ExamResult from './pages/exam-result';
import Books from './pages/books';
import ReportCard from './pages/reportcard';
import ExamSuhedule from './pages/exam-schedule';
import EditLeave from './pages/edit-leave';
import Presentation from './pages/presentation';
import Communication from './pages/communication';
import AboutSchool from './pages/about-school';
import Childs from './pages/childs';
import Groups from './pages/groups';
import Chats from './pages/chat';
import BehaviourNote from './pages/behavior-note';
import EditProfile from './pages/edit-profile';
import Achievements from './pages/achievements';
import Upload from './pages/upload';
import CetExams from './pages/cet-exams'
import CetView from './pages/cet-view';
import StartCetExam from './pages/start-cet-exam';
import ExamResults from './pages/cet-results';
import Calendar from './pages/calendar';
import Healthrecord from './pages/health';
import Appointment from './pages/appointment';
import AddAppointment from './pages/add-appointment';
import Notifications from './pages/notification';
import ProgressCard from './pages/progress-card';
import BusMessages from './pages/bus-messages';
import MyDay from './pages/myday';
import EHomeWork from './pages/e-homework';
import EHomeWorkView from './pages/ehomework-view';
import StartEHomeWork from './pages/start-ehomework';
import StudentDairy from './pages/dairy';
import Circular from './pages/circular';
import StudentReportCard from './pages/report-card';
import Gallery from './pages/gallery';
import ProgressCardView from './pages/progress-card-view';
import GalleryImages from './pages/gallery-images';
import ClassNotes from './pages/class-notes';
import Assignments from './pages/assignment';
import Examination from './pages/examination';
import HandBook from './pages/handbook';
import Anecdotes from './pages/anecdotes';
import GatePass from './pages/gatepass';
import Infirmary from './pages/infirmary';
import TransportRoutes from './pages/transport-routes'
import Connect from './pages/connect';

setupIonicReact();

const menuItems = [
  {
    name: 'Home',
    icon: 'home'
  },
  {
    name: 'Profile',
    icon: 'profile'
  },
  {
    name: 'Fees',
    icon: 'Fee'
  },
  {
    name: 'Time Table',
    icon: 'time-table'
  },
  {
    name: 'Lesson Plan',
    icon: 'lession-plan'
  },
  {
    name: 'Syllabus Status',
    icon: 'syllabus'
  },
  {
    name: 'Homework',
    icon: 'home-work'
  },
  {
    name: 'Attendance',
    icon: 'attendance'
  },
  {
    name: 'Examinations',
    icon: 'examination'
  },
  {
    name: 'Notice Board',
    icon: 'notice-board'
  },
  {
    name: 'Teacher Review',
    icon: 'teacher'
  },

  {
    name: 'Library',
    icon: 'library'
  },

  {
    name: 'Transport Route',
    icon: 'location'
  },
  {
    name: 'About School',
    icon: 'about'
  },

  {
    name: 'Logout',
    icon: 'logout'
  }
];;



const App: React.FC = () => (

  <IonApp>
    {/* <IonMenu content-id="main-content" type="overlay">
    <IonHeader>
    <IonToolbar style={{height: '60px'}} class='tool_bar_class'>
    <IonButtons slot="start" style={{width: '100%'}}>
        <IonImg style={{margin: 'auto', width: '50%'}} src={'../../../assets/images/Logo.png'} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div style={{height: '100px', backgroundColor:'#FF8C00', fontSize:'18px'}}>
      <IonRow style={{padding: '8px',fontWeight: 'bold'}}>
        <IonCol size='6'>
          Student Name
        </IonCol>
        <IonCol size='6'>
         : Mahesh
        </IonCol>
      </IonRow>
      <IonRow style={{padding: '8px'}}>
        <IonCol size='6'>
          Class
        </IonCol>
        <IonCol size='6'>
          : 10th
        </IonCol>
      </IonRow>
      </div>
      {menuItems.map(item =>{
        return <IonRow style={{padding: '8px'}}>
        <IonCol size='2'>
        <IonImg style={{height: '25px', width: '25px'}}  src={'../../../assets/images/'+item.icon+'.png'} />
        </IonCol>
        <IonCol size='10' style={{fontWeight: 'bold', fontSize: "16px", marginTop: '4px'}}>
        {item.name}
        </IonCol>
      </IonRow>
      }) }
    </IonContent>
  </IonMenu> */}


    <IonReactRouter>
      <IonRouterOutlet id="main-content">
        <Route exact path="/Welcome">
          <Welcome />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          {localStorage.getItem("userAuth") ? <Redirect to="/login" /> : <Redirect to="/welcome" />}
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/fee">
          <Fee />
        </Route>
        <Route exact path="/time-table">
          <TimeTable />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/transfort">
          <Transfort />
        </Route>
        <Route exact path="/attendance">
          <Attendance />
        </Route>
        <Route exact path="/syllabus">
          <Syllabus />
        </Route>
        <Route exact path="/download">
          <Download />
        </Route>
        <Route exact path="/videos">
          <Videos />
        </Route>
        <Route exact path="/exams">
          <Exams />
        </Route>
        <Route exact path="/leave">
          <Leave />
        </Route>
        <Route exact path="/notice">
          <Notice />
        </Route>
        <Route exact path="/lession-plan">
          <LPlan />
        </Route>
        <Route exact path="/home-work">
          <Homework />
        </Route>
        <Route exact path="/video-view">
          <Videoview />
        </Route>
        <Route exact path="/start-exam">
          <StartExam />
        </Route>
        <Route exact path="/exam-results">
          <ExamResult />
        </Route>
        <Route exact path="/books">
          <Books />
        </Route>
        <Route exact path="/reportcard">
          <ReportCard />
        </Route>
        <Route exact path="/exam-schedule">
          <ExamSuhedule />
        </Route>
        <Route exact path="/edit-leave">
          <EditLeave />
        </Route>
        <Route exact path="/presentation">
          <Presentation />
        </Route>
        <Route exact path="/communication">
          <Communication />
        </Route>
        <Route exact path="/about-school">
          <AboutSchool />
        </Route>
        <Route exact path="/childs">
          <Childs />
        </Route>
        <Route exact path="/groups">
          <Groups />
        </Route>
        <Route exact path="/chat">
          <Chats />
        </Route>
        <Route exact path="/behavior-note">
          <BehaviourNote />
        </Route>
        <Route exact path="/edit-profile">
          <EditProfile />
        </Route>
        <Route exact path="/achievements">
          <Achievements />
        </Route>
        <Route exact path="/upload">
          <Upload />
        </Route>
        <Route exact path="/live-tracking">
          <LiveTracking />
        </Route>
        <Route exact path="/cet-exams">
          <CetExams />
        </Route>
        <Route exact path="/cet-view">
          <CetView />
        </Route>
        <Route exact path="/start-cet-exam">
          <StartCetExam />
        </Route>
        <Route exact path="/cet-results">
          <ExamResults />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/health">
          <Healthrecord />
        </Route>
        <Route exact path="/appointment">
          <Appointment />
        </Route>
        <Route exact path="/add-appointment">
          <AddAppointment />
        </Route>
        <Route exact path="/Notifications">
          <Notifications />
        </Route>

        <Route exact path="/progress-card">
          <ProgressCard />
        </Route>

        <Route exact path="/bus-messages">
          <BusMessages />
        </Route>
        <Route exact path="/myday">
          <MyDay />
        </Route>
        <Route exact path="/e-homework">
          <EHomeWork />
        </Route>
        <Route exact path="/ehomework-view">
          <EHomeWorkView />
        </Route>
        <Route exact path="/start-ehomework">
          <StartEHomeWork />
        </Route>
        <Route exact path="/dairy">
          <StudentDairy />
        </Route>
        <Route exact path="/circular">
          <Circular />
        </Route>
        <Route exact path="/report-card">
          <StudentReportCard />
        </Route>
        <Route exact path="/gallery">
          <Gallery />
        </Route>
        <Route exact path="/progress-card-view">
          <ProgressCardView />
        </Route>
        <Route exact path="/gallery-images">
          <GalleryImages />
        </Route>
        <Route exact path="/class-notes">
          <ClassNotes />
        </Route>
        <Route exact path="/assignment">
          <Assignments />
        </Route>
        <Route exact path="/examination">
          <Examination />
        </Route>
        <Route exact path="/handbook">
          <HandBook />
        </Route>
        <Route exact path="/anecdotes">
          <Anecdotes />
        </Route>
        <Route exact path="/gatepass">
          <GatePass />
        </Route>
        <Route exact path="/infirmary">
          <Infirmary />
        </Route>
        <Route exact path="/transport-routes">
          <TransportRoutes />
        </Route>
        <Route exact path="/connect">
          <Connect />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

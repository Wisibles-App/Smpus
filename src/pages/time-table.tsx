import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import './time-table.css';
import { useHistory } from "react-router-dom";
import { api, CLINT_SERVICE } from "../util/util";
import { useState, useEffect } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TimeTable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const handleDayClick = (day: string) => {
    console.log('day', day);
    setSelectedDay(day); // Update the selected day
  };

  const history = useHistory() as any;
  const [classData, getClassData] = useState<any>()

  var [userInfo] = useState(localStorage.getItem('userAuth') as any);
  userInfo = JSON.parse(userInfo);

  const [showIonLoading, dismissIonLoading] = useIonLoading();
  useIonViewWillEnter(() => {
    getClassTimeTable();
  });

  useEffect(() => {
    console.log(classData, 'class data');
    console.log(selectedDay, 'day');
    console.log(classData?.selectedDay, 'day ---');
  });

  const getClassTimeTable = () => {
    var studentData = localStorage.getItem('studentProfileData') as any;
    studentData = JSON.parse(studentData);
    showIonLoading('Loading....')
    const reqObj = {
      // "class_id":studentData?.student_result?.class_id,
      // "section_id": studentData?.student_result?.section_id,
      // branch_id: localStorage.getItem('branch_id'),
      // school_id: localStorage.getItem('school_id')
      student_id: userInfo.record.student_id,
    };
    return api.post('api_new/Webservice/class_schedule', reqObj, {
      headers: {
        "Content-Type": "application/json",
        "Client-Service": CLINT_SERVICE,
        "Auth-Key": 'schoolAdmin@',
        "Authorization": userInfo.token,
        "User-ID": userInfo.id
      }
    }
    ).then((res: any) => {
      dismissIonLoading();
      console.log('res', res);
      getClassData(res.data);
    }).catch((error: any) => {
      console.log('error:    ', error);
      dismissIonLoading();
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="md" class="toolbar_class">
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
            <IonTitle>Time Table</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="scrollable-days">
            {daysOfWeek.map((day, index) => (
              <IonCol
                key={index}
                size="auto"
                className={`day-col ${selectedDay === day ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}  // Set selected day on click
              >
                <div className="day-box">{day}</div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow style={{ backgroundColor: '#FFC107', fontWeight: 'bold' }}>
            <IonCol class="grid-col-cls" size="6">TIME</IonCol>
            <IonCol class="grid-col-cls" size="6">SUBJECT</IonCol>
            {/* <IonCol class="grid-col-cls" size="4">TEACHER</IonCol> */}
          </IonRow>

          {classData?.timetable[selectedDay].map((item: any, index: any) => (
            <IonRow class="grid-cls" key={index}>
              <IonCol size="6" class="grid-col-cls">
                <IonText color={item?.subject_name === 'Break' || item?.subject_name === 'Lunch Break' ? 'danger' : ''}>
                  {item?.time_from} - {item?.time_to}
                </IonText>
              </IonCol>
              <IonCol size="6" class="grid-col-cls"> 
                <IonText color={item?.subject_name === 'Break' || item?.subject_name === 'Lunch Break' ? 'danger' : ''}>
                  {item?.subject_name}
                </IonText>
              </IonCol>
              {/* <IonCol size="4" class="grid-col-cls">
                <IonText color={item?.subject_name === 'Break' || item?.subject_name === 'Lunch Break'  ? 'danger' : ''}>
                  
                  { item?.subject_name === 'Break' || item?.subject_name === 'Lunch Break' ?  "-":item?.surname +" " + item?.name} 
                </IonText>
              </IonCol> */}
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default TimeTable;


import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import './attendance.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { api, CLINT_SERVICE } from "../util/util";



const Attendance: React.FC = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    console.log(year,month);
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [attendanceData, getattendanceData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        APIForGetStudentFeeData();
    })
    useEffect(() => {
        console.log(attendanceData, 'attendanceData data');
    });
    const APIForGetStudentFeeData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id,
            "year": year,
             "month": month,
          }; 
        return api.post('api_new/Webservice/getAttendenceRecords',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
                "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            console.log('nanai', res.data);
            getattendanceData(res.data);
            console.log('nani',res.data.data[0].className);
            // updateAttendanceCount()
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

   const updateAttendanceCount = ()=>
    {
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        var user_role = localStorage.getItem('role');
        const reqObj = {
            student_id: userData.record.student_id,
            role: user_role
          };
          return api.post('api_new/balloon_notification/Attendence_update', reqObj, {
            headers: {
              "Content-Type": "application/json"
            }
          }
          ).then((res: any) => {
            console.log('update attendence data :', res.data);
            dismissIonLoading();
          }).catch((error: any) => {
            dismissIonLoading();
          })
    }

    useEffect(() => {
        window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 10);
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle>Attendance</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    hiddenDays={[0]}
                    events={
                        attendanceData?.data
                    }
                />
                {/* <Calendar
                    onChange={onChange}
                    value={value}
                    className='react-calendar'
                /> */}

                {/* <IonDatetime presentation="date" dayValues="5,10,15,20,25,30"></IonDatetime> */}
                <IonRow class="main_attnd_row">
                    <IonCol size="4">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="auto"><p className="present_img no_margin"></p></IonCol>
                            <IonCol>Present</IonCol>
                        </IonRow>

                    </IonCol>
                    <IonCol size="4">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="auto"><p className="absent_img no_margin"></p></IonCol>
                            <IonCol>Absent</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="4">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="auto"><p className="late_img no_margin"></p></IonCol>
                            <IonCol>Late</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow >
                    <IonCol size="4">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="auto"><p className="halfday_img no_margin"></p></IonCol>
                            <IonCol>Half Day</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="4">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="auto"><p className="holiday_img no_margin"></p></IonCol>
                            <IonCol>Holiday</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Attendance
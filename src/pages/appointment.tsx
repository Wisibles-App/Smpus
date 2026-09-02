import { IonBackButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './leave.css';
import { add } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";

const Appointment: React.FC = () => {
    const history = useHistory();
    const clickOnEdit = () =>{
        history.push('/add-appointment')
    };
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [appointmnetData, getAppointmnetData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        APIForGetAppointmentsData();
    })
    useEffect(() => {
        
    });
    const APIForGetAppointmentsData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id,
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
          }; 
        return api.post('api_new/Show_appointment/getAppointmentList',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
                "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
           console.log('appointmentsData:', res.data);
           getAppointmnetData(res.data);
           dismissIonLoading();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton/>
                        <IonTitle >Appointments</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {appointmnetData?.message === 'No Result Found!' && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Appointment Results Found!</p>
                        </IonRow>}
             {appointmnetData?.data?.map((item: any)=>{
                return(
                    <div className="apply_leave_box">
                    <IonRow class="apply_leave_header ion-align-items-center">
                        <IonCol size="6" class="font_size_head">
                           Date :  {item?.selectdate}
                        </IonCol>
                        <IonCol size="6" class="font_size_head">
                        Time :  {item?.timeslot}
                        </IonCol>
                    </IonRow>
                    <IonRow class="apply_leave_details">
                        <IonCol size="4">
                            <p className="from_date_h no_margin font_size_body">Department</p>
                        </IonCol>
                        <IonCol size="4">
                            <p className="to_date_h no_margin font_size_body">{item?.department}</p>
                        </IonCol> 
                       {item?.status !== "Closed" && <IonCol size="4">
                         <p className="leave_status_btn no_margin font_size_body">{item?.status}</p>
                        </IonCol>} 
                        {item?.status === "Closed" && <IonCol size="4">
                         <p className="leave_status_btn_green no_margin font_size_body">{item?.status}</p>
                        </IonCol>} 
                    </IonRow>
                </div>
                )
              })}
                <IonFab slot="fixed">
      <IonFabButton  onClick={clickOnEdit}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab> 
            </IonContent>
        </IonPage>
    )
}
export default Appointment;






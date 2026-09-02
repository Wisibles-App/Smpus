import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonFooter, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonActionSheet, useIonAlert, useIonLoading, useIonToast } from "@ionic/react"
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useEffect, useState } from "react";
import './edit-leave.css';
import { camera, attach, attachSharp} from 'ionicons/icons';
import moment from 'moment';
import { api, CLINT_SERVICE } from "../util/util";
import { useHistory } from "react-router-dom";
import { IonNav } from '@ionic/react';




const EditLeave: React.FC = () => {
    const [present] = useIonActionSheet();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [result, setResult] = useState<OverlayEventDetail>();
    const todayDate = moment().format("YYYY-MM-DD");
    const [currentDate, getCurrentDate] = useState<any>(todayDate);
    const [fromDate, getFromDate] = useState<any>('');
    const [toDate, getToDate] = useState<any>('');
    const [leaveReason, getLeaveReason] = useState<any>('');
    // const [fromDate,getFromDate] = useState<any>();
    console.log('----today date-----',todayDate);
    const history = useHistory();

    const fromDateChange = (event: any)=>{
      getFromDate(event.detail.value)
    }
    const toDateChange = (event: any)=>{
      getToDate(event.detail.value)
    }
    const reasonChange = (event: any)=>{
      getLeaveReason(event.detail.value)
    }

    useEffect(() => {
      console.log('fromDate', fromDate);
      console.log('toDtae', toDate);
      console.log('Reason', leaveReason);
  });

  const [showIonLoading, dismissIonLoading] = useIonLoading();
  var [userInfo] = useState(localStorage.getItem('userAuth') as any);
  userInfo = JSON.parse(userInfo);

  const submitLeaveRequest = ()=>{
    showIonLoading('Loading....')
    const reqObj = {
      "from_date": fromDate,
      "to_date": toDate,
      "apply_date": currentDate,
      "student_id": userInfo.record.student_id,
      "reason": leaveReason,
      "file": ''
      }; 
    return api.post('api_new/leaves/addleaves',reqObj, {
        headers:    {
            "Content-Type":    "application/json",
           "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
            "Authorization":    userInfo.token,
            "User-ID":    userInfo.id
          }
    }
    ).then((res:    any) => {
        dismissIonLoading();
        if(res.data.success === 1)
        {
          presentToast({
            message: 'Leave Applied Successfulyy!!',
            duration: 1500,
            position: 'middle'
          });
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
        else
        {
          presentAlert({
            header: 'Note',
            message: res.data.message,
            buttons: ['OK'],
        })
        }
    }).catch((error:    any) => {
        console.log('error:    ', error);
        dismissIonLoading();
    })
  }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Apply Leave</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <div>
                  <IonRow class="edit_leave_input">
                  <IonInput mode="md" readonly class="input_box" placeholder="22-01-2022" value={currentDate}></IonInput>
                  </IonRow>              
                <IonRow class="edit_leave_input">
                    <IonCol size="6" class="edit_leave_from">
                      <IonLabel class="font_size_head">Select From Date</IonLabel>
                    <IonInput mode="md" type="date" min={currentDate} onIonChange={fromDateChange} class="input_box " value={fromDate} ></IonInput>
                    </IonCol>
                    <IonCol size="6" class="edit_leave_to">
                    <IonLabel class="font_size_head">Select To Date</IonLabel>
                    <IonInput mode="md" type="date" class="input_box " min={fromDate} onIonChange={toDateChange} value={toDate}></IonInput>
                    </IonCol>
                </IonRow>
                <IonRow class="edit_leave_input">
                <IonInput placeholder="Reason" onIonChange={reasonChange}  value={leaveReason} class="input_box"></IonInput>
                </IonRow>
                    {/* <IonCard>
                        <IonCardHeader>
                            <IonCardTitle><IonImg src={'../../../assets/images/upload.svg'} /></IonCardTitle>
                            <IonCardSubtitle class="select_file_to_upload_h">Select File to Upload</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent class="ion-text-center">
                            <IonButton  class="edit_file_choose_file_btn" onClick={() =>
          present({
            header: 'Add File',
            buttons: [
              {
                text: 'Take a Photo',
                role: 'destructive',
                icon: camera,
                data: {
                  action: 'delete',
                },
              },
              {
                text: 'Choose From Gallary',
                icon: attachSharp,
                data: {
                  action: 'share',
                },
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        }>Choose File</IonButton>
                        </IonCardContent>
                    </IonCard> */}
                </div>
                <IonRow>
                <IonButton disabled={fromDate === '' || toDate ==='' || leaveReason === ''} class="edit_leave_submit_btn" onClick={submitLeaveRequest}>Submit</IonButton>
                </IonRow>
            
            </IonContent>
        </IonPage>
    )
}
export default EditLeave;






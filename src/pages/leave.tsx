import { IonBackButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './leave.css';
import { add } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";

const Leave: React.FC = () => {
    const history = useHistory();
    const clickOnEdit = () =>{
        history.push('/edit-leave')
    };

    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [studentLeaveData, getstudentLeaveData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        APIForGetStudentLeaveData();
    })
    useEffect(() => {
        console.log(studentLeaveData, 'student leave data');
    });
    const APIForGetStudentLeaveData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id
          }; 
        return api.post('api_new/Webservice/getApplyLeave',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
               "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            getstudentLeaveData(res.data);
            updateLeaveCount();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const DeleteLeave = (deleteLeaveID: any) => {
        showIonLoading('Loading....')
        const reqObj = {
            leave_id:   deleteLeaveID
          }; 
        return api.post('api_new/Webservice/deleteLeave',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
               "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            APIForGetStudentLeaveData();
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

   const updateLeaveCount = ()=>{
    var userData = localStorage.getItem('userAuth') as any;
    userData = JSON.parse(userData);
    var user_role = localStorage.getItem('role');
    const reqObj = {
        student_id: userData.record.student_id,
        role: user_role
      };
      return api.post('api_new/balloon_notification/update_leave_count', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        console.log('update leave data :', res.data);
        dismissIonLoading();
      }).catch((error: any) => {
        dismissIonLoading();
      })
   };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton/>
                        <IonTitle >Apply Leave</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {studentLeaveData?.result_array?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No leaves Found.</p>
                        </IonRow>}
              {studentLeaveData?.result_array?.map((leaveIitem: any)=>{
                return(
                    <div className="apply_leave_box">
                    <IonRow class="apply_leave_header ion-align-items-center">
                        <IonCol size="4" class="font_size_head">
                            Apply Date -
                        </IonCol>
                        <IonCol size="5" class="font_size_head">
                            {leaveIitem?.apply_date}
                        </IonCol>
                        <IonCol size="3" >
                            <IonRow class="no_margin ion-float-right">
                                {/* <IonCol size="auto">
                                    <IonImg onClick={clickOnEdit} class="leave_header_img" src={'../../../assets/images/create.svg'} />
                                </IonCol> */}
                                <IonCol size="auto" onClick={()=>DeleteLeave(leaveIitem.id)}>
                                    <IonImg class="leave_header_img" src={'../../../assets/images/delete.svg'} />
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow class="apply_leave_details">
                        <IonCol size="4">
                            <p className="from_date_h no_margin font_size_body">From Date</p>
                        </IonCol>
                        <IonCol size="4">
                            <p className="to_date_h no_margin font_size_body"> To Date</p>
                        </IonCol>
                       {leaveIitem?.status === "0" && <IonCol size="4">
                         <p className="leave_status_btn no_margin font_size_body">Pending</p>
                        </IonCol>} 
                        {leaveIitem?.status !== "0" && <IonCol size="4">
                         <p className="leave_status_btn_green no_margin font_size_body">Approved</p>
                        </IonCol>} 
                    </IonRow>
                    <IonRow class="apply_leave_details">
                        <IonCol size="4" class="font_size_body">
                        {leaveIitem?.from_date}
                        </IonCol>
                        <IonCol size="4" class="font_size_body">
                        {leaveIitem?.to_date}
                        </IonCol>
                        <IonCol size="4" class="font_size_body">
                        </IonCol>
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
export default Leave;






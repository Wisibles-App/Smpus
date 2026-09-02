/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
const Notice: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [notificationData, getNotificationData] = useState<any>([])
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        getNotificationsData(user_role,userData);
    });
    useEffect(() => {
        console.log(notificationData, 'notification data');
    });
    const getNotificationsData = (userRole:any, userData: any) => {
        showIonLoading('Loading....');

        var reqObj = {
            student_id: '',
           type: '',
           parent_id: ''
       };
        
        if(userRole === 'student')
        {
            reqObj = {
               student_id: userData.record.student_id,
               type: userRole,
               parent_id: ''
           };
        }
        else
        {
            reqObj = {
               student_id: '',
               type: userRole,
               parent_id: userData.id
           };
        }
        return api.post('api_new/Webservice/getNotifications', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":  CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id,
                // 'Cookie': 'ci_session=36f96a4f5090b4dd0a753ede765a21d0d9f5460a'
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            if (res.data.success === 1) {
                getNotificationData(res.data.result);
            }
            else {
                // presentAlert({
                //     header: 'Note',
                //     message: res.data.message,
                //     buttons: ['OK'],
                // })
            }
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }

    const clickOnLessonView = async(noticeData: any) => {
        // updateNoticeCount(noticeData);
        presentAlert({
            // header: description,
            message:  noticeData.message,
            buttons: ['OK'],
            cssClass: 'notice_alert'
        });
    };

    const updateNoticeCount = (noticeData: any)=>{
        showIonLoading('Loading....')
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        var user_role = localStorage.getItem('role');
        if (user_role === 'parent') {
          const reqObj = {
            parent_id: userData.id,
            notification_id: noticeData.id
          };
          return api.post('api_new/balloon_notification/bn_notice_parent_update', reqObj, {
            headers: {
              "Content-Type": "application/json"
            }
          }
          ).then((res: any) => {
            dismissIonLoading();
            // var description = noticeData.message.replace(/(<([^>]+)>)/ig, '');
            presentAlert({
                // header: description,
                message: noticeData.message,
                buttons: ['OK'],
                cssClass: 'notice_alert'
            });
            var user_role = localStorage.getItem('role');
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);
            getNotificationsData(user_role,userData);
    
          }).catch((error: any) => {
            dismissIonLoading();
          })
        }
        else {
          const reqObj = {
            student_id: userData.record.student_id,
            notification_id: noticeData.id
          };
    
          return api.post('api_new/balloon_notification/bn_notice_student_update', reqObj, {
            headers: {
              "Content-Type": "application/json"
            }
          }
          ).then((res: any) => {
            dismissIonLoading();
            // var description = noticeData.message.replace(/(<([^>]+)>)/ig, '');
            presentAlert({
                // header: description,
                message:  noticeData.message,
                buttons: ['OK'],
                cssClass: 'notice_alert'
            });
            var user_role = localStorage.getItem('role');
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);
            getNotificationsData(user_role,userData);
    
          }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
          })
        }
       }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Notice Board</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {notificationData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Notices Found.</p>
                        </IonRow>}
                <div className="notice_day_box">
                  {notificationData.map((item: any) =>{
                    return (
                        <div>
                        <IonRow class="notice_day" >
                        <IonCol size="12">
                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                               {item.title}
                            </p>
                        </IonCol> 
                        {/* <IonCol size="4">
                        <p className="notice_day_header no_margin font_size_head">
                               {item.date}
                            </p>
                        </IonCol>    */}
                           
                        </IonRow>
                        <div className="notice_day_details">
                            <IonRow class="no_margin ion-align-items-center">
                                <IonCol size="2">
                                    <p className="day no_margin font_size_body">Date</p>
                                </IonCol>
                                <IonCol size="6">
                                    <p className="date no_margin font_size_body"> {item.date} </p>
                                </IonCol>
                                {item?.status === 0 && <IonCol size="4" onClick={() => clickOnLessonView(item)}>
                                    <IonRow class="no_margin ion-float-right ion-align-items-center">
                                        <IonCol size="auto" class="ion-no-padding">
                                            <p className="no_margin">
                                                <IonImg  class="notice_img_class" src={'../../../assets/images/orange_view.svg'} /></p>
                                        </IonCol>
                                        <IonCol class="ion-no-padding">
                                            <p className="no_margin view_btn font_size_body org_text_class">View</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>}
                                {item?.status === 1 && <IonCol size="4" onClick={() => clickOnLessonView(item)}>
                                    <IonRow class="no_margin ion-float-right ion-align-items-center">
                                        <IonCol size="auto" class="ion-no-padding">
                                            <p className="no_margin">
                                                <IonImg  class="notice_img_class" src={'../../../assets/images/green_view.svg'} /></p>
                                        </IonCol>
                                        <IonCol class="ion-no-padding">
                                            <p className="no_margin view_btn font_size_body green_text_class">View</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>}
                            </IonRow>
                            {/* <IonRow class="no_margin ion-align-items-center">
                                <IonCol size="3">
                                    <p className="day no_margin font_size_body">Message</p>
                                </IonCol>
                                <IonCol size="12">
                                    <p className="date no_margin font_size_body"dangerouslySetInnerHTML={{ __html: item.message}} ></p>
                                </IonCol>
                            </IonRow> */}
                        </div>
                        </div>
                    )
                  })}
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Notice;




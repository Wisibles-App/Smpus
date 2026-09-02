import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './home-work.css';
import { useHistory } from 'react-router';
import { Browser } from '@capacitor/browser';
import axios from 'axios';


const Notifications: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [showClearButton, setShowClearButton] = useState(false);
    const [clearBtnStatus, setClearBtnStatus] = useState()
    
    const history = useHistory();
    const [role, setRole] = useState<any>(localStorage.getItem('role'));
    const viewNotifications = async (notificationObj: any) => {
        showIonLoading('Loading....')
        const reqObj = {
            id: notificationObj.id
        };
        try {
            const res = await api.post('api_new/Notifications/deletenotifications', reqObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );
            dismissIonLoading();
            console.log('response:', res);
            // res.
            // getTheNotificationData();
            
            navigateToScreen(notificationObj.type);
        } catch (error) {
            console.log('error:    ', error);
            dismissIonLoading();
        }
    };

    const navigateToScreen = async (type: any) =>{
        if(role === 'parent' && type === 'transport'){
            history.push('/live-tracking');
        }else if(role === 'parent' && type === 'chat'){
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);
            const studentID = userData.record.student_id
            var url = 'https://smpus.wisibles.com/api_new/addchat?student_id=' + studentID;
            window.open(url, '_system');
            // await Browser.open({ url: url });
            // Browser.addListener('browserFinished', () => {
            // })
        }else if(type === 'calert'){
            presentAlert({
                header: 'To take the Chapter Ending Test, Please ask your ward to log in from Student’s Login Id.',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                          history.push('/home');
                        },
                    }
                ],
                
              })
        }else if(type === 'falert'){
            presentAlert({
                header: 'To watch the assigned Flipped Video, Please log in from Student’s Login id.',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            history.push('/home');
                        },
                    }
                ],
                
              })
        }
        else
        {
            history.push(type);
        }
    }

    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [notificationData, setNotificationData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(async () => {
        var user_role = localStorage.getItem('role');
        setRole(user_role);
        await updateNotificationData(user_role);
        getTheNotificationData();
        fetchStatus();
    })

         const fetchStatus = async () => {
    try {
      const res = await axios.get("https://smpus.wisibles.com/api_new/Dashboard/getdashboardpermissions");
      // console.log("Status", res.data.result)
      res?.data?.result.map( (value :any,index :number) =>{
        console.log("value",value)
      if(value?.type == 'clearallstatus'){
          setClearBtnStatus(value?.status)
        }
        }
      )


 

    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

    useEffect(() => {
        console.log(notificationData, 'student notification data');
    });
    const updateNotificationData = (role: any) => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id,
            "role": role
        };
        return api.post('api_new/Notifications/updatenotificationstatus', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":  CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    }

    const getTheNotificationData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id,
            role: localStorage.getItem('role')
        };
        return api.post('api_new/Notifications/getnotifications', reqObj, {
            headers: {
                "Content-Type": "application/json",
                "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            setShowClearButton(true);
            setNotificationData(res.data);
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    };

    const handleClearAllClick = ()=>{
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id,
            role: localStorage.getItem('role')
        };
        return api.post('api_new/Notifications/deleteallnotifications', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            history.push('/home');
        }).catch((error: any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Notifications</IonTitle>
                    </IonButtons>
                    { clearBtnStatus != 1 && notificationData?.message !== 'No Result Found!' && showClearButton && (
                    <IonButtons slot="end">
                        <IonTitle onClick={handleClearAllClick} className="clear_all_cls">CLEAR ALL</IonTitle>
                    </IonButtons>
        )}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {notificationData?.message === 'No Result Found!' && <IonImg class="no_noti_class" src={'../../../assets/images/no-notifications.svg'} />}
                {notificationData?.data?.map((notification: any) => {
                    return (notification.d_status === "0" && <div className="homework_box">
                        <IonRow class="homework_header ion-align-items-center">
                            <IonCol size="10" class="font_size_head">
                                {notification.created_at}
                            </IonCol>

                        {notification.type != '/home'&&  <IonCol class="font_size_head" size="2" onClick={() => viewNotifications(notification)}>
                                {/* <IonImg class="home_work_download_img" src={'../../../assets/images/view_2.svg'} /> */}
                                View
                            </IonCol>}
                        </IonRow>
                        <IonRow class="homework_details">
                            <IonCol size="9">
                                <p className="from_date_h no_margin font_size_body" dangerouslySetInnerHTML={{ __html: notification?.message }}></p>
                            </IonCol>
                        </IonRow>
                    </div>)
                })}
            </IonContent>
        </IonPage>
    )
}
export default Notifications;






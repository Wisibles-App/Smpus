/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './circular.css';
import { Browser } from "@capacitor/browser";

const Assignments: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [notificationData, circularData] = useState<any>([])
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        getCircularData(user_role,userData);
    });
    useEffect(() => {
        console.log(notificationData, 'notification data');
    });
    const getCircularData = (userRole:any, userData: any) => {
        var studentInfo = localStorage.getItem('studentProfileData') as any;
        studentInfo = JSON.parse(studentInfo);
        showIonLoading('Loading....')
        const reqObj = {
            section_id: studentInfo.student_result.section_id,
            class_id: studentInfo.student_result.class_id,
            type: 'assignments'
          }; 
        return api.post('api_new/Circular/getcircular', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":  CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id,
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            if (res.data.success === 1) {
                circularData(res.data.data);
            }
            else {
            }
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }

    const clickOnDownload = async (workItem: any)=>{
        var url = workItem?.attachment;
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     console.log('finished');
        //   })
    };

    const clickOnLessonView = async(noticeData: any) => {
        presentAlert({
            message:  noticeData.message,
            buttons: ['OK'],
            cssClass: 'notice_alert'
        });
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Assignaments</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {notificationData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Circular Found.</p>
                        </IonRow>}
                <div className="circular-cls">
                  {notificationData.map((item: any) =>{
                    return (
                        <div>
                        <IonRow class="notice_day" >
                        <IonCol size="11">
                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                               {item.title}
                            </p>
                        </IonCol> 
                        {item?.attachment && <IonCol size="1" onClick={() => clickOnDownload(item)} >
                         <IonImg class="home_work_download_img" src={'../../../assets/images/download_white.svg'} />
                        </IonCol>}
                        </IonRow>
                        <div className="notice_day_details">
                            <IonRow class="no_margin ion-align-items-center">
                                <IonCol size="2">
                                    <p className="day no_margin font_size_body">Date</p>
                                </IonCol>
                                <IonCol size="6">
                                    <p className="date no_margin font_size_body"> {item.date} </p>
                                </IonCol>
                                {<IonCol size="4" onClick={() => clickOnLessonView(item)}>
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
                                {/* {item?.status === 1 && <IonCol size="4" onClick={() => clickOnLessonView(item)}>
                                    <IonRow class="no_margin ion-float-right ion-align-items-center">
                                        <IonCol size="auto" class="ion-no-padding">
                                            <p className="no_margin">
                                                <IonImg  class="notice_img_class" src={'../../../assets/images/green_view.svg'} /></p>
                                        </IonCol>
                                        <IonCol class="ion-no-padding">
                                            <p className="no_margin view_btn font_size_body green_text_class">View</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>} */}
                            </IonRow>
                        </div>
                        </div>
                    )
                  })}
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Assignments;




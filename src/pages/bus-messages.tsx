import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { api } from "../util/util";
import './achievements.css';
import { Browser } from '@capacitor/browser';


const BusMessages: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [busMessagesData, getBusMessagesData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);

    useIonViewWillEnter(() => {
        APIForgetBusMessagesData();
    })
    useEffect(() => {
        console.log(busMessagesData, 'busMessagesData');
    });
    const APIForgetBusMessagesData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id,
          }; 
        return api.post('api_new/Transport_messages/getTransportMessages',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              }
        }
        ).then((res:    any) => {
            console.log('res ---messages--', res);
            getBusMessagesData(res.data);
            updateBusMessages();
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };
    const updateBusMessages = ()=>
        {
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);
            var user_role = localStorage.getItem('role');
            const reqObj = {
                student_id: userData.record.student_id,
                role: user_role
              };
              return api.post('api_new/balloon_notification/update_route_messages', reqObj, {
                headers: {
                  "Content-Type": "application/json"
                }
              }
              ).then((res: any) => {
                console.log('update route messages data :', res.data);
                dismissIonLoading();
              }).catch((error: any) => {
                dismissIonLoading();
              })
        }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Route Updates</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {busMessagesData?.success === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p>{busMessagesData?.message} </p>
                        </IonRow>}
                <IonRow>
                    {busMessagesData?.data?.map((item: any)=>{
                        return(
                            <div className="achievement_cls_div">
                                <IonRow class="notice_day" >
                                    <IonCol size="8">
                                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                                            {item.date}
                                        </p>
                                    </IonCol>
                                    <IonCol size="4">
                                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                                            {item.vehicle_no}
                                        </p>
                                    </IonCol>
                                </IonRow>
                                <div className="achievement_cls_div_inner">
                                    <IonRow class="no_margin ion-align-items-center">
                                    </IonRow>
                                    <IonRow class="no_margin ion-align-items-center">
                                        <IonCol size="12">
                                            <p className="achievement_cls_title font_size_header">{item.message}</p>
                                            {/* <p className="date no_margin font_size_body">{item.doc}</p> */}
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        )
                    })}
                </IonRow>
            </IonContent>
        </IonPage>
    )
}
export default BusMessages;





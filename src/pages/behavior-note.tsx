/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './download.css';

const BehaviourNote: React.FC = () => {
    const [selectedBnValue, checkedBNSegment] = useState('bucket_fill');
    const [presentAlert] = useIonAlert();
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [behaviourData, getBehaviourData] = useState<any>([]);
    const [behaviourDipData, getDipBehaviourData] = useState<any>([]);

    const btNoteChanged = (item: any) => {
        checkedBNSegment(item.detail.value);
    };
    useIonViewWillEnter(() => {
        getNotificationsData();
    });
    useEffect(() => {
        console.log(behaviourData, 'BehaviourData data');
    });
    const getNotificationsData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id
        };
        return api.post('api_new/behavioral/getbhnote', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            // dismissIonLoading();
            if (res.data.success === 1) {
                var bnFill: any[] = [];
                var bnDip: any[] = [];
                res.data.data.forEach((element: any) => {
                    if(element.type === 'Bucket Fill'){
                        bnFill.push(element);
                    }else{
                        bnDip.push(element);
                    }
                });
                getBehaviourData(bnFill);
                getDipBehaviourData(bnDip);
                updateBehaviourCount();
            }
            else {
                dismissIonLoading();
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
    };

    const updateBehaviourCount = () => {
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        var user_role = localStorage.getItem('role');
        const reqObj = {
            student_id: userData.record.student_id,
            role: user_role
        };
        return api.post('api_new/balloon_notification/update_bh_note', reqObj, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((res: any) => {
            console.log('update bh data :', res.data);
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
                        <IonBackButton />
                        <IonTitle >Behavior Note</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSegment mode="md" onIonChange={(e) => btNoteChanged(e)} value={selectedBnValue}>
                    <IonSegmentButton value="bucket_fill">
                        <IonLabel>BUCKET FILL</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="bucket_dip">
                        <IonLabel>BUCKET DIP</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                {selectedBnValue === 'bucket_fill' &&  <div className="notice_day_box">
                {behaviourData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                    <p> No Behavior Notes Found.</p>
                </IonRow>}
                    {behaviourData.slice(0).reverse().map((behaviourItem: any) => {
                        return (
                            <div>
                                <IonRow class="notice_day" >
                                    <IonCol size="12">
                                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                                            {behaviourItem.time.slice(0, 11)}
                                        </p>
                                    </IonCol>
                                </IonRow>
                                <div className="notice_day_details">
                                    <IonRow class="no_margin ion-align-items-center">
                                    </IonRow>
                                    <IonRow class="no_margin ion-align-items-center">
                                        <IonCol size="12">
                                            <p className="date no_margin font_size_body">{behaviourItem.remark}</p>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                {selectedBnValue === 'bucket_dip' &&  <div className="notice_day_box">
                {behaviourDipData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                    <p> No Behavior Notes Found.</p>
                </IonRow>}
                    {behaviourDipData.slice(0).reverse().map((behaviourItem: any) => {
                        return (
                            <div>
                                <IonRow class="notice_day" >
                                    <IonCol size="12">
                                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                                            {behaviourItem.time.slice(0, 11)}
                                        </p>
                                    </IonCol>
                                </IonRow>
                                <div className="notice_day_details">
                                    <IonRow class="no_margin ion-align-items-center">
                                    </IonRow>
                                    <IonRow class="no_margin ion-align-items-center">
                                        <IonCol size="12">
                                            <p className="date no_margin font_size_body">{behaviourItem.remark}</p>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </IonContent>
        </IonPage>
    )
}
export default BehaviourNote;


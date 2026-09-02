/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './circular.css';
import './gatepass.css'

const GatePass: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [gatePassData, getGatePassData] = useState<any>([])
    useIonViewWillEnter(() => {
        apiForGatePassData();
    });
    useEffect(() => {
        console.log(gatePassData, 'gatePassData data');
    });
    const apiForGatePassData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id
          }; 
        return api.post('api_new/webservice/gatepass', reqObj, {
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
            getGatePassData(res.data.student_result);
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
                        <IonBackButton />
                        <IonTitle >Gate Pass</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {gatePassData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Data Found.</p>
                        </IonRow>}
                <div className="circular-cls">
                  {gatePassData.map((item: any) =>{
                    return (
                        <div className="day_time_table">
                    <div className="day_time_table_h">
                        <p className="no_margin day font_size_head">{item?.date}</p>
                    </div>
                    <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="6">
                                <p className="no_margin time_h font_size_body">Name</p>
                            </IonCol>
                            <IonCol size="6">
                                <p className="no_margin room_no_h font_size_body">Relation</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="time_table_details_gate_pass">
                        <IonRow>
                            <IonCol size="6">
                                <span className="font_size_body">{item?.guardian_name}</span>
                            </IonCol>
                            <IonCol size="6">
                                <span className="font_size_body">{item?.guardian_relation}</span>
                            </IonCol>
                        </IonRow>
                    </div>

                    <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="12">
                                <p className="no_margin time_h font_size_body">Purpose</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="time_table_details_gate_pass">
                        <IonRow>
                            <IonCol size="12">
                                <span className="font_size_body">{item?.purpose}</span>
                            </IonCol>
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
export default GatePass;




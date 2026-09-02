/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './circular.css';
import './gatepass.css'

const Infirmary: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [getStudentinformaryData, getStudentinformary] = useState<any>([])
    useIonViewWillEnter(() => {
        apiForStudentinformaryData();
    });
    useEffect(() => {
        console.log(getStudentinformaryData, 'gatePassData data');
    });
    const apiForStudentinformaryData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id
          }; 
        return api.post('api_new/webservice/getStudentinformary', reqObj, {
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
            getStudentinformary(res.data.student_result);
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
                        <IonTitle >Infirmary</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="circular-cls">
                        <div className="day_time_table">
                    <div className="day_time_table_h">
                        <p className="no_margin day font_size_head">{getStudentinformaryData?.measurement_date}</p>
                    </div>
                    <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="4">
                                <p className="no_margin time_h font_size_body">Height:  <span className="values">{getStudentinformaryData?.height}</span></p>
                            </IonCol>
                            <IonCol size="4">
                            <p className="no_margin time_h font_size_body">Weight:  <span className="values">{getStudentinformaryData?.weight}</span></p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin time_h font_size_body">Blood Group:  <span className="values">{getStudentinformaryData?.blood_group}</span></p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <p className="no_margin time_h font_size_body">Medical Note:  <span className="values">{getStudentinformaryData?.medical_note}</span></p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                  
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Infirmary;





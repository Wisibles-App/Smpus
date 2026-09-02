import { IonBackButton,IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const ExamResults: React.FC = () => {
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
    })
    useEffect(() => {
        console.log('use effect');
    })
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">CET RESULTS</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                <Iframe url={'https://smpus.wisibles.com/api_new/cetreports?student_id='+userInfo.record.student_id+'&role=parent'}
        width="100%"
        height="768px"
        id=""
        className=""
        display="block"
        position="relative"/>
                </div>
            </IonContent>
            
        </IonPage>
    )
}
export default ExamResults;

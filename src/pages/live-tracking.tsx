import { IonBackButton, IonButtons,IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import './home-work.css';


const LiveTracking: React.FC = () => {
    var [studentInfo] = useState(localStorage.getItem('studentProfileData') as any);
    studentInfo = JSON.parse(studentInfo);
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
                        <IonTitle className="align-self:center;">Bus Live Tracking</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {studentInfo?.student_result.tracking_link !== '' && 
                 <div>
                 <Iframe url={studentInfo?.student_result.tracking_link}
         width="100%"
         height="768px"
         id=""
         className=""
         display="block"
         position="relative"/>
                 </div>}
                {studentInfo?.student_result.tracking_link === '' && 
                <IonRow class="no_result_found_cls font_size_head">
                 <p className="p_class "> your child's bus route is not available</p>
                 </IonRow>}
            </IonContent>
        </IonPage>
    )
}
export default LiveTracking;

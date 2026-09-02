import { IonBackButton,IonButtons, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { noBase } from "../util/util";



const AddAppointment: React.FC = () => {
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [showIonLoading, dismissIonLoading] = useIonLoading();

    useIonViewWillEnter(() => {
        var userData = localStorage.getItem('studentProfileData') as any;
        userData = JSON.parse(userData);
    })
    useEffect(() => {
    });
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Appointment Details</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                <Iframe url={'https://smpus.wisibles.com/api_new/add_appointment?student_id='+userInfo.record.student_id}
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
export default AddAppointment;

import { IonBackButton,IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { useHistory } from "react-router-dom";

const Upload: React.FC = () => {
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const history = useHistory() as any;
    console.log('history', history);
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
                        <IonTitle className="align-self:center;">UPLOAD HOMEWORK</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                <Iframe url={'https://smpus.wisibles.com/api_new/upload_homework?student_id='+userInfo.record.student_id+'&hw_id='+history.location.state.homeWorkData.id+'&homework_date='+history.location.state.homeWorkData.homework_date+'&submit_date='+history.location.state.homeWorkData.submit_date}
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
export default Upload;

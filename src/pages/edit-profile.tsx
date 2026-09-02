import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import { medleyAPI } from "../util/util";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const EditProfile: React.FC = () => {
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
                        <IonTitle className="align-self:center;">Profile Update</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                <Iframe url={'https://smpus.wisibles.com/api_new/editprofile?student_id='+userInfo.record.student_id}
        width="100%"
        height="768px"
        id=""
        className=""
        display="block"
        position="relative"/>
                    {/* <IonRow class="comm_input">
                        <IonCol size="12">
                            <IonLabel class="edit_profile_label_cls font_size_head">Father's Name</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12">
                        <IonLabel class="edit_profile_label_cls font_size_head">Father's Phone Number</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol >
                        <IonCol size="12"> 
                         <IonLabel class="edit_profile_label_cls font_size_head">Father's Occupation</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12"> 
                        <IonLabel class="edit_profile_label_cls font_size_head">Father's Aadhar Number</IonLabel>
                        <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel class="edit_profile_label_cls font_size_head">Mother's Name</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12">
                        <IonLabel class="edit_profile_label_cls font_size_head">Mother's Phone Number</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol >
                        <IonCol size="12"> 
                         <IonLabel class="edit_profile_label_cls font_size_head">Mother's Occupation</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12"> 
                        <IonLabel class="edit_profile_label_cls font_size_head">Mother's Aadhar Number</IonLabel>
                        <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel class="edit_profile_label_cls font_size_head">Guardian's Name</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12">
                        <IonLabel class="edit_profile_label_cls font_size_head">Guardian's Phone Number</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol >
                        <IonCol size="12"> 
                         <IonLabel class="edit_profile_label_cls font_size_head">Guardian's Occupation</IonLabel>
                            <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                        <IonCol size="12"> 
                        <IonLabel class="edit_profile_label_cls font_size_head margin_btm_50_px">Guardian's Aadhar Number</IonLabel>
                        <IonInput class="input_box input_margin_lable"></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow> 
                * <IonButton class="comm_submit_btn btn_submit_fixed">Submit</IonButton>
                </IonRow> */}
                </div>
            </IonContent>
            
        </IonPage>
    )
}
export default EditProfile;

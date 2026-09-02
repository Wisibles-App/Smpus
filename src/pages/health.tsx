import { IonBackButton,IonButtons, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import './edit-profile.css';
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { noBase } from "../util/util";



const Healthrecord: React.FC = () => {
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [healthRecord, getHealthRecordurl] = useState<any>()

    useIonViewWillEnter(() => {
        var userData = localStorage.getItem('studentProfileData') as any;
        userData = JSON.parse(userData);
        getHealthRecord(userData.student_result.admission_no);
    })
    useEffect(() => {
        console.log(healthRecord);
    });

    const getHealthRecord = async (admissionNo: any) => {
        // Define constants for URLs and headers
        const authorizeUrl = 'https://yiraopenapis.azurewebsites.net/api_new/Authorize/Authorize?ClientId=B9419933-1430-4983-B0AF-AD65AC1C1FEB&ClientKey=8B04CC5D-E29F-460F-AFFC-5B2E0E9CF90B';
        const healthDBLinkUrl = `https://yiraopenapis.azurewebsites.net/api_new/SamasthiSchools/GetMyHealthDBLink?admissionNo=${admissionNo}`;
        const headers = {
        };
        showIonLoading('Loading....');  
        try {
            // Fetch authorization token
            const authResponse = await noBase.get(authorizeUrl);
            if (authResponse.status) {
                console.log('token', authResponse.data.data)
                const authToken = authResponse.data.data;
                const healthRecordResponse = await noBase.get(healthDBLinkUrl, {
                    headers: {
                        ...headers,
                        "Authorization": 'Bearer '+authToken
                    }
                });
                if(healthRecordResponse.status){
                    dismissIonLoading();
                    getHealthRecordurl(healthRecordResponse.data.data);
                }
            } else {
                console.log('Authorization failed');
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            dismissIonLoading();
        }
    };

    // const getHealthRecord = async (admissionNo: any) => {
    //     showIonLoading('Loading....');
    //     try {
    //         const response = await noBase.get(
    //             `https://yiraopenapis.azurewebsites.net/api/Authorize/Authorize?ClientId=B9419933-1430-4983-B0AF-AD65AC1C1FEB&ClientKey=8B04CC5D-E29F-460F-AFFC-5B2E0E9CF90B`,
    //             {
    //                 headers: {
    //                     // You can include headers like "Content-Type", "api-version", "Client-Service", etc. here
    //                     // Example: "Content-Type": "application/json",
    //                     // "api-version": "V1",
    //                     // "Client-Service": "samashti",
    //                     // "Auth-Key": "samashtiAdmin@",
    //                     // "Authorization": userInfo.token,
    //                     // "User-ID": userInfo.id,
    //                 },
    //             }
    //         );

    //         dismissIonLoading();
    //         if (response.status) {
    //             // getHealthRecordurl(response.data.data.url);
    //             const response2 = await noBase.get(
    //                 `https://yiraopenapis.azurewebsites.net/api/SamasthiSchools/GetMyHealthDBLink?admissionNo=`+admissionNo,
    //                 {
    //                     headers: {
    //                         // You can include headers like "Content-Type", "api-version", "Client-Service", etc. here
    //                         // Example: "Content-Type": "application/json",
    //                         // "api-version": "V1",
    //                         // "Client-Service": "samashti",
    //                         // "Auth-Key": "samashtiAdmin@",
    //                         "Authorization": response.data.data
    //                         // "User-ID": userInfo.id,
    //                     },
    //                 }
    //             );
    //         }
    //     } catch (error) {
    //         console.log('error:', error);
    //         dismissIonLoading();
    //     }
    // };
    // const getHealthRecord = (admissionNo: any) => {
    //     showIonLoading('Loading....')
    //     const reqObj = {
    //         'admissionNo' : admissionNo
    //       }; 
    //     return noBase.get(' https://yiraopenapis.azurewebsites.net/api/Authorize/Authorize?ClientId=B9419933-1430-4983-B0AF-AD65AC1C1FEB&ClientKey=8B04CC5D-E29F-460F-AFFC-5B2E0E9CF90B', {
    //         headers:    {
    //             // "Content-Type":    "application/json",
    //             // "api-version" : 'V1'
    //             // "Client-Service":    "samashti",
    //             // "Auth-Key":    'samashtiAdmin@',
    //             // "Authorization":    userInfo.token,
    //             // "User-ID":    userInfo.id
    //           }
    //     }
    //     ).then((res:    any) => {
    //         dismissIonLoading();
    //         console.log('health records:', res);
    //         if(res.status){
    //             getHealthRecordurl(res.data.data.url);
                
    //         }
           
    //     }).catch((error:    any) => {
    //         console.log('error:    ', error);
    //         dismissIonLoading();
    //     })
    // };
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">HEALTH RECORD</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                <Iframe url={healthRecord}
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
export default Healthrecord;

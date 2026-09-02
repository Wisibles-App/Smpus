import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './home-work.css';
import { Browser } from '@capacitor/browser';
import { useHistory } from "react-router-dom";


const MyDay: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const [role, setRole] = useState<any>(localStorage.getItem('role'));
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [mydayData, getMydayData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        setRole(user_role);
        APIForGetMydayTodayData();
    })
    useEffect(() => {
        console.log(mydayData, 'mydayData');
    });
    const APIForGetMydayTodayData = () => {
        showIonLoading('Loading....')
        const reqObj = {
             // "student_id":"2267",
             student_id:    userInfo.record.student_id,
            "doc_type":"4"
          }; 
        return api.post('api_new/Documents/getDocs',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
               "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            getMydayData(res.data);
            updateMydayTodayData();
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    };

    const updateMydayTodayData = ()=>
        {
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);
            var user_role = localStorage.getItem('role');
            const reqObj = {
                student_id: userData.record.student_id,
                role: user_role
              };
              return api.post('api_new/balloon_notification/update_my_day_today', reqObj, {
                headers: {
                  "Content-Type": "application/json"
                }
              }
              ).then((res: any) => {
                console.log('update myday messages data :', res.data);
                dismissIonLoading();
              }).catch((error: any) => {
                dismissIonLoading();
              })
        }

    const clickOnDownload = async (workItem: any)=>{
        var url = 'https://smpus.wisibles.com/uploads/student_documents/'+workItem?.doc;
        console.log('----url---', url);
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >MY DAY TODAY</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {mydayData?.success === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> {mydayData?.message}</p>
                        </IonRow>}
                {mydayData?.data?.map((data: any)=>{
                    return(<div className="homework_box">
                    <IonRow class="homework_header ion-align-items-center">
                        <IonCol size="10" class="font_size_head">
                        {data.created_at.slice(0, 11)}
                        </IonCol>
                       {data?.doc !== '' && <IonCol size="2" onClick={() => clickOnDownload(data)} >
                         <IonImg class="home_work_download_img" src={'../../../assets/images/download_white.svg'} />
                        </IonCol>} 
                    </IonRow>
                    <IonRow class="homework_details">
                        <IonCol size="12">
                            <p className="from_date_h no_margin font_size_body">{data?.title}</p>
                        </IonCol>
                    </IonRow>
                </div>)
                })}
            </IonContent>
        </IonPage>
    )
}
export default MyDay;






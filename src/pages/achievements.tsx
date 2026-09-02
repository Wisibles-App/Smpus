import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { api } from "../util/util";
import './achievements.css';
import { Browser } from '@capacitor/browser';


const AboutSchool: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [achievementsData, getachievementsData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);

    const clickOnAchievement = async (achievement: any)=>{
        var url = achievement;
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }

    useIonViewWillEnter(() => {
        APIForGetAchievementsData();
    })
    useEffect(() => {
        console.log(achievementsData, 'achievementsData');
    });
    const APIForGetAchievementsData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id,
            "doc_type":"2"
          }; 
        return api.post('api_new/Documents/getDocs',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              }
        }
        ).then((res:    any) => {
            getachievementsData(res.data);
            updateAchievementsCount()
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const updateAchievementsCount = ()=>{
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        var user_role = localStorage.getItem('role');
        const reqObj = {
            student_id: userData.record.student_id,
            role: user_role
          };
          return api.post('api_new/balloon_notification/update_ach_note', reqObj, {
            headers: {
              "Content-Type": "application/json"
            }
          }
          ).then((res: any) => {
            dismissIonLoading();
          }).catch((error: any) => {
            dismissIonLoading();
          })
       };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Achievements</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {achievementsData?.success === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Achievements Found.</p>
                        </IonRow>}
                <IonRow>
                    {achievementsData?.data?.map((item: any)=>{
                        return(
                            <div className="achievement_cls_div">
                                <IonRow class="notice_day" >
                                    <IonCol size="12">
                                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                                            {item.created_at.slice(0, 11)}
                                        </p>
                                    </IonCol>
                                </IonRow>
                                <div className="achievement_cls_div_inner">
                                    <IonRow class="no_margin ion-align-items-center">
                                    </IonRow>
                                    <IonRow class="no_margin ion-align-items-center">
                                        <IonCol size="12">
                                            <p className="achievement_cls_title font_size_header">{item.title}</p>
                                            <p className="date no_margin font_size_body">{item.doc}</p>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        )
                    })}
                </IonRow>
            </IonContent>
        </IonPage>
    )
}
export default AboutSchool;





/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './circular.css';
import './gatepass.css'

const Anecdotes: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [ennecdotesData, getEnnecdotes] = useState<any>([])
    useIonViewWillEnter(() => {
        apiForGetEnnecdotes();
    });
    useEffect(() => {
        console.log(ennecdotesData, 'gatePassData data');
    });
    const apiForGetEnnecdotes = () => {
        showIonLoading('Loading....')
        const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
        const reqObj = {
          // date: "2025-04-19"
          date: today
        };
        return api.post('api_new/webservice/getEnnecdotes', reqObj, {
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
            getEnnecdotes(res.data.student_ennecdotes);
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
                        <IonTitle >Anecdotes</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {ennecdotesData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Data Found.</p>
                        </IonRow>}
                <div className="circular-cls">
                  {ennecdotesData.map((item: any) =>{
                    return (
                        <div className="day_time_table">
                    <div className="day_time_table_h">
                        <p className="no_margin day font_size_head">{item?.date}</p>
                    </div>
                    <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="12">
                                <p className="no_margin time_h font_size_body">{item?.description}</p>
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
export default Anecdotes;





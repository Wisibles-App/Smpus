
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, useIonViewWillEnter, useIonLoading, IonCol, IonRow, IonImg, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, CLINT_SERVICE } from '../util/util';
import './groups.css';
import { Browser } from '@capacitor/browser';
const ProgressCard: React.FC = () => {

    const history = useHistory();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);
    const [showIonLoading,dismissIonLoading] = useIonLoading();

    const clickOnImage = async (data: any)=>{
        // history.push('/progress-card-view')
        var url = 'https://smpus.wisibles.com/'+ data.report_card_path;
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }

    const [progressCardData, getReportData] = useState<any>([])
    useIonViewWillEnter(() => {
        APIForGetprogressCardData();
    })
    useEffect(() => {
        console.log(progressCardData, 'Image Data');
    });

    const APIForGetprogressCardData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id,
          }; 
        return api.post('api_new/Webservice/cbseexamresult',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              }
        }
        ).then((res:    any) => {
            dismissIonLoading();
            getReportData(res.data);
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >examination</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent>
                {groupData?.map((groupItem: any)=>{
                    return(
                        <IonRow>
                    <IonCol size="10">
                            {groupItem?.groupname}
                    </IonCol>
                    <IonCol size="2">

                    </IonCol>
                </IonRow>
                    )
                })}
            </IonContent> */}
            {console.log("progressCardData",progressCardData)
            }
             <IonContent class='content_class' fullscreen>
             {progressCardData?.exams?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Data Found.</p>
                        </IonRow>}
                <div className='child_list_cls group_list_cls'>
                    {progressCardData?.exams?.map((progressCard: any)=>{
                        return (
                            <IonRow onClick={() => clickOnImage(progressCard)} class="ion-align-items-center row_box_shadow_cls">
                        <IonCol size="10" >
                            <p className='no_margin font_size_head group_name_cls'>{progressCard.name}</p>
                        </IonCol>
                     <IonCol size="2">
                            <IonImg class='double_arrow_class'src={'../../../assets/images/double_arrow.svg'} />
                        </IonCol>
                    </IonRow>
                        )
                    })}
                </div>
            </IonContent>
        </IonPage>
    )
}
export default ProgressCard;

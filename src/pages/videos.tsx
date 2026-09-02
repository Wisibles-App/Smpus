import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api, CLINT_SERVICE } from "../util/util";
import './videos.css';

const Videos: React.FC = () => {
    const history = useHistory();
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const clickOnView = (onlineExam: any) => {
        // history.push("/video-view",);
        history.push({
            pathname: '/video-view',
            state: { detail: onlineExam }
          })
    };
    const [flippedVideosList, updateVideos] = useState<any>()
    useIonViewWillEnter(() => {
        getOnlineVideoExams();
    })
    useEffect(() => {
        console.log(flippedVideosList, 'online exams data');
    });

    const getOnlineVideoExams = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id
        };
        return api.post('api_new/Webservice/getonlineExam?', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            updateVideos(res.data);
            dismissIonLoading();
            // updateFpvideosCount();
            // dismissIonLoading();
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const updateFpvideosCount = ()=>
    {
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        var user_role = localStorage.getItem('role');
        const reqObj = {
            student_id: userData.record.student_id,
            role: user_role
          };
          return api.post('api_new/balloon_notification/update_fv_quiz_count', reqObj, {
            headers: {
              "Content-Type": "application/json"
            }
          }
          ).then((res: any) => {
            console.log('update fpv data :', res.data);
            dismissIonLoading();
          }).catch((error: any) => {
            dismissIonLoading();
          })
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Flipped Videos</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {flippedVideosList === null && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Flipped Videos Found.</p>
                        </IonRow>}
              {flippedVideosList?.onlineexam?.map((onlineExam: any)=>{
                return(
                    <div>
                    <IonRow class="ion-align-items-center flipped_video_header font_size_head">
                        <IonCol size="8">
                            <p className="no_margin font_size_head">{onlineExam?.exam}</p>
                        </IonCol>
                        <IonCol size="4" class="ion-no-padding" onClick={() => clickOnView(onlineExam)}>
                            <IonRow class="ion-align-items-center ion-float-right">
                                <IonCol size="auto"> <IonImg class="view_img_class_white" src={'../../../assets/images/view_white.svg'} /></IonCol>
                                <IonCol>View</IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <div className="flipped_video_details">
                        <IonRow class="videos_f_row">
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">From</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.assign_date.slice(0,11)}</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">To</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.end_date.slice(0,11)}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_s_row">
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Total Attempts</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.attempt}</p>
                            </IonCol>
                            {/* <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Attempted </p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.attempts}</p>
                            </IonCol> */}
                              <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Duration </p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.duration}</p>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow class="videos_t_row">
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Duration </p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.duration}</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Status </p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.is_active}</p>
                            </IonCol>
                        </IonRow> */}
                        <IonRow class="videos_fi_row">
                            {/* <IonCol size="3">
                                <p className="no_margin row_h font_size_body">  Quiz</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.is_quiz}</p>
                            </IonCol> */}
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Passing(%)</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.passing_percentage}</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Total Questions</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.total_question}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_si_row">
                            {/* <IonCol size="3">
                                <p className="no_margin row_h font_size_body">Total Questions</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.total_question}</p>
                            </IonCol> */}
                            <IonCol size="3">
                                <p className="no_margin row_h font_size_body"> Descriptive Questions </p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin font_size_body">{onlineExam?.total_descriptive}</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    </div>
                )
              })}
            </IonContent>
        </IonPage>
    )
}
export default Videos;






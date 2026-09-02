import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './video-view.css';
import Iframe from 'react-iframe'
import { api, CLINT_SERVICE } from "../util/util";
import { Browser } from '@capacitor/browser';


const Videoview: React.FC = () => {
    const history = useHistory();
    const [showIonLoading, dismissIonLoading] = useIonLoading();


    var onlineExamData = history as any;

    console.log('online exam data:', onlineExamData);
    const [studentExamResultData, getStudentExamResultData] = useState<any>();

    // const clickOnVideo = async (_videoLink: any) => {
    //     await Browser.open({ url: _videoLink });
    //     Browser.addListener('browserFinished', () => {
    //         // This console log fires when the browser is closed
    //         console.log('finished');
    //     })
    // }
    const clickOnStartExam = () => {
        // history.push('/start-exam');
        history.push({
            pathname: '/start-exam',
            state: { onlineExamID: onlineExamData.location.state.detail }
        })
    };
    useEffect(() => {
        console.log(studentExamResultData, 'student exam result data');
    });

    useIonViewWillEnter(() => {
        if (onlineExamData.location.state.detail.is_attempted === '1') {
            var userData = localStorage.getItem('userAuth') as any;
            userData = JSON.parse(userData);

            getExamResult(userData);
        }
    });
    const getExamResult = (userData: any) => {
        showIonLoading('Loading....')
        const reqObj = {
            "onlineexam_student_id": onlineExamData.location.state.detail.onlineexam_student_id,
            "exam_id": onlineExamData.location.state.detail.id
        };
        return api.post('api_new/Webservice/getOnlineExamResult', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userData.token,
                "User-ID": userData.id
            }
        }
        ).then((res: any) => {
            getStudentExamResultData(res.data);
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >{onlineExamData.location.state.detail.is_attempted === "1" ? 'Flipped Videos Quiz Result' : 'Flipped Videos Quiz'}</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="video_view_content">
                {onlineExamData.location.state.detail.is_attempted === '0' && <div>
                    <div className="flipped_video_exam_details">
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Exam</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.exam}</p>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Exam From</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.exam_from}</p>
                        </IonCol>
                    </IonRow> */}
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Exam To</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.exam_to}</p>
                        </IonCol>
                    </IonRow> */}
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Duration</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.duration}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Total Questions</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.total_question}</p>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Description</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.description}</p>
                        </IonCol>
                    </IonRow> */}
                    </div>
                    <IonRow>
                        <Iframe url={onlineExamData.location.state.detail.description}
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        />
                        {/* <IonButton class="start_exam_btn font_size_head" onClick={() => clickOnVideo(onlineExamData.location.state.detail.description)}>View Video</IonButton> */}
                        {/* <IonImg class="thumb_nail_img" src={'../../../assets/images/thumb_nail.jpg'} /> */}
                    </IonRow>
                    <IonRow class="ion-text-center">
                    <p className="row_h font_size_body font_bold">Note: Once you start the quiz, please complete all 10 questions. Leaving the quiz midway will result in it getting saved as incomplete and will be marked accordingly.</p>
                        <IonButton disabled={onlineExamData.location.state.detail.exam_status === '1'} class="start_exam_btn font_size_head" onClick={clickOnStartExam}>Start Quiz</IonButton>
                    </IonRow>
                </div>}
                {onlineExamData.location.state.detail.is_attempted === '1' && <div>
                    <div className="flipped_video_exam_details">
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Exam</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.exam}</p>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Exam From</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.exam_from}</p>
                        </IonCol>
                    </IonRow> */}
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Exam To</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.exam_to}</p>
                        </IonCol>
                    </IonRow> */}
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Duration</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.duration}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Passing (%)</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.passing_percentage}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Total Questions</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.total_question}</p>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow class="videos_f_row">
                        <IonCol size="5">
                            <p className="no_margin row_h font_size_body">Descriptive Questions</p>
                        </IonCol>
                        <IonCol>:</IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body f_v_e_d">{onlineExamData.location.state.detail.total_question}</p>
                        </IonCol>
                    </IonRow> */}
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Correct</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.correct_ans}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Wrong</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.wrong_ans}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Not Attempted</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.not_attempted}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Total Exam Marks</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.exam_total_marks}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Total Score Marks</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.exam_total_scored}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="videos_f_row">
                            <IonCol size="5">
                                <p className="no_margin row_h font_size_body">Score (%)</p>
                            </IonCol>
                            <IonCol>:</IonCol>
                            <IonCol size="6">
                                <p className="no_margin font_size_body f_v_e_d">{studentExamResultData?.result?.exam?.score}</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>}
            </IonContent>
        </IonPage>
    )
}
export default Videoview;

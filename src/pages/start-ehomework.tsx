import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api, CLINT_SERVICE } from "../util/util";
import './start-exam.css';
import { arrowBackOutline } from "ionicons/icons";

const StartEHomeWork: React.FC = () => {
    const history = useHistory() as any;
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    var finalReqObj = [] as any;
    console.log('-------', history);

    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [videoQuestionsList, updateVideoQuestions] = useState<any>()
    useIonViewWillEnter(() => {
        finalReqObj = [];
        getOnlineVideoExamsQuestions();
    })
    useEffect(() => {
        console.log(videoQuestionsList, 'online exams data questions');
    });

    const handleBackButtonCET = () => {
        sumitQuestions();
      };

    const selectAnswer = ((selectedQuestion: any, answer: any) => {
        var selectedObj = {} as any;
        var found = finalReqObj.some((el: any) => el.ehomework_question_id === selectedQuestion.id);
        if (!found) {
            selectedObj.ehomework_question_id = selectedQuestion.id;
            selectedObj.select_option = answer;
            selectedObj.question_type = '';
            selectedObj.ehomework_student_id = videoQuestionsList.ehomework.ehomework_student_id;
            finalReqObj.push(selectedObj);
        }
        else {
            finalReqObj.forEach((element: any, index: any) => {
                if (element.ehomework_question_id === selectedQuestion.id) {
                    element.select_option = answer;
                }
            });
        }
        console.log(finalReqObj);
    });

        // OLD CODE FOR SUBMIT DATE - 07-OCT-2023

   /* const sumitQuestions = ()=>{
        showIonLoading('Loading....')
        return api.post('/api/onlineexamcet/saveonlineexamcet', finalReqObj, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then((res: any) => {
            console.log('submit questions response :', res);
            if(res.data.success === 0)
            {
                presentAlert({
                    header: 'Note',
                    message: res.data.message,
                    buttons: ['OK'],
                })
            }
            else
            {

                 presentToast({
            message: 'Examination submitted successfully!!',
            duration: 1500,
            position: 'middle'
          });
          setTimeout(() => {
            history.push('/home')
          }, 1000);
            }
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    } */

    const sumitQuestions = () => {        
        // Check the length of finalReqObj
        if (finalReqObj.length === 0) {
            showIonLoading('Loading....');
            // If the length is 0, just proceed with the API call
            return api.post('/api_new/ehomework/saveehomework', finalReqObj, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res: any) => {
                console.log('submit questions response :', res);
                if (res.data.success === 0) {
                    presentAlert({
                        header: 'Note',
                        message: res.data.message,
                        buttons: ['OK'],
                    });
                } else {
                    presentToast({
                        message: 'Examination submitted successfully!!',
                        duration: 1500,
                        position: 'middle'
                    });
                    setTimeout(() => {
                        history.push('/home');
                    }, 1000);
                }
                dismissIonLoading();
            })
            .catch((error: any) => {
                console.log('error:    ', error);
                dismissIonLoading();
            });
        } else if (finalReqObj.length>0) {
            // If the length is 1, show a confirmation alert
            presentAlert({
                message: 'Are you sure, you want to submit this exam?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            dismissIonLoading();
                        },
                    },
                    {
                        text: 'Submit',
                        handler: () => {
                            showIonLoading('Loading....');
                            // Proceed with the API call
                            api.post('/api_new/ehomework/saveehomework', finalReqObj, {
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                            .then((res: any) => {
                                console.log('submit questions response :', res);
                                if (res.data.success === 0) {
                                    presentAlert({
                                        header: 'Note',
                                        message: res.data.message,
                                        buttons: ['OK'],
                                    });
                                } else {
                                    presentToast({
                                        message: 'Examination submitted successfully!!',
                                        duration: 1500,
                                        position: 'middle'
                                    });
                                    setTimeout(() => {
                                        history.push('/home');
                                    }, 1000);
                                }
                                dismissIonLoading();
                            })
                            .catch((error: any) => {
                                console.log('error:    ', error);
                                dismissIonLoading();
                            });
                        },
                    },
                ],
            });
        }
    };
    

    const getOnlineVideoExamsQuestions = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id: userInfo.record.student_id,
            ehomework_id: history.location.state.onlineExamID.id
        };
        return api.post('api_new/Webservice/getEhomeworkQuestion', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            updateVideoQuestions(res.data);
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
                        <IonButton onClick={handleBackButtonCET} color="primary"> {/* Add color and other attributes */}
                            <IonIcon className="iconClass" icon={arrowBackOutline} slot="start" />
                        </IonButton>
                    </IonButtons>
                    <IonTitle >{history.location.state.onlineExamID.exam}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonRow class="start-exam-header">
                    <IonCol size="6" class="time_box">
                        <IonRow class="ion-align-items-center ">
                            <IonCol size="12" class="ion-text-center">
                                 <IonImg class="exam_time_img_class" src={'../../../assets/images/time.svg'} /><span>00:59:57</span>
                            </IonCol>
                          
                        </IonRow>
                    </IonCol>
                    <IonCol size="6" class="submit_box">
                        <IonButton class="start_exam_submit_btn">Submit</IonButton>
                    </IonCol>
                </IonRow> */}
                {videoQuestionsList?.ehomework?.questions?.map((question: any, index: number) => {
                    return (<div className="start_exam_row_cls">
                     {question.question !== 'Image Test' &&    <IonRow >
                            <IonCol size="11">
                                <IonRow>
                                    <IonCol size="1" class="ion-no-padding">
                                    {index+1 + ')'}
                                    </IonCol>
                                    <IonCol size="10" class="ion-no-padding">
                                    <p className="no_margin start_exam_question font_size_head"><IonLabel  dangerouslySetInnerHTML={{ __html:  question?.question}}></IonLabel></p>
                                    </IonCol>
                                </IonRow>
                                <IonList>
                                    <IonRadioGroup value="strawberries">
                                        <IonItem lines="none">
                                            <span className="option_image_cls">(a)</span><IonLabel class="select_option_cls" dangerouslySetInnerHTML={{ __html:  question?.opt_a}}></IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_a')} slot="start" value="{question?.opt_a}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                        <span className="option_image_cls">(b)</span><IonLabel class="select_option_cls" dangerouslySetInnerHTML={{ __html: question?.opt_b}}></IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio"  onClick={() => selectAnswer(question,'opt_b')} slot="start" value="{question?.opt_b}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                        <span className="option_image_cls">(c)</span> <IonLabel class="select_option_cls" dangerouslySetInnerHTML={{ __html:  question?.opt_c}}></IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_c')} slot="start" value="{question?.opt_c}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                        <span className="option_image_cls">(d)</span> <IonLabel class="select_option_cls" dangerouslySetInnerHTML={{ __html:  question?.opt_d}}></IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_d')} slot="start" value=" {question?.opt_d}"></IonRadio>
                                        </IonItem>
                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                        </IonRow>} 
                        {/* {question.question !== 'Image Test' &&    <IonRow >
                            <IonCol size="12">
                                <p className="no_margin start_exam_question font_size_head">{index + 1}. {question?.question}</p>
                                <IonList>
                                    <IonRadioGroup value="strawberries">
                                        <IonItem lines="none">
                                            <IonLabel class="select_option_cls">(a) {question?.opt_a}</IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_a')} slot="start" value="{question?.opt_a}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                            <IonLabel class="select_option_cls">(b) {question?.opt_b}</IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio"  onClick={() => selectAnswer(question,'opt_b')} slot="start" value="{question?.opt_b}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                            <IonLabel class="select_option_cls">(c) {question?.opt_c}</IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_c')} slot="start" value="{question?.opt_c}"></IonRadio>
                                        </IonItem>

                                        <IonItem lines="none">
                                            <IonLabel class="select_option_cls">(d) {question?.opt_d}</IonLabel>
                                            <IonRadio mode="md" class="start_exam_radio" onClick={() => selectAnswer(question,'opt_d')} slot="start" value=" {question?.opt_d}"></IonRadio>
                                        </IonItem>
                                    </IonRadioGroup>
                                </IonList>
                            </IonCol>
                        </IonRow>}  */}
                        {/* <IonCard class="select_file_card">
          <IonCardHeader>
            <IonCardTitle><IonImg src={'../../../assets/images/upload.svg'} /></IonCardTitle>
            <IonCardSubtitle class="select_file_to_upload_h font_size_head">Select File to Upload</IonCardSubtitle>
          </IonCardHeader>
    
          <IonCardContent class="ion-text-center">
            <IonButton class="start_exam_choose_file_btn font_size_head">Choose File</IonButton>
          </IonCardContent>
        </IonCard> */}
                    </div>)
                })}
            </IonContent>
            <IonFooter>
                <IonRow>
                    {/* <IonCol size="6" class="prev_btn ion-no-padding">
                    <IonRow>
                    <IonCol size="12" class="ion-text-center ion-no-padding">
                        <p className=" no_margin font_size_head previous_p">
                             <IonImg class="prev_left_arw_img_class " src={'../../../assets/images/back.svg'} />PREVIOUS</p>
                    </IonCol>
                    </IonRow>
                    </IonCol> */}
                    {/* <IonCol size="6" class="next_btn  ion-no-padding">
                        <IonRow>
                    
                    <IonCol size="12" class="ion-text-center ion-no-padding">
                        <p className="no_margin next_p">NEXT
                        <IonImg class="next_left_arw_img_class" src={'../../../assets/images/forward.svg'} /></p>
                    </IonCol>
                  
                        </IonRow>
                
                    </IonCol> */}

                    <IonCol size="12" class="submit_box">
                        <IonButton onClick={sumitQuestions} class="start_exam_submit_btn">Submit</IonButton>
                    </IonCol>
                </IonRow>
            </IonFooter>
        </IonPage>
    )
}
export default StartEHomeWork;






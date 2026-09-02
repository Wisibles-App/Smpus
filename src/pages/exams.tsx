import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './exams.css';
const Exams: React.FC = () => {
    const history = useHistory();  

    const clickOnExamResult = () =>{
        history.push('/reportcard')
    }
    const clickOnSchedule = () =>{
        history.push('/exam-schedule')
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Examination</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="exam_type">
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white " src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head" >Monthly Examination (APRIL) General Purpose(Pass/Fail) 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="4">
                       <p onClick={clickOnExamResult} className="no_margin exam_link font_size_body"> Exam Results</p>
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/time.svg'} />
                    </IonCol>
                    <IonCol size="5">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body">Exam Schedule</p>
                    </IonCol>
                </IonRow>
                </div>
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white" src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head">Mid Term 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="10">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body"> Exam Schedule</p>
                    </IonCol>
                </IonRow>
                <div className="exam_type">
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white " src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head" >Monthly Examination (APRIL) General Purpose(Pass/Fail) 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="4">
                       <p onClick={clickOnExamResult} className="no_margin exam_link font_size_body"> Exam Results</p>
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/time.svg'} />
                    </IonCol>
                    <IonCol size="5">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body">Exam Schedule</p>
                    </IonCol>
                </IonRow>
                </div>
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white" src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head">Mid Term 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="10">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body"> Exam Schedule</p>
                    </IonCol>
                </IonRow>
                <div className="exam_type">
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white " src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head" >Monthly Examination (APRIL) General Purpose(Pass/Fail) 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="4">
                       <p onClick={clickOnExamResult} className="no_margin exam_link font_size_body"> Exam Results</p>
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/time.svg'} />
                    </IonCol>
                    <IonCol size="5">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body">Exam Schedule</p>
                    </IonCol>
                </IonRow>
                </div>
                <IonRow class="exam_type_header ion-align-items-center">
                    <IonCol size="auto">
                        <IonImg class="exam_img_class view_img_class_white" src={'../../../assets/images/examination.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="font_size_head">Mid Term 22-23</p>
                    </IonCol>
                </IonRow>
                <IonRow class="exam_type ion-align-items-center">
                    <IonCol size="1">
                    </IonCol>
                    <IonCol size="1">
                    <IonImg class="exam_img_class" src={'../../../assets/images/exam_result.svg'} />
                    </IonCol>
                    <IonCol size="10">
                    <p onClick={clickOnSchedule} className="no_margin exam_link font_size_body"> Exam Schedule</p>
                    </IonCol>
                </IonRow>
               
            </IonContent>
        </IonPage>
    )
}
export default Exams;






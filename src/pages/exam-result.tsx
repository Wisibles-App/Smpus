import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import './exam-result.css';

const ExamResult: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Flipped Videos Exam Results</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="flipped_video_details">
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Exam</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">MCQ English Exam</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Exam From</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">11/11/2022 10:30 AM</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Exam To</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">11/11/2022 12:30 PM</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Duration</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">01:30:00</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Total Questions</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">11</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="6">
                            <p className="no_margin row_h font_size_body">Description</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin font_size_body">1. The subjects or topics are coverd in this exams will be as per the syllabus</p>
                        </IonCol>
                    </IonRow>
                </div>
                <IonButton>Start Quiz</IonButton>
            </IonContent>
        </IonPage>
    )
}
export default ExamResult;






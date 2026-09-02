import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './presentation.css';
const Presentation: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const clickOnLessonPresent = () => {
        presentAlert({
            header: 'Presenation are typically demonistrations, interduction, lecture or speech meant to inform presuade, inspire, motivate, build goodwill or present new idea/product',
            buttons: ['OK'],
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Lession Plan</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow onClick={clickOnLessonPresent} class="lesson_plan_header ion-align-items-center">
                    <IonCol size="1">
                        <IonImg class="video_img_class" src={'../../../assets/images/view_black.svg'} />
                    </IonCol>
                    <IonCol size="9">
                      <p className="no_margin presentation_h">Presentation</p>  
                    </IonCol>
                    {/* <IonCol size="2">
                        <IonImg class="video_img_class" src={'../../../assets/images/view_black.svg'} />
                    </IonCol> */}
                </IonRow>
                <div className="lesson_plan_class_table">

               
                <IonRow>
                    <IonCol size="4">
                      <p className="no_margin font_weight font_size_head">Class</p>
                    </IonCol>
                    <IonCol size="1">
                        :
                    </IonCol>
                    <IonCol size="7" class="font_size_body">
                    Class 2 (A)
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="4">
                    <p className="no_margin font_weight font_size_head">Subject</p>
                    </IonCol>
                    <IonCol size="1">
                        :
                    </IonCol>
                    <IonCol size="7" class="font_size_body">
                   English (210)
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="4">
                    <p className="no_margin font_weight font_size_head">Date</p>
                    </IonCol>
                    <IonCol size="1">
                        :
                    </IonCol>
                    <IonCol size="7" class="font_size_body">
                    09/11/2022 09:00 AM - 10:00 AM
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="4">
                    <p className="no_margin font_weight font_size_head">Lession</p>
                    </IonCol>
                    <IonCol size="1">
                        :
                    </IonCol>
                    <IonCol size="7" class="font_size_body">
                   Last Spring
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="4">
                    <p className="no_margin font_weight font_size_head">Topic</p>
                    </IonCol>
                    <IonCol size="1">
                        :
                    </IonCol>
                    <IonCol size="7" class="font_size_body">
                   Spring Chapter
                    </IonCol>
                </IonRow>
                </div>
                <IonRow>
                    
                    <p className="no_margin teaching_method_h font_size_head">Teaching Method</p>
                    <p className="no_margin teaching_method_content font_size_body">
Teaching methods are the broader techniques used to help students achieve learning outcomes, while activities are the different ways of implementing these methods. Teaching methods help students: master the content of the course. learn how to apply the content in particular contexts.</p>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}
export default Presentation;




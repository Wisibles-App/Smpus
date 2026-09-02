import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './lession-plan.css';
const LPlan: React.FC = () => {
    const history = useHistory();
    const clickLessionDay = () =>{
        history.push('/presentation')
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
                <IonRow class="ion-align-items-center date_range_class">
                    <IonCol size="1">
                        <IonImg class="date_left_arw_img_class ion-float-right" src={'../../../assets/images/back.svg'} />
                    </IonCol>
                    <IonCol size="10" class="ion-text-center">
                        <p className=" no_margin font_size_head">07/11/2022 - 13/11/2022</p>
                    </IonCol>
                    <IonCol size="1" >
                        <IonImg class="date_right_arw_img_class  ion-float-left" src={'../../../assets/images/forward.svg'} />
                    </IonCol>
                </IonRow>
                <div className="lesson_time_table">
                    <div className="lesson_time_table_h">
                        <IonRow onClick={clickLessionDay}>
                            <IonCol size="8">
                                <p className="no_margin lesson font_size_head">Monday</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-right">
                                <p className="no_margin date font_size_head">07/11/2022</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="lesson_table_headings">
                        <IonRow>
                            <IonCol size="3" class="ion-text-left">
                                <p className="no_margin time_h font_size_body ">Subject</p>

                            </IonCol>
                            <IonCol size="6" class="ion-text-center">
                                <p className="no_margin subject_h font_size_body">Time</p>

                            </IonCol>
                            <IonCol size="3" class="ion-text-center">
                                <p className="no_margin room_no_h font_size_body syllabus_h">Syllabus</p>

                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="lesson_table_details">
                        <IonRow>
                            <IonCol size="4">
                                <span className="font_size_body">English (210)</span>
                            </IonCol>
                            <IonCol size="6" class="ion-text-center">
                                <span className="font_size_body">10:10 AM - 11:11 AM</span>
                            </IonCol>
                            <IonCol size="2" class="ion-text-center">
                                <IonImg class="lesson_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default LPlan;






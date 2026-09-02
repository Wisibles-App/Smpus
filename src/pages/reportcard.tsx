import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import './reportcard.css'
const ReportCard: React.FC = () => {
    const history = useHistory();  
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Report Card</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonRow class="report_card_title">
                    <IonCol size="12">
                        <p className="no_margin font_size_head">Monthly Examination(April)</p>
                        <p className="no_margin font_size_head">General Purpose (Pass/Fail) 20220-2023</p>
                    </IonCol>
                </IonRow>
                <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="2.5">
                                <p className="no_margin time_h font_size_body">Subject</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin subject_h font_size_body">Min Marks</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin room_no_h font_size_body">Marks Obtained</p>
                            </IonCol>
                            <IonCol size="2.5">
                                <p className="no_margin room_no_h font_size_body">Result</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="time_table_details">
                        <IonRow>
                            <IonCol size="2.5">
                                <span className="font_size_body">English</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">33.00</span>
                            </IonCol>
                            <IonCol size="4">
                                <span className="font_size_body">89.00/100.0</span>
                            </IonCol>
                            <IonCol size="2.5">
                                <p className="font_size_body result_status_class">Pass</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2.5">
                                <span className="font_size_body">English</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">33.00</span>
                            </IonCol>
                            <IonCol size="4">
                                <span className="font_size_body">89.00/100.0</span>
                            </IonCol>
                            <IonCol size="2.5">
                                <p className="font_size_body result_status_class">Pass</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2.5">
                                <span className="font_size_body">English</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">33.00</span>
                            </IonCol>
                            <IonCol size="4">
                                <span className="font_size_body">89.00/100.0</span>
                            </IonCol>
                            <IonCol size="2.5">
                                <p className="font_size_body result_status_class">Pass</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2.5">
                                <span className="font_size_body">English</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">33.00</span>
                            </IonCol>
                            <IonCol size="4">
                                <span className="font_size_body">89.00/100.0</span>
                            </IonCol>
                            <IonCol size="2.5">
                                <p className="font_size_body result_status_class">Pass</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <IonRow>
                            <IonCol size="6">
                                <p className="no_margin time_h font_size_header note_class">Note: Good Score</p>
                            </IonCol>
                        </IonRow>
                        <div className="report_card">
                        <IonRow>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">Grand Total</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">: 373/400</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">Percentage</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">: 93.25</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                        <IonCol size="3">
                                <p className="no_margin time_h font_size_body">Division</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">: First</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">Result</p>
                            </IonCol>
                            {/* <IonCol size="1">
                                <p className="no_margin time_h font_size_body">:</p>
                            </IonCol> */}
                            <IonCol size="3">
                            <p className="no_margin time_h font_size_body result_status_class">Pass</p>
                           
                              
                            </IonCol>
                        </IonRow>
                    </div>
            </IonContent>
        </IonPage>
    )
}

export default ReportCard;
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import './syllabus.css'
const Syllabus: React.FC = () => {

    const history = useHistory();
    const clickOnBooks = () => {
        history.push("/books");
        };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Books Issuesd</IonTitle>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonRow class="ion-align-items-center">
                            <IonCol><IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} /> </IonCol>
                            <IonCol onClick={clickOnBooks} className="align-self:center;">Books</IonCol>
                        </IonRow>
   
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="book_details">
                <IonRow class="book_title">
                    <IonCol size="auto">
                        <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="title no_margin font_size_head"> Experiments with Water</p>
                        <p className="profile_name no_margin font_size_head"> Gaurav sinha</p>
                    </IonCol>
                </IonRow>
                <div className="book_info">
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Issue Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Book No</p>
                            <p className="no_margin font_size_body">7789</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Due Return Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Return Date</p>
                            <p className="no_margin font_size_body">01/09/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12">
                    <IonRow class="ion-align-items-center">
                        <IonCol size="1">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="2">
                            <p className="no_margin font_size_body">Status <span>:</span></p>
                        </IonCol>
                        <IonCol size="9">
                            <IonButtons class="no_margin books_issued_status_btn font_size_body">Not Required</IonButtons>
                            {/* <IonButton class="start_exam_btn" onClick={clickOnStartExam}>Start Exam</IonButton> */}
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                </div>
                </div>
                <div className="book_details">
                <IonRow class="book_title">
                    <IonCol size="auto">
                        <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="title no_margin font_size_head"> Experiments with Water</p>
                        <p className="profile_name no_margin font_size_head"> Gaurav sinha</p>
                    </IonCol>
                </IonRow>
                <div className="book_info">
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Issue Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Book No</p>
                            <p className="no_margin font_size_body">7789</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Due Return Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Return Date</p>
                            <p className="no_margin font_size_body">01/09/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12">
                    <IonRow class="ion-align-items-center">
                        <IonCol size="1">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="2">
                            <p className="no_margin font_size_body">Status<span>:</span></p>
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin status_btn font_size_body">Not Required</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                </div>
                </div>
                <div className="book_details">
                <IonRow class="book_title">
                    <IonCol size="auto">
                        <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="title no_margin font_size_head"> Experiments with Water</p>
                        <p className="profile_name no_margin font_size_head"> Gaurav sinha</p>
                    </IonCol>
                </IonRow>
                <div className="book_info">
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Issue Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Book No</p>
                            <p className="no_margin font_size_body">7789</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Due Return Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Return Date</p>
                            <p className="no_margin font_size_body">01/09/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12">
                    <IonRow class="ion-align-items-center">
                        <IonCol size="1">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="2">
                            <p className="no_margin font_size_body">Status</p>
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin status_btn font_size_body">Not Required</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                </div>
                </div>
                <div className="book_details">
                <IonRow class="book_title">
                    <IonCol size="auto">
                        <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                    </IonCol>
                    <IonCol size="10">
                        <p className="title no_margin font_size_head"> Experiments with Water</p>
                        <p className="profile_name no_margin font_size_head"> Gaurav sinha</p>
                    </IonCol>
                </IonRow>
                <div className="book_info">
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Issue Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Book No</p>
                            <p className="no_margin font_size_body">7789</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Due Return Date</p>
                            <p className="no_margin font_size_body">09/11/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin font_size_body">Return Date</p>
                            <p className="no_margin font_size_body">01/09/2022</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12">
                    <IonRow class="ion-align-items-center">
                        <IonCol size="1">
                            <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                        </IonCol>
                        <IonCol size="2">
                            <p className="no_margin font_size_body">Status</p>
                        </IonCol>
                        <IonCol size="9">
                            <p className="no_margin status_btn font_size_body">Not Required</p>
                        </IonCol>
                    </IonRow>
                </IonCol>
                </IonRow>
                </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Syllabus;
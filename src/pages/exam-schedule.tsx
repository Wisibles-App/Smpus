import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router-dom";
import './exam-schedule.css';
const ExamSuhedule: React.FC = () => {
    const history = useHistory();

    const clickOnExamResult = () => {
        history.push('/reportcard')
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Exam Schedule</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="book_details main_div_sche">
                    <IonRow class="book_title">
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                        </IonCol>
                        <IonCol size="10">
                            <p className="title no_margin font_size_head">Hindi (230)</p>
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
                                        <p className="no_margin font_size_body">Date</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/room.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Room No</p>
                                        <p className="no_margin font_size_body">7789</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Start Time</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Duration</p>
                                        <p className="no_margin font_size_body">002</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow class="min_max_class">
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Max Marks</p>
                                <p className="no_margin font_size_body">100</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Min Marks</p>
                                <p className="no_margin font_size_body">33</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Credit Hours</p>
                                <p className="no_margin font_size_body">2</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                <div className="book_details main_div_sche">
                    <IonRow class="book_title">
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                        </IonCol>
                        <IonCol size="10">
                            <p className="title no_margin font_size_head">Hindi (230)</p>
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
                                        <p className="no_margin font_size_body">Date</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/room.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Room No</p>
                                        <p className="no_margin font_size_body">7789</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Start Time</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Duration</p>
                                        <p className="no_margin font_size_body">002</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow class="min_max_class">
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Max Marks</p>
                                <p className="no_margin font_size_body">100</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Min Marks</p>
                                <p className="no_margin font_size_body">33</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Credit Hours</p>
                                <p className="no_margin font_size_body">2</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                <div className="book_details main_div_sche">
                    <IonRow class="book_title">
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                        </IonCol>
                        <IonCol size="10">
                            <p className="title no_margin font_size_head">Hindi (230)</p>
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
                                        <p className="no_margin font_size_body">Date</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/room.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Room No</p>
                                        <p className="no_margin font_size_body">7789</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Start Time</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Duration</p>
                                        <p className="no_margin font_size_body">002</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow class="min_max_class">
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Max Marks</p>
                                <p className="no_margin font_size_body">100</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Min Marks</p>
                                <p className="no_margin font_size_body">33</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Credit Hours</p>
                                <p className="no_margin font_size_body">2</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                <div className="book_details main_div_sche">
                    <IonRow class="book_title">
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                        </IonCol>
                        <IonCol size="10">
                            <p className="title no_margin font_size_head">Hindi (230)</p>
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
                                        <p className="no_margin font_size_body">Date</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/room.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Room No</p>
                                        <p className="no_margin font_size_body">7789</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Start Time</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Duration</p>
                                        <p className="no_margin font_size_body">002</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow class="min_max_class">
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Max Marks</p>
                                <p className="no_margin font_size_body">100</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Min Marks</p>
                                <p className="no_margin font_size_body">33</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Credit Hours</p>
                                <p className="no_margin font_size_body">2</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                <div className="book_details main_div_sche">
                    <IonRow class="book_title">
                        <IonCol size="auto">
                            <IonImg class="book_img_class" src={'../../../assets/images/book_white.svg'} />
                        </IonCol>
                        <IonCol size="10">
                            <p className="title no_margin font_size_head">Hindi (230)</p>
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
                                        <p className="no_margin font_size_body">Date</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/room.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Room No</p>
                                        <p className="no_margin font_size_body">7789</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Start Time</p>
                                        <p className="no_margin font_size_body">09/11/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/time.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body">Duration</p>
                                        <p className="no_margin font_size_body">002</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow class="min_max_class">
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Max Marks</p>
                                <p className="no_margin font_size_body">100</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Min Marks</p>
                                <p className="no_margin font_size_body">33</p>
                            </IonCol>
                            <IonCol size="4">
                                <p className="no_margin font_size_body start_time_h">Credit Hours</p>
                                <p className="no_margin font_size_body">2</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                
            </IonContent>
        </IonPage>
    )
}
export default ExamSuhedule;






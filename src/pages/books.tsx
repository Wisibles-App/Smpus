import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import './book.css'
const Books: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Library Books</IonTitle>
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
                            <p className="title no_margin font_size_head">The Science book: Big ideas </p>
                            <p className="profile_name no_margin  author_class">Author: Gaurav sinha</p>
                            <p className="profile_name no_margin author_class">Publisher: Gaurav sinha</p>

                        </IonCol>
                    </IonRow>
                    <div className="book_info">
                        <IonRow>
                            <IonCol size="5.5">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                                    </IonCol>
                                    <IonCol size="9" >
                                        <p className="no_margin font_size_body book_margin_cls">Subject : Science</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6.5" >
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body book_margin_cls">Added On: 05/12/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Rock No: 110</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Quantity: 100</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Price: ₹ 1800.00</p>
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
                            <p className="title no_margin font_size_head">The Science book: Big ideas </p>
                            <p className="profile_name no_margin  author_class">Author: Gaurav sinha</p>
                            <p className="profile_name no_margin author_class">Publisher: Gaurav sinha</p>

                        </IonCol>
                    </IonRow>
                    <div className="book_info">
                        <IonRow>
                            <IonCol size="5.5">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                                    </IonCol>
                                    <IonCol size="9" >
                                        <p className="no_margin font_size_body book_margin_cls">Subject : Science</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6.5" >
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body book_margin_cls">Added On: 05/12/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Rock No: 110</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Quantity: 100</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Price: ₹ 1800.00</p>
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
                            <p className="title no_margin font_size_head">The Science book: Big ideas </p>
                            <p className="profile_name no_margin  author_class">Author: Gaurav sinha</p>
                            <p className="profile_name no_margin author_class">Publisher: Gaurav sinha</p>

                        </IonCol>
                    </IonRow>
                    <div className="book_info">
                        <IonRow>
                            <IonCol size="5.5">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                                    </IonCol>
                                    <IonCol size="9" >
                                        <p className="no_margin font_size_body book_margin_cls">Subject : Science</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6.5" >
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body book_margin_cls">Added On: 05/12/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Rock No: 110</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Quantity: 100</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Price: ₹ 1800.00</p>
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
                            <p className="title no_margin font_size_head">The Science book: Big ideas </p>
                            <p className="profile_name no_margin  author_class">Author: Gaurav sinha</p>
                            <p className="profile_name no_margin author_class">Publisher: Gaurav sinha</p>

                        </IonCol>
                    </IonRow>
                    <div className="book_info">
                        <IonRow>
                            <IonCol size="5.5">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                                    </IonCol>
                                    <IonCol size="9" >
                                        <p className="no_margin font_size_body book_margin_cls">Subject : Science</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6.5" >
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body book_margin_cls">Added On: 05/12/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Rock No: 110</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Quantity: 100</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Price: ₹ 1800.00</p>
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
                            <p className="title no_margin font_size_head">The Science book: Big ideas </p>
                            <p className="profile_name no_margin  author_class">Author: Gaurav sinha</p>
                            <p className="profile_name no_margin author_class">Publisher: Gaurav sinha</p>

                        </IonCol>
                    </IonRow>
                    <div className="book_info">
                        <IonRow>
                            <IonCol size="5.5">
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/syllabus_lang.svg'} />
                                    </IonCol>
                                    <IonCol size="9" >
                                        <p className="no_margin font_size_body book_margin_cls">Subject : Science</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size="6.5" >
                                <IonRow>
                                    <IonCol size="auto">
                                        <IonImg class="book_img_class" src={'../../../assets/images/calendar.svg'} />
                                    </IonCol>
                                    <IonCol size="9">
                                        <p className="no_margin font_size_body book_margin_cls">Added On: 05/12/2022</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Rock No: 110</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Quantity: 100</p>
                            </IonCol>
                            <IonCol size="4" class="ion-text-center">
                                <p className="no_margin font_size_body">Price: ₹ 1800.00</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Books;
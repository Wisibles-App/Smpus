import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonInput, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast, useIonViewWillEnter } from "@ionic/react";
import './communication.css';
import { api, medleyAPI } from "../util/util";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Browser } from '@capacitor/browser';
import axios from 'axios';

// Communications.phonecall('0123456789', true)
const Communication: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [data, setData] = useState([])

    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);
    const [message, setMessage] = useState<any>('');
    const [mobileNumber, setMobileNumber] = useState<any>(studentProfileData?.student_result?.primary_mobile_number);
    const history = useHistory();
    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const clickOnAppointment = async () => {
        history.push('/appointment')
    }

    const clickOnChat = async () => {
        const studentID = userInfo.record.student_id;
        var url = 'https://smpus.wisibles.com/api_new/addchat?student_id=' + studentID
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        // })
    };
    const sendEmail = () => {

    }
    const submit = () => {

        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);

        var studentData = localStorage.getItem('studentProfileData') as any;
        studentData = JSON.parse(studentData);

        showIonLoading('Loading....')
        const reqObj = {
            "email": studentProfileData?.student_result?.primary_email_id,
            "usertype": 'parent',
            "mobile": mobileNumber,
            "message": message,
            "department": selectedOption,
            "parent_name": userData.record.name,
            "admission_no": studentData.student_result.admission_no,
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
        };
        return api.post('api_new/Webservice/sendmailcum', reqObj, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            presentToast({
                message: res.data.message,
                duration: 1000,
                position: 'middle'
            });
            setTimeout(() => {
                history.goBack();
            }, 1000);
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }

    const fetchStatus = async () => {
        try {
            const res = await axios.get("https://smpus.wisibles.com/api_new/Communication/get_communication_numbers");
            dismissIonLoading();
            setData(res?.data?.result)
        } catch (error) {
            console.error("Error fetching status:", error);
        }
    };


    useIonViewWillEnter(() => {
        showIonLoading('Loading....')
        fetchStatus()
        //    let  url =
    })
    useEffect(() => {
        console.log('use effect');
    })
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Communication</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <p className="comm_head_1 font_size_head">
                    For assistance, please call below numbers.
                    {/* <a className="phone-link" href="tel:+918374551155">8374-551-155</a>. */}
                </p>
                <IonContent>

                    <IonCol className="contact-list">
                        {data.map((item: any, index) => (
                            <div className="contact-item" key={item.id}>
                                <p className="contact-index">{index + 1}.</p>
                                <p className="num_header">{item.name} </p>
                                <span>:</span>
                                <a className="phone-link" href={`tel:${item.mobile.replace(/\s/g, '')}`}>
                                    {item.mobile}
                                </a>
                            </div>
                        ))}
                    </IonCol>
                </IonContent>



                {/* <p className="comm_head_1 font_size_head">For assistance, please call us at 8374551155</p> ///</IonContent>COMented
                <p className="comm_head_2">Let us know your queries & feedbacks.</p>
                <IonRow>
                    <IonCol size="6" class="ion-text-center" >
                    <a  href="tel:+918374551155">
                        <IonButton class="callus_btn">
                            <IonImg class="call_img_class" src={'../../../assets/images/call_orange.svg'} /> Call Us
                        </IonButton>
                        </a>

                    </IonCol>//COMmented
                      <IonCol size="6" class="ion-text-center" >
                        <IonButton class="callus_btn" onClick={clickOnAppointment}>
                             Appointment
                        </IonButton>
                    </IonCol>. //COMmented
                    <IonCol size="6" class="ion-text-center"> 
                    <a  href="mailto:Info@samashtischool.com"></a> ///commented
                        <IonButton class="mailus_btn" onClick={clickOnChat}>
                            <IonImg class="mail_img_class" src={'../../../assets/images/chat_white.svg'} /> Chat
                        </IonButton>
                        </a>    // commented
                    </IonCol>
                </IonRow>
                <div>
                    <IonRow>
                        <IonCol>
                            <p className="send_msg_h">or send your message</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="comm_input">
                        <IonCol size="12">
                            <IonInput placeholder="Phone" type="tel" value={mobileNumber} class="input_box" onIonChange={e => setMobileNumber(e.detail.value!)}></IonInput>
                        </IonCol>
                        <IonCol size="12">
                            <IonInput readonly placeholder="Email" value={studentProfileData?.student_result?.primary_email_id} class="input_box"></IonInput>
                        </IonCol >
                        <IonSelect className="select_cls_2"
                         value={selectedOption}
                         onIonChange={handleSelectChange}
        placeholder="Select Department"
      >
        <IonSelectOption value="admissions">Admissions</IonSelectOption>
        <IonSelectOption value="academics">Academics</IonSelectOption>
        <IonSelectOption value="accounts">Accounts</IonSelectOption>
        <IonSelectOption value="transport">Transport</IonSelectOption>
        <IonSelectOption value="stores">Stores</IonSelectOption>
        <IonSelectOption value="operations">Operations</IonSelectOption>


      </IonSelect>
                        <IonCol size="12"> 
                         <IonInput placeholder="Message"  value={message} onIonChange={e => setMessage(e.detail.value!)} class="input_box"></IonInput>
                        </IonCol>
                    </IonRow>
                </div>
                <IonRow>
                <IonButton disabled={message === '' || selectedOption === ''} class="comm_submit_btn" onClick={submit}>Submit</IonButton>
                    {/* {items.map(item => {
                        return (
                            <IonButton class="comm_submit_btn">{item.pharmacyName}</IonButton>
                        )
                    })}
                    <IonButton class="comm_submit_btn">Submit</IonButton>
                </IonRow> */}
            </IonContent>
        </IonPage>
    )
}
export default Communication;

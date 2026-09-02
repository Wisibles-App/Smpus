import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './home-work.css';
import { Browser } from '@capacitor/browser';
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { stringify } from "querystring";


const StudentDairy: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const [role, setRole] = useState<any>(localStorage.getItem('role'));
    const viewDairy = (viewObj: any) => {
        presentAlert({
            // header: description,
            message: viewObj.description,
            buttons: ['OK'],
            cssClass: 'homework_alert'
        })
    };
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [dairyData, getDairyData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    console.log("userInfo", userInfo)
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        setRole(user_role);
        APIForGetDairyData();
    })
    useEffect(() => {
        handleSchedule()
        console.log(dairyData, 'student home work data');
    });
    const APIForGetDairyData = () => {
        var studentInfo = localStorage.getItem('studentProfileData') as any;
        studentInfo = JSON.parse(studentInfo);
        showIonLoading('Loading....')
        console.log("studentInfo",studentInfo);
        
        const reqObj = {
            section_id: studentInfo.student_result.section_id,
            class_id: studentInfo.student_result.class_id
        };
        return api.post('api_new/Student_dairy/getdairy', reqObj, {
            headers: {
                "Content-Type": "application/json",
                "Client-Service": CLINT_SERVICE,
                "Auth-Key": 'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            getDairyData(res.data);
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    };

    const clickOnDownload = async (workItem: any) => {
        let data: string[] = []

        try {
            if (Array.isArray(workItem.document)) {
                data = workItem.document;
            } else if (typeof workItem?.document == 'string') {
                const parsed = JSON.parse(workItem?.document)
                data = Array.isArray(parsed) ? parsed : [parsed]

            }
        } catch (e) {
            console.log('invalid document foormat', e)
            if (typeof workItem?.document == 'string') {
                data = [workItem.document]
            }
        }
        viewDownloads(data)
        //   console.log("workItem?.document",workItem?.document[0])
        //         workItem?.document?.array.forEach((element  :any) => {
        //             console.log(element)
        //         });
        //         // 
        //         var url = 'https://smpus.wisibles.com/uploads/homework/'+workItem?.document;
        //         // window.open(url, '_system');
        //         console.log('----url---', url);
        //         // await Browser.open({ url: url });
        //         // Browser.addListener('browserFinished', () => {
        //         //     // This console log fires when the browser is closed
        //         //     console.log('finished');
        //         //   })
    }

    const viewDownloads = (documents: string[]) => {
        const fileButtons = documents.map((doc, index) => {
            const fileUrl = `https://smpus.wisibles.com/uploads/homework/${doc}`;
            const fileName = doc.split('!')[1] || doc;
            return {
                text: ` ${index + 1}.${fileName}`,
                handler: () => {
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                },
                cssClass: 'file-button'

            };
        });

        fileButtons.push({

            text: 'OK',
            handler: () => 'cancel',
            cssClass: 'ok-button sticky-ok-button' // <- key class
        });

        presentAlert({
            header: 'Press to download',
            buttons: fileButtons,
            cssClass: 'homework_alert'
        });
    }

    const clickOnUpload = async (workItem: any) => {
        history.push({
            pathname: '/upload',
            state: { homeWorkData: workItem }
        })
    }
    const handleSchedule = async () => {
        // setActiveTab("schedule");
        // showLoading("Fetching schedule...");

        const reqObj = {
            student_id: userInfo.record.student_id,
            // "student_id":"3085",
            // exam_group_class_batch_exam_id: examItem.exam_group_class_batch_exam_id,

        };
        // https://vignanehs.wisibles.com/api/Webservice/cbseexamtimetable
        api.post("api/Webservice/cbseexamtimetable", reqObj, {
            headers: {
                "Content-Type": "application/json",
                "Client-Service": CLINT_SERVICE,
                "Auth-Key": "schoolAdmin@",
                Authorization: userInfo.token,
                // exam_group_class_batch_exam_id: examItem.exam_group_class_batch_exam_id,

            },
        })
            .then((res: any) => {
                // dismissLoading();
                console.log("Schedule Response:", res);
                console.log("res", res);
                console.log("res.data",typeof(res.data.result));
                

                history.push({
                    pathname: "/newexam-schedule",
                    state: { examData: res.data.result },
                });
            })
            .catch((err) => {
                console.error(err);
                // dismissLoading();
            });
    };

    return (
        console.log("dairyData",dairyData),
        
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Student Homework</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                { dairyData?.data?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                    <p> No Student Homework Found.</p>
                </IonRow>}
                {dairyData?.data?.map((dairy: any) => {
                    return (<div className="homework_box">
                        <IonRow class="homework_header ion-align-items-center">
                            <IonCol size="7" class="font_size_head">
                                {format(new Date(dairy.created_at), 'dd MMM yyyy, hh:mm a')}
                            </IonCol>
                            {dairy.document && <IonCol size="1" onClick={() => clickOnDownload(dairy)} >
                                <IonImg class="home_work_download_img" src={'../../../assets/images/download_white.svg'} />
                            </IonCol>}
                            <IonCol size="4" onClick={() => viewDairy(dairy)}>
                                <IonRow class="no_margin ion-float-right ion-align-items-center">
                                    {/* <IonCol size="auto">
                                    <IonImg class="leave_header_img" src={'../../../assets/images/download.svg'} />
                                </IonCol> */}
                                    <IonCol size="auto">
                                        <IonImg class="leave_header_img" src={'../../../assets/images/view_white.svg'} />
                                    </IonCol>
                                    <IonCol class="work_view_details">
                                        <p className="no_margin view_btn">View</p>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>

                    </div>)
                })}
            </IonContent>
        </IonPage>
    )
}
export default StudentDairy;






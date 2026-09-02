import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './home-work.css';
import { Browser } from '@capacitor/browser';
import { useHistory } from "react-router-dom";


const Homework: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const [role, setRole] = useState<any>(localStorage.getItem('role'));
    const clickOnHomeWorkView = (viewObj: any) =>{
       updateHomeWorkCount(viewObj)
    };
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [studentHomeWorkData, getstudentHomeWorkData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        setRole(user_role);
        APIForGetStudentHomeWorkData();
    })
    useEffect(() => {
        console.log(studentHomeWorkData, 'student home work data');
    });
    const APIForGetStudentHomeWorkData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id
          }; 
        return api.post('api_new/Webservice/getHomework',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id,
                "homework_status": 'pending'
              }
        }
        ).then((res:    any) => {
            console.log("RESSS",res.data);
            
            getstudentHomeWorkData(res.data);
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('Note:    ', error);
            dismissIonLoading();
        })
    };

   const updateHomeWorkCount = (homeWorkData: any)=>{
    showIonLoading('Loading....')
    var userData = localStorage.getItem('userAuth') as any;
    userData = JSON.parse(userData);
    var user_role = localStorage.getItem('role');
    var studentInfo = localStorage.getItem('studentProfileData') as any;
    studentInfo = JSON.parse(studentInfo);

    if (user_role === 'parent') {
      const reqObj = {
        parent_id: userData.id,
        class_id: studentInfo.student_result.class_id,
        section_id:studentInfo.student_result.section_id,
        homework_id: homeWorkData.id
      };

      return api.post('api_new/balloon_notification/update_homework_parent', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        dismissIonLoading();
        // var description = homeWorkData.description.replace(/(<([^>]+)>)/ig, '');
        presentAlert({
            // header: description,
            message: homeWorkData.description,
            buttons: ['OK'],
            cssClass:'homework_alert'
        })

      }).catch((error: any) => {
        dismissIonLoading();
      })
    }
    else {
      const reqObj = {
        student_id: userData.record.student_id,
        class_id: studentInfo.student_result.class_id,
        section_id:studentInfo.student_result.section_id,
        homework_id: homeWorkData.id
      };

      return api.post('api_new/balloon_notification/update_homework_student', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        dismissIonLoading();
        // var description = homeWorkData.description.replace(/(<([^>]+)>)/ig, '');
        presentAlert({
            // header: description,
            message: homeWorkData.description,
            buttons: ['OK'],
            cssClass:'homework_alert'
        })

      }).catch((error: any) => {
        console.log('error:    ', error);
        dismissIonLoading();
      })
    }
   }

    const clickOnDownload = async (workItem: any)=>{
        var url = 'https://smpus.wisibles.com/uploads/homework/'+workItem?.document;
        console.log('----url---', url);
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }
    const clickOnUpload = async (workItem: any)=>{
        history.push({
            pathname: '/upload',
            state: { homeWorkData: workItem}
          })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Home Work</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {studentHomeWorkData?.homeworklist?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Home Work Found.</p>
                        </IonRow>}
                {studentHomeWorkData?.homeworklist?.map((homeWork: any)=>{
                    return(<div className="homework_box">
                    <IonRow class="homework_header ion-align-items-center">
                        <IonCol size="6" class="font_size_head">
                            {homeWork.name}
                        </IonCol>
                        {role === 'student' && homeWork?.homework_type === "1" && homeWork?.homework_evaluation_id === "0" &&<IonCol size="1" onClick={() => clickOnUpload(homeWork)} >
                       <IonImg class="home_work_download_img" src={'../../../assets/images/upload_white.svg'} />
                        </IonCol> } 
                       {homeWork?.document !== '' && <IonCol size="1" onClick={() => clickOnDownload(homeWork)} >
                         <IonImg class="home_work_download_img" src={'../../../assets/images/download_white.svg'} />
                        </IonCol>} 
                        <IonCol size="4" onClick={() => clickOnHomeWorkView(homeWork)}>
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
                    <IonRow class="homework_details">
                        <IonCol size="9">
                            <p className="from_date_h no_margin font_size_body">{homeWork?.class}</p>
                        </IonCol>
                        <IonCol size="3">
                            {homeWork?.student_assignment_id === "0" && <p className="work_status_btn_red no_margin font_size_body">Incomplete</p> }
                            {homeWork?.student_assignment_id !== "0" && homeWork?.homework_evaluation_id === "0" && <p className="work_status_btn_orange no_margin font_size_body">Completed</p> }
                            {/* {homeWork?.homework_evaluation_id === "0" && homeWork?.document !== '' &&
                             <p className="work_status_btn no_margin font_size_body">Complete</p> } */}
                          {homeWork?.student_assignment_id !== "0" && homeWork?.homework_evaluation_id !== "0" &&
                          <p className="work_status_btn_green no_margin font_size_body">Checked</p>
                          }  
                        </IonCol>
                    </IonRow>
                    <IonRow class="homework_details">
                        <IonCol size="4">
                            <p className="from_date_h no_margin font_size_body">Homework Date</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">{homeWork?.homework_date}</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">Type{ homeWork?.homework_type === "0" ?' Offline':' Online'}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="homework_details">
                        <IonCol size="4">
                            <p className="from_date_h no_margin font_size_body">Submission Date</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">{homeWork?.submit_date}</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">Created by {homeWork?.staff_created}</p>
                        </IonCol>
                    </IonRow>
                    {homeWork?.evaluated_by !== "0" && <IonRow class="homework_details">
                        <IonCol size="4">
                            <p className="from_date_h no_margin font_size_body">Evaluation Date</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">{homeWork?.evaluation_date}</p>
                        </IonCol>
                        <IonCol size="4">
                        <p className="from_date_h no_margin font_size_body">Evaluated by {homeWork?.staff_evaluated}</p>
                        </IonCol>
                    </IonRow>}
                </div>)
                })}
            </IonContent>
        </IonPage>
    )
}
export default Homework;






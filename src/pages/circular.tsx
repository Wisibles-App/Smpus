/* eslint-disable array-callback-return */
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './notice.css';
import './circular.css';
import { Browser } from "@capacitor/browser";

const Circular: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [academicYears, setAcademicYears] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    const [notificationData, circularData] = useState<any>([])
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
        const academicYears = generateLast25AcademicYears();
        console.log('academicYears', academicYears);
        setAcademicYears(academicYears); // populate dropdown
        setSelectedYear(academicYears[0]); // default to most recent
        getCircularData(user_role,userData);
        console.log('selectedYear', selectedYear);

    });
    useEffect(() => {
        console.log(notificationData, 'notification data');
    });
    const getCircularData = (userRole:any, userData: any) => {
        var studentInfo = localStorage.getItem('studentProfileData') as any;
        studentInfo = JSON.parse(studentInfo);
        showIonLoading('Loading....')
        const reqObj = {
            section_id: studentInfo.student_result.section_id,
            class_id: studentInfo.student_result.class_id,
            type: ''
          }; 

    //     var reqObj = {
    //         student_id: '',
    //        type: '',
    //        parent_id: ''
    //    };
        
    //     if(userRole === 'student')
    //     {
    //         reqObj = {
    //            student_id: userData.record.student_id,
    //            type: userRole,
    //            parent_id: ''
    //        };
    //     }
    //     else
    //     {
    //         reqObj = {
    //            student_id: '',
    //            type: userRole,
    //            parent_id: userData.id
    //        };
    //     }
        return api.post('api_new/Circular/getcircular', reqObj, {
            headers: {
                "Content-Type": "application/json",
              "Client-Service":  CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id,
                // 'Cookie': 'ci_session=36f96a4f5090b4dd0a753ede765a21d0d9f5460a'
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            if (res.data.success === 1) {
                circularData(res.data.data);
            }
            else {
                // presentAlert({
                //     header: 'Note',
                //     message: res.data.message,
                //     buttons: ['OK'],
                // })
            }
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }

const viewDownloads = (documents: string[]) => {
  const fileButtons = documents.map((doc, index) => {
    const fileUrl = doc;
    const fileName = doc.split('!')[1] || doc;
    return {
      text: `${index + 1}. ${fileName}`,
      handler: () => {
       
        const link = document.createElement('a');
        link.href = fileUrl;
        //  window.open(fileUrl, '_system');
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      cssClass: 'file-button'
    };
  });

  // Add X button last with custom class
  fileButtons.push({
    text: 'OK',
    handler: () =>'cancel',
    cssClass: 'ok-button sticky-ok-button' // <- key class
  });

  presentAlert({
    header:'Press to download',
    buttons: fileButtons,
    cssClass: 'homework_alert'
  });
};


    const clickOnDownload = async (workItem: any)=>{
        var url = workItem?.attachment;
         let data: string[] =[]
        try{
            if(Array.isArray(workItem.attachment)){
                 data= workItem.attachment;
            }else if(typeof workItem?.attachment == 'string'){
                const parsed = JSON.parse(workItem?.attachment)
                data = Array.isArray(parsed) ? parsed : [parsed]
            }
        }catch (e){
            console.log('invalid document foormat',e)
            if( typeof workItem?.attachment == 'string'){
                data = [workItem.attachment]
            }
        }
        viewDownloads(data)
        // window.open(url, '_system'); --< old Code 

        // console.log('----url---', url);
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }

    const clickOnLessonView = async(noticeData: any) => {
        // updateNoticeCount(noticeData)
        presentAlert({
            // header: description,
            message:  noticeData.message,
            buttons: ['OK'],
            cssClass: 'notice_alert'
        });
    };

    const generateLast25AcademicYears = (): string[] => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0 = Jan, 11 = Dec
      
        const startYear = currentMonth < 3 ? currentYear - 1 : currentYear; // academic year starts from April
        const years: string[] = [];
      
        for (let i = 0; i < 25; i++) {
          const start = startYear - i;
          years.push(`${start}-${start + 1}`);
        }
      
        return years;
      };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Circular</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {notificationData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Circular Found.</p>
                        </IonRow>}
                <div className="circular-cls">
                  {notificationData.map((item: any) =>{
                    return (
                        <div>
                        <IonRow class="notice_day" >
                        <IonCol size="11">
                        <p className="notice_day_header no_margin font_size_head text_caps_cls">
                               {item.title}
                            </p>
                        </IonCol> 
                        {item?.attachment && <IonCol size="1" onClick={() => clickOnDownload(item)} >
                         <IonImg class="home_work_download_img" src={'../../../assets/images/download_white.svg'} />
                        </IonCol>}
                        </IonRow>
                        <div className="notice_day_details">
                            <IonRow class="no_margin ion-align-items-center">
                                <IonCol size="2">
                                    <p className="day no_margin font_size_body">Date</p>
                                </IonCol>
                                <IonCol size="6">
                                    <p className="date no_margin font_size_body"> {item.date} </p>
                                </IonCol>
                                {<IonCol size="4" onClick={() => clickOnLessonView(item)}>
                                    <IonRow class="no_margin ion-float-right ion-align-items-center">
                                        <IonCol size="auto" class="ion-no-padding">
                                            <p className="no_margin">
                                                <IonImg  class="notice_img_class" src={'../../../assets/images/orange_view.svg'} /></p>
                                        </IonCol>
                                        <IonCol class="ion-no-padding">
                                            <p className="no_margin view_btn font_size_body org_text_class">View</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>}
                                {/* {item?.status === 1 && <IonCol size="4" onClick={() => clickOnLessonView(item)}>
                                    <IonRow class="no_margin ion-float-right ion-align-items-center">
                                        <IonCol size="auto" class="ion-no-padding">
                                            <p className="no_margin">
                                                <IonImg  class="notice_img_class" src={'../../../assets/images/green_view.svg'} /></p>
                                        </IonCol>
                                        <IonCol class="ion-no-padding">
                                            <p className="no_margin view_btn font_size_body green_text_class">View</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>} */}
                            </IonRow>
                        </div>
                        </div>
                    )
                  })}
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Circular;




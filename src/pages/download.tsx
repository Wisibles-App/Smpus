import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import './download.css';
import { Browser } from '@capacitor/browser';


const Download: React.FC = () => {
    const [selectedSegment, checkedSegment] = useState('weekly_schedule');
    const [presentAlert] = useIonAlert();
    const segmentChanged = (item: any) => {
        console.log(item.detail.value);
        checkedSegment(item.detail.value);
        var userData = localStorage.getItem('studentProfileData') as any;
        userData = JSON.parse(userData);
        APIForDownloadCenterData(userData,item.detail.value);

    };

    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [downloadCenterData, getdownloadCenterData] = useState<any>([]);
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        var userData = localStorage.getItem('studentProfileData') as any;
        userData = JSON.parse(userData);
        APIForDownloadCenterData(userData,selectedSegment);
    })
    useEffect(() => {
        console.log(downloadCenterData, 'download data');
    });
    const APIForDownloadCenterData = (userData: any,selectedSegment: any) => {
        showIonLoading('Loading....')
        const reqObj = {
            "tag":selectedSegment,
            "classId":userData?.student_result?.class_id,
            "sectionId":userData?.student_result?.section_id,
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
          }; 
        return api.post('api_new/Webservice/getDownloadsLinks',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            dismissIonLoading();
            if(res.data.success === 1)
            {
                getdownloadCenterData(res.data);
            }
            else
            {
                // presentAlert({
                //     header: 'Note',
                //     message: res.data.errorMsg,
                //     buttons: ['OK'],
                // })
            }
            getdownloadCenterData(res.data);
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const clickOnDownload =  async (downloadItem: any)=>{
        var url = 'https://smpus.wisibles.com/'+ downloadItem.file;
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton  />
                        <IonTitle >Download Center</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
           <IonContent>
           <IonSegment mode="md"  onIonChange={(e) => segmentChanged(e)} value={selectedSegment}>
                    <IonSegmentButton value="weekly_schedule">
                        <IonLabel>WEEKLY SCHEDULE</IonLabel>
                    </IonSegmentButton>
                    {/* <IonSegmentButton value="study_material">
                        <IonLabel>STUDY MATERIAL</IonLabel>
                    </IonSegmentButton> */}
                    <IonSegmentButton value="syllabus">
                        <IonLabel>SYLLABUS</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="work_sheets">
                        <IonLabel>WORK SHEETS</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {downloadCenterData?.success === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No content found</p>
                        </IonRow>}
                {downloadCenterData?.data?.slice(0).reverse().map((downloadItem: any)=>{
                    return(  <IonCol className="ion-no-padding segment_btm_pad">
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">{downloadItem?.title}</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">{downloadItem?.date}</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row" onClick={() => clickOnDownload(downloadItem)}>
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div> 
                   </IonCol>)
                })}
                {/* {selectedSegment === 'assignments'&&
                   <IonCol className="ion-no-padding segment_btm_pad">
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Previous Year Paper</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">03/08/2021</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title"> Assignment for Class2 English</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right"> 03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title"> Assignment for Class2 English</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right"> 03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title"> Assignment for Class2 English</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right"> 03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    
                    
                   </IonCol>
                }
                 {selectedSegment === 'study_material'&&
                   <IonCol className="ion-no-padding segment_btm_pad">
                         <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">   Online Exam Instruction</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2021</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>


                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">    Regular Class Notes</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">    Regular Class Notes</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">    Regular Class Notes</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
  
                   </IonCol>
                }
                 {selectedSegment === 'syllabus'&&
                   <IonCol className="ion-no-padding segment_btm_pad">
                     <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Syllabus for Class2</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">03/08/2021</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>


                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Syllabus For Class2</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Syllabus For Class2</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Syllabus For Class2</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                   </IonCol>
                }
                 {selectedSegment === 'other_download'&&
                   <IonCol className="ion-no-padding segment_btm_pad">
                     <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Admission Fees Structure for Calss2</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2021</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>


                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Admit Card Download (July-2021)</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Admit Card Download (July-2021)</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                    <div className="download_material_box">
                    <IonRow class="download_material">
                        <IonCol size="8">
                       <p className="no_margin download_material_title">Admit Card Download (July-2021)</p> 
                        </IonCol>
                        <IonCol size="4">
                       <p className="no_margin download_material_date ion-text-right">   03/08/2022</p> 
                        </IonCol>
                    </IonRow>
                    <IonRow class="image_download_row">
                    <IonImg class="dwn_img_class" src={'../../../assets/images/download.svg'} />
                    </IonRow>
                    </div>
                   </IonCol>
                } */}
           </IonContent>
        </IonPage>
        
    )
}
export default Download;



import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { api, CLINT_SERVICE } from "../util/util";
import { BASE_URL } from "../util/util";
import axios from 'axios';
import './about-school.css';

const AboutSchool: React.FC = () => {
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [schoolData, getschoolData] = useState<any>([]);
    const [schoolTeacherData, getSchoolTeacherData] = useState<any>([]);
    const [socialData, setSocialData] = useState<any>([])

    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);

    useIonViewWillEnter(() => {
        APIForGetSchoolData();
        getSocialUpdates();
    })

    const getSocialUpdates = async () => {
        
        try {
            //  showIonLoading('Loading....')
            const res = await axios.get('https://smpus.wisibles.com/api_new/Communication/get_social_media_links');
            if (res?.status === 200) {
                console.log("get_social_media_links__res", res);
                dismissIonLoading();
                setSocialData([]);
            } else {
                console.warn("Unexpected response", res);
            }

        } catch (error) {
            console.error("Failed to fetch social media links", error);
        }
    };



    useEffect(() => {
        console.log(schoolData, 'school data');
        console.log(schoolTeacherData, 'school teacher data');
    });
    const APIForGetSchoolData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
        };
        return api.post('api_new/Webservice/getSchoolDetails', reqObj, {
            headers: {
                "Content-Type": "application/json",
                "Client-Service": CLINT_SERVICE,
                "Auth-Key": 'schoolAdmin@',
                "Authorization": userInfo.token,
                "User-ID": userInfo.id
            }
        }
        ).then((res: any) => {
            getschoolData(res.data);
            APIForGetClassTeachersList();
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const APIForGetClassTeachersList = () => {
        var studentData = localStorage.getItem('studentProfileData') as any;
        studentData = JSON.parse(studentData);

        showIonLoading('Loading....')
        const reqObj = {
            "class_id": studentData?.student_result?.class_id,
            "section_id": studentData?.student_result?.section_id,
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
        };
        return api.post('api_new/Teachers_list/getteachers', reqObj, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((res: any) => {
            dismissIonLoading();
            getSchoolTeacherData(res.data.data);
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >About School</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <img className='logo_img_abtSchool school_img' src={'../../../assets/images/smps_app_logo.png'} alt="logo_img" />
                <div className="flipped_video_details about_schol_div">
                    <IonRow class="videos_f_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">Address</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="7">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.address}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_s_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">Phone</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.phone}</p>
                        </IonCol>

                    </IonRow>
                    <IonRow class="videos_t_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">Email</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="7">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.email}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">School Code</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="7">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.dise_code}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_fi_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">Current Session</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="7">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.session}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_si_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body text_upper_case">Session Start Month</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="7">
                            <p className="no_margin font_size_body text_upper_case">{schoolData?.start_month_name}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow className="social_main">
                        {/* {console.log("socialData",socialData)} */}
                        {  socialData
                            // .filter((item: any) => item.status !== "1")
                            .map((item: any, index: number) => {
                                let iconSrc = "";
                                let label = item.platform_name;
                                // Match icons based on platform
                                switch (item.platform_name.toLowerCase()) {
                                    case "instagram":
                                        iconSrc = "../../../assets/images/icon-instagram-48.png";
                                        break;
                                    case "linkedin":
                                        iconSrc = "../../../assets/images/icon-linkedin-48.png";
                                        break;
                                    case "facebook":
                                        iconSrc = "../../../assets/images/icons-facebook-48.png";
                                        break;
                                    case "website":
                                        iconSrc = "../../../assets/images/logo_name.png";
                                        break;
                                    default:
                                        iconSrc = "../../../assets/images/default-icon.png";
                                        break;
                                }

                                return (
                                    <IonCol key={index} className="social_layout2">
                                        <IonImg className="socila_linkedin_icon" src={iconSrc} />
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {label}
                                        </a>
                                    </IonCol>
                                );
                            })}
                    </IonRow>

                </div>

                {/* {schoolTeacherData?.length > 0 && 
                <IonRow class="download_material">
                <IonCol size="12">
               <p className="no_margin download_material_title text_upper_case bold_cls">Teachers Details</p> 
                </IonCol>
                </IonRow>
                } */}

                {/* {schoolTeacherData?.map((item: any)=>{
                        return(
                            <IonCol className="ion-no-padding">
                 <div className="parents_info_box">
                     <IonRow class="parents_info">
                        <IonCol size="3" class="main_col_image">
                              <IonImg class="parent_profile_pic" src={item?.image} />
                         </IonCol>
                         <IonCol size='2'>
                             <p className="info_icon name ion-no-margin black_class font_size_body text_upper_case">Name</p>
                             <p className="info_icon occupation ion-no-margin black_class font_size_body text_upper_case">Email</p>
                             <p className="info_icon number ion-no-margin black_class font_size_body text_upper_case">Phone</p>
                             <p className="info_icon number ion-no-margin black_class font_size_body text_upper_case designation">DSGN</p>
                         </IonCol>
                         <IonCol size='7'>
                             <p className="info_icon name ion-no-margin parent_info_values font_size_body text_upper_case">: {item?.name}</p>
                             <a  href={`mailto:${item?.email}`}>
                             <p className="info_icon occupation ion-no-margin parent_info_values font_size_body text_upper_case">: {item?.email}</p>
                             </a>
                             <a  href={`tel:${item?.contact_no}`}>
                             <p className="info_icon number ion-no-margin parent_info_values font_size_body text_upper_case">: {item?.contact_no}</p>
                             </a>
                             <p className="info_icon number ion-no-margin parent_info_values font_size_body text_upper_case">: {item?.designation}</p>
                         </IonCol>
                     </IonRow>
                 </div>
             </IonCol> )
                        })} */}

            </IonContent>
        </IonPage>
    )
}
export default AboutSchool;





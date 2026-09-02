import { IonAvatar, IonBackButton, IonButtons, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api, CLINT_SERVICE } from "../util/util";
import './profile.css';
import { Browser } from '@capacitor/browser';


const Profile:    React.FC = () => {
    const [role, setRole] = useState<any>(localStorage.getItem('role'));
    const history = useHistory()
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    // var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    // userInfo = JSON.parse(userInfo);
    const [selectedSegment, checkedSegment] = useState('personal');
    const segmentChanged = (item:    any) => {
        console.log(item.detail.value);
        checkedSegment(item.detail.value);
    };
    const [studentData, getStudentData] = useState<any>()
    useIonViewWillEnter(() => {
        var user_role = localStorage.getItem('role');
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);

        setRole(user_role);
        checkedSegment('personal')
        getUserData(userData);
    })
    useEffect(() => {
        console.log(studentData, 'student data');
    });

    const logout = ()=>{
        var userData = localStorage.getItem('userAuth') as any;
        userData = JSON.parse(userData);
         const reqObj = {
            'User-ID': userData.id,
            'deviceToken': userData.token
          }; 

          return api.post('api_new/Webservice/logout',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
              "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userData.token,
                "User-ID":    userData.id
              }
        }
        ).then((res:    any) => {
            var token: any = localStorage.getItem('deviceToken');
            localStorage.clear();
            console.log("localStorage",localStorage)
            localStorage.setItem('deviceToken',token);
            history.push('/login');
        }).catch((error:    any) => {
            console.log('error:    ', error);
        });
    }
    const edit = async (studentID: any)=>{
     history.push('/edit-profile');

        // await Browser.open({ url: url, windowName:'_self'});

        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //   })
    }

    const getUserData = (userData: any) => {
        const reqObj = {
            student_id:    userData.record.student_id
          }; 
        return api.post('api_new/Webservice/getStudentProfile',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
               "Client-Service":   CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userData.token,
                "User-ID":    userData.id
              }
        }
        ).then(async (res:    any) => {
            console.log('Response data:', res.data);
            getStudentData(res.data);
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }
    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="home" />
                        <IonTitle >Profile</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="profile_page_content" >
                <IonGrid class="student_info_grid">
                    <IonRow>
                        <IonCol size="10">
                            <p className="no_margin profile_name font_size_head text_upper_case">{studentData?.student_result.firstname + ' ' +studentData?.student_result.lastname}</p>
                        </IonCol>
                        <IonCol size="1">
                        </IonCol>
                        {/* {role === 'parent' && <IonCol size="1" class="main_col_image" onClick={()=>edit(studentData?.student_result.id)}>
                            {<IonImg  class="logout_image_cls" src={'../../../assets/images/edit_white.svg'} />}
                        </IonCol>} */}
                        <IonCol size="1" class="main_col_image" onClick={logout}>
                            {/* <p className="no_margin admission_no font_size_head">Adm. No. 18001</p> */}
                            <IonImg  class="logout_image_cls" src={'../../../assets/images/logout.svg'} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <p className="no_margin class font_size_head text_upper_case">Adm. No: {studentData?.student_result.admission_no}</p>
                        </IonCol>
                        <IonCol size="6">
                            <p className="no_margin roll_no font_size_head text_upper_case">Class: {studentData?.student_result.class}</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonSegment mode="md" onIonChange={(e) => segmentChanged(e)} value={selectedSegment}>
                    <IonSegmentButton value="personal">
                        <IonLabel>PERSONAL</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="parents">
                        <IonLabel>PARENTS</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="others">
                        <IonLabel>OTHERS</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                {selectedSegment === 'personal'&&
                   <IonCol class="personal_details_box">
                     <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                            Admission Date
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.admission_date}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Date Of Birth
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.dob}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Category
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.category}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Nationality
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.nationality}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Student's Aadhaar Card Number
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.student_aadhaar_card_number}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Student's Email id
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.email}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                          Primary Email id
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.primary_email_id}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                          Secondary Email id
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.secondary_email_id}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Primary Mobile Number
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.primary_mobile_number}
                        </IonCol>
                    </IonRow>
                    <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                          Secondary Mobile Number
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                        {studentData?.student_result.secondary_mobile_number}
                        </IonCol>
                    </IonRow>
                    {/* <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           Weight
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                       34 kg
                        </IonCol>
                    </IonRow> */}
                    {/* <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                           As On Date
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                            03/08/2021
                        </IonCol>
                    </IonRow> */}
                    {/* <IonRow class="personal_details_info_box">
                        <IonCol size="6" class="personal_details_h font_size_body">
                          Medical History
                        </IonCol>
                        <IonCol size="6" class="personal_details_info font_size_body">
                       Ear Infections
                        </IonCol>
                    </IonRow> */}
                   </IonCol>
                   
                }
                {selectedSegment === 'parents' && <IonCol className="ion-no-padding">
                    <div className="parents_info_box">
                        <IonRow class="parents_info">
                        {studentData?.student_result?.father_pic !== '' && <IonCol size="3" class="main_col_image profile_border_right">
                                 <IonImg class="parent_profile_pic" src={'https://smpus.wisibles.com/' + studentData?.student_result?.father_pic} />
                                    {/* <p className="ion-no-margin profile_name font_size_body">Father</p> */}
                            </IonCol>}
                            {studentData?.student_result?.father_pic === '' && <IonCol size="3" class="main_col_image profile_border_right">
                                 <IonImg class="parent_profile_pic" src={'https://smpus.wisibles.com/uploads/student_images/no_image.png'} />
                                    {/* <p className="ion-no-margin profile_name font_size_body">Father</p> */}
                            </IonCol>}
                            <IonCol size='4'>
                                <p className="info_icon name ion-no-margin black_class font_size_body text_upper_case">Father's Name</p>
                                <p className="info_icon occupation ion-no-margin black_class font_size_body text_upper_case">Father's Phone</p>
                                <p className="info_icon number ion-no-margin black_class font_size_body text_upper_case">Aadhaar Card Number</p>
                            </IonCol>
                            <IonCol size='5'>
                                <p className="info_icon name ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.father_name}</p>
                                <p className="info_icon occupation ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.father_phone}</p>
                                <p className="info_icon number ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.father_aadhaar_card_number}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="parents_info">
                            {studentData?.student_result?.mother_pic === '' && <IonCol size="3" class="main_col_image profile_border_right">
                                <IonImg class="parent_profile_pic" src={'https://smpus.wisibles.com/uploads/student_images/no_image.png'} />
                                    {/* <p className="ion-no-margin profile_name font_size_body">Father</p> */}
                            </IonCol>}
                            {studentData?.student_result?.mother_pic !== '' && <IonCol size="3" class="main_col_image profile_border_right">
                                <IonImg class="parent_profile_pic" src={'https://smpus.wisibles.com/' + studentData?.student_result?.mother_pic} />
                                    {/* <p className="ion-no-margin profile_name font_size_body">Father</p> */}
                            </IonCol>}
                            <IonCol size='4'>
                                <p className="info_icon name ion-no-margin black_class font_size_body text_upper_case">Mother's Name</p>
                                <p className="info_icon occupation ion-no-margin black_class font_size_body text_upper_case">Mother's Phone</p>
                                <p className="info_icon number ion-no-margin black_class font_size_body text_upper_case">Aadhaar Card Number</p>
                            </IonCol>
                            <IonCol size='5'>
                                <p className="info_icon name ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.mother_name}</p>
                                <p className="info_icon occupation ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.mother_phone}</p>
                                <p className="info_icon number ion-no-margin parent_info_values font_size_body text_upper_case">: {studentData?.student_result.mother_aadhaar_card_number}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow class="parents_info">
                          
                            {studentData?.student_result?.guardian_pic === '' &&   <IonCol size="3" class="main_col_image profile_border_right">
                                <IonImg class="parent_profile_pic"  src={'https://smpus.wisibles.com/uploads/student_images/no_image.png'} />
                            </IonCol>}

                            {studentData?.student_result?.guardian_pic !== '' &&   <IonCol size="3" class="main_col_image profile_border_right">
                                <IonImg class="parent_profile_pic"  src={'https://smpus.wisibles.com/' + studentData?.student_result?.guardian_pic} />
                            </IonCol>}

                            <IonCol size='4'>
                                <p className="info_icon name ion-no-margin black_class font_size_body text_upper_case guardian">Guardian's Name</p>
                                <p className="info_icon occupation ion-no-margin black_class font_size_body text_upper_case guardian">Guardian's Phone</p>
                                <p className="info_icon number ion-no-margin black_class font_size_body text_upper_case guardian">Aadhaar Card Number</p>
                            </IonCol>
                            <IonCol size='5'>
                                <p className="info_icon name ion-no-margin parent_info_values font_size_body guardian text_upper_case">: {studentData?.student_result.guardian_name}</p>
                                <p className="info_icon occupation ion-no-margin parent_info_values font_size_body guardian text_upper_case">: {studentData?.student_result.guardian_phone}</p>
                                <p className="info_icon number ion-no-margin parent_info_values font_size_body guardian text_upper_case">: -</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonCol>}
                {selectedSegment === 'others' && 
                 <IonCol class="personal_details_box">
                    <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                        Mode of transfort
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    {studentData?.student_result.mode_of_transport}
                    </IonCol>
                </IonRow>
                 {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                        Route
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    {studentData?.student_result.route_title}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                     Vehicle Number
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    {studentData?.student_result.vehicle_no}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Driver Name
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    {studentData?.student_result.driver_name}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Driver Contact
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                     {studentData?.student_result.driver_contact}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Pickup Time
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                     {studentData?.student_result.pickup_time}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                     Drop Time
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                     {studentData?.student_result.drop_time}
                    </IonCol>
                </IonRow> */}
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Blood Group
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    {studentData?.student_result.blood_group}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                     Student House
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                     {studentData?.student_result.house_name}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Height
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                     {studentData?.student_result.height}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Weight
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                  {studentData?.student_result.weight}
                    </IonCol>
                </IonRow>
                <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Address
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                  {studentData?.student_result.current_address}
                    </IonCol>
                </IonRow>
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Vehicle No.
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                   VH5645
                    </IonCol>
                </IonRow> */}
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Driver Name
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                        Maximus
                    </IonCol>
                </IonRow> */}
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Driver Contact
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                   8854564567
                    </IonCol>
                </IonRow> */}
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Hostels
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    Boys Hostel 101
                    </IonCol>
                </IonRow> */}
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                       Room No
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                       B1
                    </IonCol>
                </IonRow> */}
                {/* <IonRow class="personal_details_info_box">
                    <IonCol size="6" class="personal_details_h font_size_body">
                      Room Type
                    </IonCol>
                    <IonCol size="6" class="personal_details_info font_size_body">
                    One Bed
                    </IonCol>
                </IonRow> */}
               </IonCol>
                }
            </IonContent>
        </IonPage>
    )
}
export default Profile;


import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api, CLINT_SERVICE } from "../util/util";
import './transport-routes.css';

const TransportRoutes: React.FC = () => {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [studentData, getStudentData] = useState<any>();
  const history = useHistory();
  const [showIonLoading, dismissIonLoading] = useIonLoading();

  useIonViewWillEnter(() => {
    const user_role = localStorage.getItem('role');
    const userDataRaw = localStorage.getItem('userAuth');
    if (!userDataRaw) return;

    const userData = JSON.parse(userDataRaw);
    setRole(user_role);
    getUserData(userData);
  });

  const getUserData = (userData: any) => {
    const reqObj = {
      student_id: userData.record.student_id
    };

    api.post('api_new/Webservice/getStudentProfile', reqObj, {
      headers: {
        "Content-Type": "application/json",
        "Client-Service": CLINT_SERVICE,
        "Auth-Key": 'schoolAdmin@',
        "Authorization": userData.token,
        "User-ID": userData.id
      }
    })
      .then((res: any) => {
        getStudentData(res.data);
      })
      .catch((error: any) => {
        console.log('Error fetching profile:', error);
        dismissIonLoading();
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="md" className="toolbar_class">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Transport Routes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent  className="profile_page_content">
        <IonGrid>
          <IonRow className="transport_header ion-align-items-center">
            <IonCol  className="transport_text_col">
              <h2 className="transport_heading">
                Your Transport routes is here!
              </h2>
               <IonCol className="transport_image_col">
               <IonImg
                src="../../../assets/images/transport_page.jpg"
                alt="Transport Illustration"
                className="transport_img"
              />
            </IonCol>
             
            </IonCol>
           
          </IonRow>

          {studentData?.student_result && (
            <IonRow>
              <IonCol size="16" className="transport_card_box">
                <IonRow className="transport_title_row">
                  <IonCol className="transport_title">
                    <strong>Route Title</strong>: Route No-{studentData?.student_result?.route_id} ({studentData?.student_result?.vehicle_no || 'SHANKERPALLY'})
                  </IonCol>
                </IonRow>

                <IonRow className="personal_details_info_box">
                  <IonCol size="6" className="personal_details_h">Vehicle Number</IonCol>
                  <IonCol size="6" className="personal_details_info">{studentData?.student_result?.vehicle_no || '-'}</IonCol>
                </IonRow>
                <IonRow className="personal_details_info_box">
                  <IonCol size="6" className="personal_details_h">Vehicle Model</IonCol>
                  <IonCol size="6" className="personal_details_info">{studentData?.student_result?.vehicle_model || '-'}</IonCol>
                </IonRow>
                <IonRow className="personal_details_info_box">
                  <IonCol size="6" className="personal_details_h">Driver Name</IonCol>
                  <IonCol size="6" className="personal_details_info">{studentData?.student_result?.driver_name || '-'}</IonCol>
                </IonRow>
                <IonRow className="personal_details_info_box">
                  <IonCol size="6" className="personal_details_h">Driver Contact</IonCol>
                  <IonCol size="6" className="personal_details_info">{studentData?.student_result?.driver_contact || '-'}</IonCol>
                </IonRow>
                <IonRow className="personal_details_info_box">
                  <IonCol size="6" className="personal_details_h">Driver Licence</IonCol>
                  <IonCol size="6" className="personal_details_info">{studentData?.student_result?.driver_licence || '-'}</IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransportRoutes;

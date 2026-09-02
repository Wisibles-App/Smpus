import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonLoading,
} from "@ionic/react";
import "./communication.css";
import "./edit-profile.css";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const Calendar: React.FC = () => {
  const [userInfo] = useState(() =>
    JSON.parse(localStorage.getItem("userAuth") as string)
  );

  const [showIonLoading, dismissIonLoading] = useIonLoading();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useIonViewWillEnter(() => {
    // show loader as soon as view is about to enter
    showIonLoading("Loading...");
  });

  useEffect(() => {
    console.log("useEffect triggered");
    // console.log(
    //   "https://smpus.wisibles.com/api_new/calendar?branch_id=" +
    //     localStorage.getItem("branch_id") +
    //     "&school_id=" +
    //     localStorage.getItem("school_id")
    // );
  }, []);

  const iframeUrl =
    "https://smpus.wisibles.com/api_new/calendar?branch_id=" +
    localStorage.getItem("branch_id") +
    "&school_id=" +
    localStorage.getItem("school_id");

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    dismissIonLoading(); // Hide loader after iframe finishes loading
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
          <IonButtons slot="start">
            <IonBackButton />
            <IonTitle className="align-self:center;">CALENDAR</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <Iframe
            url={iframeUrl}
            width="100%"
            height="768px"
            display="block"
            position="relative"
            onLoad={handleIframeLoad}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;

import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from "@ionic/react";

const ProgressCardView: React.FC = () => {
  const pdfUrl =
    "https://smpus.wisibles.com/uploads/cbseexam/marksheets/ANNAVARAM_SHANMUKHA_REDDY_12.pdf";

  return (
    <IonPage>
    <IonHeader>
                   <IonToolbar mode="md" className="toolbar_class">
                       <IonButtons slot="start">
                           <IonBackButton />
                           <IonTitle >View</IonTitle>
                       </IonButtons>
                   </IonToolbar>
               </IonHeader>
      <IonContent fullscreen>
        <div style={{ height: "100%", width: "100%" }}>
          <iframe
            title="Marksheet"
            src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProgressCardView;

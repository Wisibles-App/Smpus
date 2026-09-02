import { IonPage, IonBackButton, IonButtons, IonHeader , IonTitle, IonToolbar, IonContent, IonImg, IonCol, IonRow } from "@ionic/react";
import './transfort.css';
const Transfort: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                        <IonTitle>Pay Fees</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonImg src={'../../../assets/images/payment.svg'} />
            </IonContent>
            </IonPage>
    )
}

export default Transfort; 

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, useIonViewWillEnter, useIonLoading, IonCol, IonRow, IonImg, useIonAlert, IonCard, IonCardTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, CLINT_SERVICE } from '../util/util';
import './gallery-images.css';
const GalleryImages: React.FC = () => {
    const history = useHistory() as any;
    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);
    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [imageData, updateImageData] = useState<any>([])
    useIonViewWillEnter(() => {
        getImags();
    })
    useEffect(() => {
        console.log(imageData, 'Image Data');
    });

    const getImags = async () => {
        showIonLoading('Loading....')
        const reqObj = {
            class_id: studentProfileData.student_result.class_id,
            section_id: studentProfileData.student_result.section_id,
            category_id: history.location.state.ID
        };
        try {
            const res = await api.post('api_new/Gallery/get_gallery_data', reqObj, {
                headers: {
                    "Content-Type": "application/json",
                    "Client-Service": CLINT_SERVICE,
                }
            }
            );
            dismissIonLoading();
            // if (res.data.success === 0) {

            // }
            // else {
            updateImageData(res.data);
            // }
        } catch (error) {
            console.log('error:    ', error);
            dismissIonLoading();
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Gallery Images</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {imageData?.success !== 0 && imageData?.data?.map((item: any, index: number) =>
                    // item?.image?.length === 1 ? 
                    (
                    <IonCard key={index} className="gallery-banner">
                        <IonImg src={item.image} className="gallery-img" />
                    </IonCard>
                    // ) : (
                    // item.image.map((img: any, idx: number) => (
                    //     <IonCard key={`${index}-${idx}`} className="gallery-banner">
                    //     <IonImg src={img} className="gallery-img" />
                    //     </IonCard>
                    // ))
                    )
                )}
                {imageData?.success === 0 && (
                    <IonRow className="no-data-found-gallery">
                    <p>No Data Found.</p>
                    </IonRow>
                )}
            </IonContent>


        </IonPage>
    )
}
export default GalleryImages;

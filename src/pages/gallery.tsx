
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, useIonViewWillEnter, useIonLoading, IonCol, IonRow, IonImg, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, CLINT_SERVICE } from '../util/util';
import './groups.css';
import { Browser } from '@capacitor/browser';
const Gallery: React.FC = () => {

    const history = useHistory();
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);
    const [showIonLoading,dismissIonLoading] = useIonLoading();

    const clickOnImage = async (data: any)=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        history.push({
            pathname: '/gallery-images',
            state: { ID: data.id }
        })
    }

    const [imageData, updateImageData] = useState<any>([])
    useIonViewWillEnter(() => {
        getImags();
    })
    useEffect(() => {
        console.log(imageData, 'Image Data');
    });

    const getImags = async () => {
        console.log("studentProfileData",studentProfileData);
        
        showIonLoading('Loading....')
        const reqObj = {
            class_id:    studentProfileData.student_result.class_id,
            section_id:    studentProfileData.student_result.section_id,
          }; 
        try {
            const res = await api.post('api_new/Gallery/gallery_category', reqObj, {
                headers: {
                    "Content-Type": "application/json",
                    "Client-Service": CLINT_SERVICE,
                }
            }
            );
            dismissIonLoading();
            if (res.data.success === 0) {
            }
            else {
                updateImageData(res.data);
                console.log("res.data",res.data);
                
            }
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
                        <IonTitle >Gallery</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent>
                {groupData?.map((groupItem: any)=>{
                    return(
                        <IonRow>
                    <IonCol size="10">
                            {groupItem?.groupname}
                    </IonCol>
                    <IonCol size="2">

                    </IonCol>
                </IonRow>
                    )
                })}
            </IonContent> */}
             <IonContent class='content_class' fullscreen>
             {imageData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Groups Found.</p>
                        </IonRow>}
                <div className='child_list_cls group_list_cls'>
                    {console.log("imageData22",imageData)}
                    {imageData?.data?.map((image: any)=>{
                        return (
                            <IonRow onClick={() => clickOnImage(image)} class="ion-align-items-center row_box_shadow_cls">
                        <IonCol size="10" >
                            <p className='no_margin font_size_head group_name_cls'>{image.category_name}</p>
                        </IonCol>
                        <IonCol size="2">
                            <IonImg class='double_arrow_class'src={'../../../assets/images/double_arrow.svg'} />
                        </IonCol>
                    </IonRow>
                        )
                    })}
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Gallery;

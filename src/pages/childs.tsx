import { IonContent, IonPage, IonImg, IonCol, IonRow, IonHeader, IonBackButton, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import './childs.css';
import { api, BASE_URL } from "../util/util";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const childs: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    console.log("userInfo11", userInfo)
    userInfo = JSON.parse(userInfo);
    console.log("userInfo22", userInfo)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [childrenList] = useState(localStorage.getItem('childrenList') as any);
    childrenList = JSON.parse(childrenList);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();


    const clickOnChild = (item: any) => {
        userInfo.record = item
        localStorage.setItem('userAuth', JSON.stringify(userInfo));
        history.push('/home');
    }
    const fixImagePath = (path: string) => {
        if (!path) return '../../../assets/images/placeholder_user.png';
        const normalizedApi = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
        console.log("`${normalizedApi}${path}`",`${normalizedApi}${path}`);
        
        return path.startsWith('http') ? path : `${normalizedApi}${path}`;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="ion-align-items-center toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle className="align-self:center;">Child List</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class='content_class' fullscreen>
                <div className='child_list_cls'>
                    {childrenList.map((childItem: any) => {
                        console.log("childItem.image",childItem.image)
                        return (
                            <IonRow class="ion-align-items-center row_border_cls">
                                <IonCol size="2">
                                    {/* {childItem.image ? <IonImg class='logo_class parent_profile_pic_child' src={'https://sbcs.wisibles.com/api/' + childItem.image} />
                                        : <IonImg class='logo_class parent_profile_pic_child' src={'../../../assets/images/placeholder_user.png'} />
                                    } */}
                                    {childItem.image ?
                                        <IonImg
                                        alt='Img'
                                            class='logo_class parent_profile_pic_child'
                                            src={fixImagePath(childItem.image)}
                                        />
                                        :
                                        <IonImg
                                            class='logo_class parent_profile_pic_child'
                                            src={'../../../assets/images/placeholder_user.png'}
                                        />
                                    }
                                </IonCol>
                                <IonCol size="10" onClick={() => clickOnChild(childItem)} >
                                    <p className='no_margin font_size_head'>{childItem.name}</p>
                                    <p className='no_margin font_size_body gary_class' >{childItem.class}</p>

                                </IonCol>
                            </IonRow>
                        )
                    })}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default childs;



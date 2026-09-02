/* eslint-disable no-mixed-operators */

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, useIonViewWillEnter, useIonLoading, IonCol, IonRow, IonImg, IonAlert, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, CLINT_SERVICE } from '../util/util';
import './chat.css';
import { Browser } from '@capacitor/browser';

const Chats: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showIonLoading, dismissIonLoading] = useIonLoading();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [groupMessageData, updateGroupMessageData] = useState<any>();

    const [presentAlert] = useIonAlert();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIonViewWillEnter(() => {
        getGroupsMessageData();
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        console.log(groupMessageData, 'Group Message Data');
    });

    const history = useHistory();

    var chatGroupMessageData = history as any;
    console.log(history);

    const clickGroupPDF = async (PDFUrl: any) => {
        console.log('PDFURL:', PDFUrl)
        var url = 'https://smpus.wisibles.com/uploads/' + PDFUrl;
        window.open(url, '_system');
        // await Browser.open({ url: url });
        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        // })
    };
    const getGroupsMessageData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            group_id: chatGroupMessageData?.location?.state.group_data?.group_id,
        };
        return api.post('api_new/Groups/getMessages', reqObj, {
            headers: {
                "Content-Type": "application/json",
                "Client-Service": CLINT_SERVICE,
                // "Auth-Key":    'samashtiAdmin@',
                // "Authorization":    userInfo.token,
                // "User-ID":    userInfo.id
            }
        }
        ).then((res: any) => {
            if (res.data.success === 0) {
                presentAlert({
                    header: 'Note',
                    message: res.data.message,
                    buttons: ['OK'],
                })
            }
            else {
                updateGroupMessageData(res.data.data);
            }
            dismissIonLoading();
        }).catch((error: any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" class="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >{chatGroupMessageData?.location?.state.group_data?.groupname}</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen class='chat_content_class'>
                {groupMessageData?.map((messages: any) => {
                    return (
                        <IonRow class='chat_main_row_cls'>
                            <IonCol>
                                {messages.communication !== '' &&
                                    <p className='chat_p_cls' dangerouslySetInnerHTML={{ __html: messages?.communication }}>
                                    </p>
                                }
                                 {messages.communication !== '' &&
                                    <p className='time_stamp_cls'>{messages.time}</p>
                                }
                                {messages.communication !== '' &&
                                    <div className="triangle triangle-1"></div>
                                }
                               
                                {messages.file_type === 'png' &&
                                    <IonImg class='chat_img_class' onClick={() => clickGroupPDF(messages.file)} src={'https://smpus.wisibles.com/uploads/' + messages?.file}></IonImg>

                                }
                                {messages.file_type === 'png' &&
                                    <p className='time_stamp_cls'>{messages.time}</p>
                                }
                                {messages.file_type === 'jpg' &&
                                    <IonImg class='chat_img_class' onClick={() => clickGroupPDF(messages.file)} src={'https://smpus.wisibles.com/uploads/' + messages?.file}></IonImg>}
                                {messages.file_type === 'jpg' &&
                                    <p className='time_stamp_cls'>{messages.time}</p>
                                }
                                {messages.file_type === 'pdf' &&
                                    <IonRow class='pdf_class_groups' onClick={() => clickGroupPDF(messages.file)}>
                                        <IonCol size='10' class='pdf_class_file'>
                                            {messages.file}
                                        </IonCol>
                                        <IonCol size='1' class='pdf_img_class'>
                                            <IonImg src={'../../../assets/images/download.svg'}></IonImg>
                                        </IonCol>
                                    </IonRow>
                                }
                                {messages.file_type === 'pdf' &&
                                    <p className='time_stamp_cls'>{messages.time}</p>
                                }
                            </IonCol>
                        </IonRow>
                    )
                })}
            </IonContent>
        </IonPage>
    )
}
export default Chats;




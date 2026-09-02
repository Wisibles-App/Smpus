
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, useIonViewWillEnter, useIonLoading, IonCol, IonRow, IonImg, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, CLINT_SERVICE } from '../util/util';
import './groups.css';
const Groups: React.FC = () => {

    const history = useHistory();
    const [presentAlert] = useIonAlert();


    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);

    var [studentProfileData] = useState(localStorage.getItem('studentProfileData') as any);
    studentProfileData = JSON.parse(studentProfileData);

    const [showIonLoading,dismissIonLoading] = useIonLoading();

    const clickOnGroupName = (groupData: any)=>{
        history.push({
            pathname: '/chat',
            state: { group_data: groupData }
          })
    }

    const [groupData, updateGroupData] = useState<any>([])
    useIonViewWillEnter(() => {
        getGroupsData();
    })
    useEffect(() => {
        console.log(groupData, 'Group Data');
    });

    const getGroupsData = () => {
        showIonLoading('Loading....')
        const reqObj = {
            class_id:    studentProfileData.student_result.class_id,
            section_id:    studentProfileData.student_result.section_id,
            branch_id: localStorage.getItem('branch_id'),
            school_id: localStorage.getItem('school_id')
          }; 
        return api.post('api_new/Groups/getGroups',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
                    "Client-Service":   CLINT_SERVICE,
              }
        }
        ).then((res:    any) => {
            dismissIonLoading();
            if(res.data.success === 0)
            {
                // presentAlert({
                //    header: 'Note',
                //     message: res.data.message,
                //     buttons: ['OK'],
                //   })
            }
            else{
                updateGroupData(res.data);
            }
            
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
                        <IonBackButton />
                        <IonTitle >Groups</IonTitle>
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
             {groupData?.length === 0 && <IonRow class="no_result_found_cls font_size_head">
                       <p> No Groups Found.</p>
                        </IonRow>}
                <div className='child_list_cls group_list_cls'>
                    {groupData?.data?.map((groupItem: any)=>{
                        return (
                            <IonRow onClick={() => clickOnGroupName(groupItem)} class="ion-align-items-center row_box_shadow_cls">
                        <IonCol size="10" >
                            <p className='no_margin font_size_head group_name_cls'>{groupItem.groupname}</p>
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
export default Groups;




import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonImg, IonCard, IonFooter, useIonAlert, useIonViewWillEnter, useIonLoading, IonBadge, useIonRouter, IonCardTitle, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import './Home.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api, CLINT_SERVICE } from '../util/util';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import axios from 'axios'; 
import { url } from 'inspector';

const Home: React.FC = () => {
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(10, () => {
      console.log('Narayanaaaa---1')
      console.log('path', history.location.pathname);
      if (history.location.pathname === '/home') {
        presentAlert({
          message: 'Do you want to quit the app?',
          backdropDismiss: false,
          cssClass: 'fee_alert_css',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          }, {
            text: 'Quit',
            role: 'confirm',
            handler: () => {
              // localStorage.clear();
              App.exitApp();
            }
          }
          ]
        })
      }
      // App.exitApp();
    });
  });

  const [role, setRole] = useState<any>(localStorage.getItem('role'));
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const [showIonLoading, dismissIonLoading] = useIonLoading();
  const [userProfileData, getProfileData] = useState<any>();
  const [isSwitchEnable, setSwitchEnable] = useState<any>(false);
  const [achievementsCount, getAchievementsCount] = useState<any>(0);
  const [attendanceCount, getAttendanceCount] = useState<any>(0);
  const [behaviorCount, getBehaviorCount] = useState<any>(0);
  const [routeUpdateCount, getRouteUpdateCount] = useState<any>(0);
  const [mydayUpdateCount, getMydayUpdateCount] = useState<any>(0);
  const [noticeBoardCount, getNoticeBoardCount] = useState<any>(0);
  const [flippedVideoCount, getFlippedVideoCount] = useState<any>(0);
  const [leaveCount, getLeaveCount] = useState<any>(0);
  const [homeworkCount, getHomeworkCount] = useState<any>(0);
  const [cetExamCount, getCetExamCount] = useState<any>(0);
  const [eHomeWorkCount, geteHomeWorkCount] = useState<any>(0);
  const [importanceDay, getImportanceDay] = useState<any>();
  const [notificationCount, getNotificationCount] = useState(0); // Initialize with a default value
  const [status,setStatus] =useState<any>()
  const [bstatus ,setBstatus] =useState<any>()
 const [feeStatus ,setFeeStatus] =useState<any>()
const [ gateStatus,setGatestatus]=useState<any>()

  const clickOnItem = async (item: any) => {
    if (item.name === 'Chat') {
      var userData = localStorage.getItem('userAuth') as any;
      userData = JSON.parse(userData);
      const studentID = userData.record.student_id
      var url = 'https://smpus.wisibles.com/api_new/addchat?student_id=' + studentID;
      window.open(url, '_system');
      // await Browser.open({ url: url });
      // Browser.addListener('browserFinished', () => {
      //     console.log('finished');
      // })
    } else {
      history.push(item.url);
    }
  };
  const clickOnSwitchChild = () => {
    history.push('/childs');
  };
  const clickOnMainItem = (item: any) => {
    history.push(item.url);
  };

  const clickOnProfile = (item: any) => {
    history.push(item);
  };

  const notification = () => {
    history.push('/notifications')
  }


  useIonViewWillEnter(() => {
    setSwitchEnable(false);
    var userData = localStorage.getItem('userAuth') as any;
    console.log("userData1",userData)
    userData = JSON.parse(userData) ;
    var user_role = localStorage.getItem('role');
    setRole(user_role);
    if (user_role === 'parent') {
      console.log("Entered")
      var childList = localStorage.getItem('childrenList')  as any;
      childList = JSON.parse(childList);
      if (childList?.length > 1) {
        setSwitchEnable(true);
      }
    };
    console.log("userData2", userData)
    getUserData(userData, user_role);
    console.log('importanceDay', importanceDay);
    //  presentAlert({
    //   header: 'Work In Progress',
    //   message: 'This feature under development.',
    //   buttons: ['OK'],
    //   backdropDismiss: false
    // })

  fetchStatus();
   
  })
     const fetchStatus = async () => {
    try {
      const res = await axios.get("https://smpus.wisibles.com/api_new/Dashboard/getdashboardpermissions");
      // console.log("Status", res.data.result)
      res?.data?.result.map( (value :any,index :number) =>{
        console.log("value",value)
        if ( value?.type == 'cstatus'){
          setStatus(value.status)
        }
          else if( value?.type == 'bstatus'){
          setBstatus(value?.status)
        }else if(value?.type == 'feestatus'){
          setFeeStatus(value?.status)
        }else if( value.type == "gatestatus"){
          setGatestatus(value?.status)
        }
        }
      )


 

    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  console.log(userProfileData, 'user profile data');


}, []);

  const getUserData = (userData: any, userRole: any) => {

    showIonLoading('Loading....')
    const reqObj = {
      student_id: userData.record.student_id
    };
    return api.post('api_new/Webservice/getStudentProfile', reqObj, {
      headers: {
        "Content-Type": "application/json",
        "Client-Service": CLINT_SERVICE,
        "Auth-Key": 'schoolAdmin@',
        "Authorization": userData.token,
        "User-ID": userData.id
      }
    }
    ).then((res: any) => {
      getProfileData(res.data);
      // getImportanceOfTheDay();
      console.log('profile data --- 161', res.data);
      console.log('roleFinal', userRole);
      if (res.data?.total_fee?.fee_status === 'unpaid' && userRole === 'parent') {
        console.log(
          "HEREERERER"
        )
        presentAlert({
          message: '<img class="alert_img_class" src="../../../assets/images/caution.svg"/><br/>' + '<h5>Dear Parent,</h5><br/>' + 'The fee for your child is pending. Kindly clear the Dues by clicking the button below.',
          buttons: [
            {
              text: 'Logout',
              role: 'confirm',
              cssClass: 'alert_btn_cls',
              handler: () => {
                var token: any = localStorage.getItem('deviceToken');
                localStorage.clear();
                localStorage.setItem('deviceToken', token);
                console.log("LOGIN-1")
                history.push('/login')
              },
            },
            {
              text: 'Pay Now',
              role: 'confirm',
              cssClass: 'alert_btn_cls',
              handler: () => {
                history.push('/fee');
              },
            }
          ],
          backdropDismiss: false,
          cssClass: 'fee_alert_css'
        })
      }
      else if (res.data?.total_fee?.fee_status === 'unpaid' && userRole === 'student') {
        presentAlert({
          message: '<img class="alert_img_class" src="../../../assets/images/caution.svg"/><br/>' + '<h5>Dear Student,</h5><br/>' + 'Your account has been Blocked. Please contact the Admin.',
          backdropDismiss: false,
          cssClass: 'fee_alert_css',
          buttons: [{
            text: 'Logout',
            role: 'confirm',
            handler: () => {
              var token: any = localStorage.getItem('deviceToken');
              localStorage.clear();
              localStorage.setItem('deviceToken', token);
                  console.log("LOGIN-2")
              history.push('/login')
            }
          }]
        })
      };
      localStorage.setItem('studentProfileData', JSON.stringify(res.data));
      console.log("JSON.stringify(res.data)",res.data)
      dismissIonLoading();
      /** Hide ballon notification for JHPS school */
      
      getNotificationData(userData, userRole);
    }).catch((error: any) => {
      
      console.log('error:    ', error);
      dismissIonLoading();
      var token: any = localStorage.getItem('deviceToken');
      localStorage.clear();
      localStorage.setItem('deviceToken', token);
      console.log("LOGIN-3")
      history.push('/login');
    })
  }

  const getImportanceOfTheDay = () => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const reqObj = {
      // date: "2025-04-19"
      date: today
    };

    return api.post('api_new/Importance_day/get_importance_day', reqObj, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res: any) => {
      console.log('importanceDay data :', res.data);
      getImportanceDay(res.data);
    }).catch((error: any) => {
      dismissIonLoading();
    });
  };


  const getNotificationData = async (userData: any, userRole: any) => {
    const reqObj = {
      student_id: userData.record.student_id,
      role: userRole
    };
    return api.post('api_new/balloon_notification/', reqObj, {
      headers: {
        "Content-Type": "application/json"
      }
    }
    ).then((res: any) => {
      console.log('notification data :', res.data);
      // getAttendanceCount(res.data.attendance_count); /* For attendace Count*/
      // getBehaviorCount(res.data.behaviour_notes_count);
      // getAchievementsCount(res.data.achievement_count);
      // getFlippedVideoCount(res.data.fv_quiz_count);
      // getLeaveCount(res.data.leave_count);
      // getNotificationDataOfNoticeBoard(userData, userRole);
      // getCetExamCount(res.data.cet_exam_count);
      // geteHomeWorkCount(res.data.ehomework_count);
      getNotificationCount(res.data.notifications_count);
      // getRouteUpdateCount(res.data.route_update_count);
      // getMydayUpdateCount(res.data.my_day_today_count);
    }).catch((error: any) => {
      dismissIonLoading();
    })
  };
  const getNotificationDataOfNoticeBoard = async (userData: any, userRole: any) => {
    if (userRole === 'parent') {
      const reqObj = {
        parent_id: userData.id,
        visible_parent: "Yes"
      };

      return api.post('api_new/balloon_notification/bn_notice_parent', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        console.log('notification data of notice board :', res.data);
        getNoticeBoardCount(res.data.count)
        getNotificationDataOfHomeWork();

      }).catch((error: any) => {
        dismissIonLoading();
      })
    }
    else {
      const reqObj = {
        student_id: userData.record.student_id,
        visible_student: "Yes"
      };

      return api.post('api_new/balloon_notification/bn_notice_student', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        console.log('notification data of notice board :', res.data);
        getNoticeBoardCount(res.data.count);
        getNotificationDataOfHomeWork();

      }).catch((error: any) => {
        console.log('error:    ', error);
        dismissIonLoading();
      })
    }
  };

  const getNotificationDataOfHomeWork = async () => {
    var userData = localStorage.getItem('userAuth') as any;
    userData = JSON.parse(userData);
    var user_role = localStorage.getItem('role');
    var studentInfo = localStorage.getItem('studentProfileData') as any;
    studentInfo = JSON.parse(studentInfo);

    if (user_role === 'parent') {
      const reqObj = {
        parent_id: userData.id,
        class_id: studentInfo.student_result.class_id,
        section_id: studentInfo.student_result.section_id,
      };

      return api.post('api_new/balloon_notification/get_homework_parent', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        console.log('notification data of notice board :', res.data);
        getHomeworkCount(res.data.count)
        dismissIonLoading();
      }).catch((error: any) => {
        dismissIonLoading();
      })
    }
    else {
      const reqObj = {
        student_id: userData.record.student_id,
        class_id: studentInfo.student_result.class_id,
        section_id: studentInfo.student_result.section_id,
      };

      return api.post('api_new/balloon_notification/get_homework_student', reqObj, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then((res: any) => {
        console.log('notification data of notice board :', res.data);
        getHomeworkCount(res.data.count);
        dismissIonLoading();
      }).catch((error: any) => {
        console.log('error:    ', error);
        dismissIonLoading();
      })
    }
  };

  let dashBoardItems = [
    {
      name: 'Class Timetable',
      icon: 'class-timetable.svg',
      url: '/time-table',
    },
    // {
    //   name: 'Progress Card',
    //   icon: 'progress-card.svg',
    //   url: '/progress-card',
    // },
    {
      name: 'Behavior Note',
      icon: 'behaviour-note.svg',
      url: '/behavior-note',
    },
    {
      name: 'Apply Leave',
      icon: 'apply-leave.svg',
      url: '/leave',
    },
    {
      name: 'Fees',
      icon: 'fee.svg',
      url: '/fee',
    },
    {
      name: 'Gallery',
      icon: 'gallery.svg',
      url: '/gallery'
    },
    {
      name: 'Chat',
      icon: 'chat.svg',
      url: '/'
    },
    // {
    //   name: 'Groups',
    //   icon: 'groups.svg',
    //   url: '/groups',
    // },
    // {
    //   name: 'Class Notes',
    //   icon: 'class-notes.svg',
    //   url: '/class-notes',
    // },
    // {
    //   name: 'Assignment',
    //   icon: 'assignment.svg',
    //   url: '/assignment',
    // },
    {
      name: 'Examination',
      icon: 'examination.svg',
      url: '/progress-card',
    },
    // {
    //   name: 'Handbook',
    //   icon: 'handbook.svg',
    //   url: '/handbook',
    // },
    {
      name: 'Gate pass',
      icon: 'gatePass.svg',
      url: '/gatepass',
    },
    // {
    //   name: 'Anecdotes',
    //   icon: 'anecdotes.svg',
    //   url: '/anecdotes',
    // },
    // {
    //   name: 'Infirmary',
    //   icon: 'infirmary.svg',
    //   url: '/infirmary',
    // },
    {
      name: 'Download',
      icon: 'downloads.svg',
      url: '/download',
    },
    {
      name :'calendar',
      icon :'cal.png',
      url:'/calendar'
    },
    //  {
    //   name: 'Circular',
    //   icon: 'circular.svg',
    //   url: '/circular'
    // },
       {
      name :'Homework',
      icon :'homework.svg',
      url:'/dairy',
    },
    {
      name :'Connect',
      icon:'connect.png',
      url :'/Connect'
    }
    
  ];

  let dashBoardItemsForStudent = [
    {
      name: 'Class Timetable',
      icon: 'class-timetable.svg',
      url: '/time-table',
    },
    {
      name: 'Progress Card',
      icon: 'progress-card.svg',
      url: '/progress-card',
    },
    {
      name: 'Behavior Note',
      icon: 'behaviour-note.svg',
      url: '/behavior-note',
    },
    {
      name: 'Apply Leave',
      icon: 'apply-leave.svg',
      url: '/leave'
    },
    {
      name: 'Gallery',
      icon: 'gallery.svg',
      url: '/gallery'
    },
    {
      name: 'Chat',
      icon: 'chat.svg',
      url: '/'
    },
    {
      name: 'Groups',
      icon: 'groups.svg',
      url: '/groups',
    },
    {
      name: 'Gate pass',
      icon: 'gatePass.svg',
      url: '/gatepass',
    },
    {
      name: 'Anecdotes',
      icon: 'anecdotes.svg',
      url: '/anecdotes',
    },
    {
      name: 'Infirmary',
      icon: 'infirmary.svg',
      url: '/infirmary',
    },
    {
      name: 'Download',
      icon: 'downloads.svg',
      url: '/download',
    }
  ];
  let mainItems = [
    {
      name: 'Attendance',
      icon: 'attendance.svg',
      url: '/attendance',
    },
    // {
    //   name: 'Diary',
    //   icon: 'home-work.svg',
    //   url: '/dairy'
    // },
    // {
    //   name: 'Circular',
    //   icon: 'circular.svg',
    //   url: '/circular'
    // },
    //  {
    //   name :'Homework',
    //   icon :'homework.svg',
    //   url:'/dairy',
    // },
    {
      name :'Transport',
      icon:'tra.png',
      url :'/transport-routes'
    },
      {
      name :'Communication',
      icon:'communication2.png',
      url :'/communication'
    },
   
  ];

  let mainItemsForStudents = [
    {
      name: 'Attendance',
      icon: 'attendance.svg',
      url: '/attendance',
    },
    {
      name: 'Diary',
      icon: 'home-work.svg',
      url: '/dairy'
    },
    {
      name: 'Circular',
      icon: 'circular.svg',
      url: '/circular'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  if (role === 'student') {
    dashBoardItems = dashBoardItemsForStudent;
    mainItems = mainItemsForStudents;
  };


    let finalItems = [...dashBoardItems];
    // console.log("finalItems",finalItems)
    // console.log("gateStatus",gateStatus)
    if (status == 1) {
      finalItems = finalItems.filter(item => item.name.toLowerCase() !== 'chat');
    }
     if( feeStatus == 1){
    finalItems = finalItems.filter(item => item.name.toLowerCase() !== 'fees');
    }
    if(gateStatus == 1){
      finalItems = finalItems.filter(item => item.name.toLowerCase() !== 'gate pass'); 
      console.log("finalItems",finalItems[5].name == 'Gate pass',finalItems[5].name)
    }
  
  return (
    <IonPage>
      <IonContent  className='home_page_content'>
        <IonCard class='card_class'>
          <IonRow className='card-row-cls'>
            <IonCol size='8'>
              <img className='logo_img' src={'../../../assets/images/smps_app_logo.png' }  alt="logo_img" />
              <p className='student_name font_size_body upper_case_class'>{userProfileData?.student_result?.firstname + ' ' + userProfileData?.student_result?.lastname}</p>
              <p className='student_class student_class_two  font_size_body'>{userProfileData?.student_result?.admission_no}</p>
              <p className='student_class student_class_two font_size_body'>{userProfileData?.student_result?.class}({userProfileData?.student_result?.section})</p>
            </IonCol>
            {console.log("userProfileData?.student_result?.image",userProfileData?.student_result)
            }
            <IonCol size='4'>
              <div className='badge-container'>
                { userProfileData?.student_result?.image ? <IonImg className='student_img border_radius_cls noti_cls' src={userProfileData?.student_result?.image}/>
               : <IonImg className='student_img border_radius_cls noti_cls' src={'../../../assets/images/placeholder_user.png'}/> } 
              </div>
              <IonBadge onClick={notification} class='badge_cls'>
                <IonImg class='bell_cls' src='assets/images/bell.svg' />
                {notificationCount > 0 && <span className='badge-number'>{notificationCount}</span>}
              </IonBadge>
            </IonCol>
          </IonRow>
        </IonCard>
        <IonGrid class="main_back_grid">
          <IonGrid class='top_main_g3rid ion-no-padding'>
            <IonRow>
              <div className='top_item_div'>
                {mainItems?.map(item => {
                  return (
                    <div className='top_item_div_box' onClick={() => clickOnMainItem(item)}>
                      <div className='top_item'>
                        <div className='top_item_class'>
                          <div className='top_class'>
                            {item.name === 'Attendance' && attendanceCount !== 0 && <IonBadge class='home_not_badge main_item_badge' slot="end"><span className='home_not_span'>{attendanceCount}</span></IonBadge>}
                            {item.name === 'Flipped Videos' && flippedVideoCount !== 0 && <IonBadge class='home_not_badge main_item_badge' slot="end"><span className='home_not_span'>{flippedVideoCount}</span></IonBadge>}
                            <IonImg class="board_img" src={'../../../assets/images/' + item?.icon} />
                          </div>
                          <div className='bottom_class'>
                            <p className='p_class_home ion-no-margin'> {item?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </IonRow>
          </IonGrid>
          <IonGrid class='main_grid'>
            {isSwitchEnable === true && <IonRow>
              <IonCol size='6'>
              </IonCol>
              {isSwitchEnable === true && <IonCol size='4' onClick={clickOnSwitchChild}>
                <p className='footer_h child_switch_align text_caps font_size_body'> Switch Child</p>
              </IonCol>}
              {isSwitchEnable === true && <IonCol size='2' onClick={clickOnSwitchChild}>
                <IonImg class='switch_image_class' src={'../../../assets/images/switch.svg'} />
              </IonCol>}
            </IonRow>}
            {/* { bstatus != 1 && importanceDay?.success !== 0 && (
              <IonCard className="importance-banner">
                <IonCardTitle class='card-title'>Importance of the Day</IonCardTitle>
                {console.log("ImageIMP", importanceDay?.result_data)}
                <IonImg
                  src={importanceDay?.result_data[0]?.image}
                  alt="Importance of the Day"
                />
              </IonCard>
            )} */}


            <IonRow class='child-item-padding'>
              {
                ((userProfileData?.student_result?.mydaytoday === 'yes' && role === 'parent')
                  ? [...dashBoardItems, {
                    name: 'My Day Today',
                    icon: 'cet_exam.svg',
                    url: '/myday',
                  }]
                  : finalItems // replaced by dashBoardItems
                ).map(item => {
              
                  return (
                    <div className='item_class_box' onClick={() => clickOnItem(item)}>
                      {item.name === 'Achievements' && achievementsCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{achievementsCount}</span></IonBadge>}
                      {item.name === 'Home Work' && homeworkCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{homeworkCount}</span></IonBadge>}
                      {item.name === 'Apply Leave' && leaveCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{leaveCount}</span></IonBadge>}
                      {item.name === 'Behavior Note' && behaviorCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{behaviorCount}</span></IonBadge>}
                      {item.name === 'Route Updates' && routeUpdateCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{routeUpdateCount}</span></IonBadge>}
                      {item.name === 'My Day Today' && mydayUpdateCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{mydayUpdateCount}</span></IonBadge>}
                      {item.name === 'Cet Exams' && cetExamCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{cetExamCount}</span></IonBadge>}
                      {item.name === 'E-Homework' && eHomeWorkCount !== 0 && <IonBadge class='home_not_badge' slot="end"><span className='home_not_span'>{eHomeWorkCount}</span></IonBadge>}
                    
                      <IonCol class='item_class'>
                        <IonImg class="item_img" src={'../../../assets/images/' + item?.icon} />

                      </IonCol>
                      <p className='p_class_home'> {item?.name}</p>
                    </div>
                  )
                })}
            </IonRow>
          </IonGrid>
        </IonGrid>
      </IonContent>
      <IonFooter class="home_footer">
        <IonRow class='footer_margin_btm'>
          <IonCol onClick={() => clickOnProfile('/home')}>
            <IonImg class="footer_img" src={'../../../assets/images/home_f.svg'} />
            <p className='footer_h text_caps'> Home</p>
          </IonCol>
          {/* <IonCol onClick={() => clickOnProfile('/home-work')}>
            <div>
           { homeworkCount !== 0  && <div className='home_not_badge_footer' slot="end"><span className='home_not_span_footer'>{homeworkCount}</span></div>}
            <IonImg class="footer_img" src={'../../../assets/images/homework_f.svg'} />
            <p className='footer_h text_caps'>Home Work</p>
            </div>
          </IonCol> */}
          {/* <IonCol onClick={() => clickOnProfile('/behavior-note')}>
            <div>
            { behaviorCount !== 0  && <div className='home_not_badge_footer' slot="end"><span className='home_not_span_footer'>{behaviorCount}</span></div>}
              <IonImg class="footer_img" src={'../../../assets/images/behavior.svg'} />
              <p className='footer_h text_caps'>Behavior Note</p>
            </div>
          </IonCol> */}

          <IonCol onClick={() => clickOnProfile('/circular')}>
            <div>
              {noticeBoardCount !== 0 && <div className='home_not_badge_footer' slot="end"><span className='home_not_span_footer'>{noticeBoardCount}</span></div>}
              <IonImg class="footer_img" src={'../../../assets/images/notice_board_f.svg'} />
              <p className='footer_h text_caps'> Circular</p>
            </div>
          </IonCol>

          <IonCol onClick={() => clickOnProfile('/about-school')}>
            <IonImg class="footer_img" src={'../../../assets/images/about_school_f.svg'} />
            <p className='footer_h text_caps'>About School</p>
          </IonCol>

          <IonCol onClick={() => clickOnProfile('/profile')}>
            <IonImg class="footer_img" src={'../../../assets/images/profile_f.svg'} />
            <p className='footer_h text_caps'>Profile</p>
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default Home;



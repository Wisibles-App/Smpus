/* eslint-disable jsx-a11y/anchor-has-content */
import { IonContent, IonPage, IonImg, IonButton, IonInput, useIonLoading, useIonAlert, useIonViewWillEnter, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonCol, IonRow, IonCheckbox } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './login.css';
import { api, CLINT_SERVICE } from "../util/util";
import { Browser } from '@capacitor/browser';

import { FCM } from "@capacitor-community/fcm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


// eslint-disable-next-line react-hooks/rules-of-hooks


// eslint-disable-next-line @typescript-eslint/no-unused-vars

function login(): JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [presentAlert] = useIonAlert();


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('Initializing login page');

    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        console.log('Token', JSON.stringify(token));
        console.log('deviceToken', token.value);
        localStorage.setItem('deviceToken', token.value);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const data = notification;
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification))
      }
    );

    //   //  PushNotifications.requestPermissions();
    //   //  PushNotifications.register();
    //   // now you can subscribe to a specific topic
    //   // FCM.subscribeTo({ topic: "test" })
    //   //   .then((r) => console.log(`subscribed to topic`))
    //   //   .catch((err) => console.log(err));
    //   // // Unsubscribe from a specific topic
    //   // FCM.unsubscribeFrom({ topic: "test" })
    //   //   .then(() => console.log(`unsubscribed from topic`))
    //   //   .catch((err) => console.log(err));
    //   // // Get FCM token instead the APN one returned by Capacitor
    //   // FCM.getToken()
    //   //   .then((r) => localStorage.setItem('deviceToken',r.token))
    //   //   .catch((err) => console.log(err));
    //   // // Remove FCM instance
    //   // FCM.deleteInstance()
    //   //   .then(() => alert(`Token deleted`))
    //   //   .catch((err) => console.log(err));
    //   // // Enable the auto initialization of the library
    //   // FCM.setAutoInit({ enabled: true }).then(() => alert(`Auto init enabled`));
    //   // // Check the auto initialization status
    //   // FCM.isAutoInitEnabled().then((r) => {
    //   //   console.log("Auto init is " + (r.enabled ? "enabled" : "disabled"));
    //   // });
    //   //    PushNotifications.requestPermissions();
    //   //     PushNotifications.register();
    //   // // now you can subscribe to a specific topic
    //   // FCM.subscribeTo({ topic: "test" })
    //   //   .then((r) => console.log(`subscribed to topic`))
    //   //   .catch((err) => console.log(err));
    //   // // Unsubscribe from a specific topic
    //   // FCM.unsubscribeFrom({ topic: "test" })
    //   //   .then(() => console.log(`unsubscribed from topic`))
    //   //   .catch((err) => console.log(err));
    //   // // Get FCM token instead the APN one returned by Capacitor
    //   // FCM.getToken()
    //   //   .then((r) => console.log('token:', r.token))
    //   //   .catch((err) => console.log(err));
    //   //     // Remove FCM instance
    //   // FCM.deleteInstance()
    //   // .then(() => console.log(`Token deleted`))
    //   // .catch((err) => console.log(err));
    //   // // Enable the auto initialization of the library
    //   // FCM.setAutoInit({ enabled: true }).then(() => console.log(`Auto init enabled`));
    //   // // Check the auto initialization status
    //   // FCM.isAutoInitEnabled().then((r) => {
    //   //   console.log("Auto init is " + (r.enabled ? "enabled" : "disabled"));
    //   // });
  }, []);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loginID, setLoginID] = useState<any>('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [forgotEmail, setForgotEmail] = useState<any>('');



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showLogin, enableLogin] = useState<any>(true);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState<any>('student');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/rules-of-hooks
  const [selectedRole, setRole] = useState<any>('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checkboxValue, setCheckboxValue] = useState(false);

  const clickOnLabel = () => {
    //  Browser.open({ url: 'https://smpus.wisibles.com/api/terms_conditions'});
    window.open('https://smpus.wisibles.com/api_new/terms_conditions', '_system');
  }

  const handleCheckboxChange = async (event: CustomEvent) => {
    setCheckboxValue(event.detail.checked);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedValue, setSelectedValue] = useState('student');

  const handleRadioChange = (event: CustomEvent) => {
    setSelectedValue(event.detail.value);
    console.log(selectedValue);
  };


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showIonLoading, dismissIonLoading] = useIonLoading();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => {
    console.log('calling---------');
    setLoginID('');
    setPassword('');
    enableLogin(true);
    console.log(localStorage.getItem('role'));
    if (localStorage.getItem('role') === 'student' || localStorage.getItem('role') === 'parent') {
      let child = JSON.parse(localStorage.getItem('childrenList') as any)
      if (child.length > 1) {
        history.push('/childs');
      } else {
        history.push('/home');
      }
    }
  });

  const clickOnForgotPassword = () => {
    enableLogin(false);
  };

  const clickOnSignIn = () => {
    console.log(checkboxValue);
    enableLogin(true);
  };

  const clickOnSubmit = () => {
    if (forgotEmail === '' || selectedValue === '') {
      presentAlert({
        header: 'Note',
        message: 'Please enter email and select user type.',
        buttons: ['OK'],
      });
    }

    else {
      showIonLoading('Loading....');
      const reqObj = {
        email: forgotEmail,
        usertype: selectedValue,
        "site_url": "https://smpus.wisibles.com"
      };
      console.log(reqObj);
      api.post("api_new/Webservice/forgot_password", reqObj, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res: any) => {
          dismissIonLoading();
          console.log('forgot respone:', res);
          enableLogin(true);
          presentAlert({
            header: 'Note',
            message: res.data.message,
            buttons: ['OK'],
          });
        }, error => {
          console.log('---error---', error);
          dismissIonLoading();
          presentAlert({
            header: 'Note',
            message: error.response.data.message,
            buttons: ['OK'],
          });
        });
    }
    console.log(selectedValue);

  };

  const clickOnProceed = () => {

    console.log('token', localStorage.getItem('deviceToken'));
    console.log(checkboxValue);
    showIonLoading('Loading....');
    const loginData = {
      username: loginID,
      password: password,
      deviceToken: localStorage.getItem('deviceToken'),
      checktandc: checkboxValue === false ? 0 : 1
      // deviceToken: Math.floor(100000 + Math.random() * 900000)
    };
    api.post("api_new/Auth/login", loginData, {
      headers: {
        "Content-Type": "application/json",
        "Client-Service": CLINT_SERVICE,
        "Auth-Key": 'schoolAdmin@',
      }
    })
      .then((res: any) => {
        dismissIonLoading();
        console.log('login respone:', res);
        // throw 'f'
        if (res.data.status === 1) {
          localStorage.setItem('role', res.data.record.role);
          localStorage.setItem('branch_id', res.data.record.branch_id);
          localStorage.setItem('school_id', res.data.record.school_id);
          const userAuthData = JSON.stringify(res.data);
          if (res.data.record.role === 'student') {
            localStorage.setItem('userAuth', JSON.stringify(res.data));
          }
          else if (res.data.record.parent_childs.length > 1) {
            localStorage.setItem('childrenList', JSON.stringify(res.data.record.parent_childs))
            localStorage.setItem('userAuth', userAuthData);
            history.push('/childs');
          }
          else {
            console.log("TWO")
            localStorage.setItem('childrenList', JSON.stringify(res.data.record.parent_childs));
            res.data.record = res.data.record.parent_childs[0];
            res.data.record.username = res.data.record.name;
            localStorage.setItem('userAuth', JSON.stringify(res.data));
            history.push("/home");
          }
          // history.push("/home");
        }

        else {
          presentAlert({
            header: 'Note',
            message: res.data.message,
            buttons: ['OK'],
          });
        }
      })
      .catch((error: any) => {
        dismissIonLoading();
        console.log(error);
      });
    localStorage.setItem('role', loginID);
  };
  return (
    <IonPage >
      <IonContent class='content_class' fullscreen>
        <div className="background-container">
          {showLogin && <div className='main_div'>
            <IonImg src="../../../assets/images/img_login_background.png" className="background-image" />
            <IonImg class='login_main_img_class' src={'../../../assets/images/loginLogo.png'} />
            {/* <h3 className='h_class'>Account verification</h3> */}
            {/* <p className='p_class'>We need to verify your login id before getting started!</p> */}
            <div style={{ marginTop: '50px' }}>
              <IonInput class='input_class' value={loginID} placeholder="Username" onIonChange={e => setLoginID(e.detail.value!)}> </IonInput>
              <IonInput class='input_class' value={password} placeholder="Password" type="password" onIonChange={e => setPassword(e.detail.value!)}> </IonInput>
            </div>

            {/* <p className='p_terms_cls'>
                    <IonCheckbox className='check_margin' checked={checkboxValue}
                onIonChange={handleCheckboxChange} slot="start" mode='md' value="student"></IonCheckbox>
                  <IonLabel onClick={() => clickOnLabel()}class='select_cls underline'>I agree to the terms and conditions</IonLabel> </p> */}
                    {/* <div className="checkbox-container">
              <IonCheckbox
                className="check_margin"
                checked={checkboxValue}
                onIonChange={handleCheckboxChange}
                slot="start"
                mode="md"
                value="student"
              />
              <IonLabel onClick={clickOnLabel} className="select_cls underline">
                I agree to the terms and conditions
              </IonLabel>
            </div> */}
            {/* <div> */}
            <p className='forgot_p_cls' onClick={() => clickOnForgotPassword()}> <IonImg class='forgot_img_cls' src={'assets/images/forgot_password.svg'} /><span className='forgot_class'>Forgot Password?</span></p>
            {/* </div> */}
            <IonButton class='button_class_signIn' onClick={() => clickOnProceed()}
            >Login</IonButton>
          </div>}

          {!showLogin && <div className='main_div'>
            <div>
              <IonImg class='login_main_img_class' src={'../../../assets/images/loginLogo.png'} />
              <p className='forgot_text_cls'>Forgot Password</p>
            </div>

            {selectedValue === 'student' && <IonInput class='input_class' placeholder="Student's Email" onIonChange={e => setForgotEmail(e.detail.value!)}></IonInput>}
            {selectedValue === 'parent' && <IonInput class='input_class' placeholder="Primary Mobile Number" onIonChange={e => setForgotEmail(e.detail.value!)}></IonInput>}

            {/* <IonInput class='input_class' placeholder="Email" onIonChange={e => setForgotEmail(e.detail.value!)}></IonInput> */}
            {/* <IonList no-lines>
            <IonRadioGroup value={selectedValue} onIonChange={handleRadioChange}>
              <IonRow>
                <IonCol size='5'>
                  <IonItem no-lines class='forgot_item_cls'>
                    <IonLabel class='select_cls'>Student</IonLabel>
                    <IonRadio slot="start" mode='md' value="student"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size='5'>
                  <IonItem no-lines class='forgot_item_cls'>
                    <IonLabel class='select_cls'>Parent</IonLabel>
                    <IonRadio slot="start" mode='md' value="parent"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size='2'>

                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </IonList> */}
            <IonRadioGroup class='radioGroup' value={selectedValue} onIonChange={handleRadioChange}>
              {/* <IonLabel>Student</IonLabel>
        <IonRadio mode='md' slot='start' value="student" /> */}
              <IonItem no-lines class='forgot_item_cls'>
                <IonLabel class='select_cls'>Student</IonLabel>
                <IonRadio slot="start" mode='md' value="student"></IonRadio>
              </IonItem>

              <IonItem no-lines class='forgot_item_cls'>
                <IonLabel class='select_cls'>Parent</IonLabel>
                <IonRadio slot="start" mode='md' value="parent"></IonRadio>
              </IonItem>
              {/* <IonLabel>Parent</IonLabel>
        <IonRadio mode='md' slot='start'  value="parent" /> */}
            </IonRadioGroup>
            <IonButton class='button_class' onClick={() => clickOnSubmit()}
            >SUBMIT</IonButton>
            <p className='forgot_p_cls' onClick={() => clickOnSignIn()}> <IonImg class='forgot_img_cls' src={'assets/images/forgot_password.svg'} /><span className='forgot_class'>User Login</span></p>
          </div>}
        </div>


      </IonContent>
    </IonPage>
  );
}

export default login;



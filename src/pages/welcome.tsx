import React, { useEffect, useRef } from 'react';
import { IonContent, IonPage, IonImg, IonButton, useIonRouter } from '@ionic/react';
import './welcome.css';

const Welcome: React.FC = () => {
  const router = useIonRouter();
  const image1Ref = useRef<HTMLIonImgElement>(null);
  const image2Ref = useRef<HTMLIonImgElement>(null);
  const buttonRef = useRef<HTMLIonButtonElement>(null);

  useEffect(() => {
    // Animation sequence
    setTimeout(() => {
      image1Ref.current?.classList.add('animate-image1');
      image2Ref.current?.classList.add('animate-image2');
    }, 500);

    setTimeout(() => {
      buttonRef.current?.classList.add('animate-button');
    }, 1500);
  }, []);

  const handleGetStarted = () => {
    console.log("LOGIN?WELCOME")
    router.push('/login', 'forward');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">
      <div className="background-container">
 <IonImg src="../../../assets/images/img_login_background.png" className="background-image1" />
   <div className="welcome-container">
          <IonImg 
            ref={image1Ref}
            src="../../../assets/images/cambridge_icon.png" 
            className="welcome-image image1" 
          />
          <IonImg 
            ref={image2Ref}
            src="../../../assets/images/login_image.png" 
            className="welcome-image image2" 
          />
          <IonButton 
            ref={buttonRef}
            className="get-started-button" 
            onClick={handleGetStarted}
          >
            Get Started
          </IonButton>
        </div>
        </div>
     
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
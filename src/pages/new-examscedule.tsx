import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import './newExam-schedule.css';

const ExamSchedules: React.FC = () => {
  const location = useLocation<any>();
  const data = location?.state?.examData || [];
  console.log("location",location?.state?.examData);
  
        // console.log("data",data)
        const formatValue = (v: any) => (v === null || v === undefined || v === 'NULL' ? '-' : String(v));
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="md" class="toolbar_class">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Exam Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {data.map((subject: any, index: number) => (
          <IonCard key={index} className="exam-schedule-card">
            <IonCardHeader className="exam-card-header">
              <IonCardTitle className="exam-card-title">
                {subject.name} 
              </IonCardTitle>
            </IonCardHeader>
             <IonRow className="table-header">
                <IonCol size="4" className="table-header-col">SUBJECT</IonCol>
                <IonCol size="4" className="table-header-col">Date</IonCol>
                <IonCol size="4" className="table-header-col">Start Time</IonCol>
                {/* <IonCol size="2" className="table-header-col">NOTE</IonCol> */}
              </IonRow>

               {subject.time_table.length === 0 ? (
                <IonRow className="table-data-row">
                  <IonCol size="4" className="table-data-col">
                    <IonText>-</IonText>
                  </IonCol>
                  <IonCol size="4" className="table-data-col">
                    <IonText>-</IonText>
                  </IonCol>
                  <IonCol size="4" className="table-data-col">
                    <IonText>-</IonText>
                  </IonCol>
                  {/* <IonCol size="2" className="table-data-col">
                    <IonText>-</IonText>
                  </IonCol> */}
                </IonRow>
              ) : (
                subject.time_table.map((subject: any, index: number) => (
                  <IonRow className="table-data-row" key={index}>
                    <IonCol size="4" className="table-data-col subject-name-col">
                      <IonText>
                        <div className="subject-name-main">{formatValue(subject.subject_name)}</div>
                        {/* {subject.subject_code && (
                          <div className="subject-code-sub">({subject.subject_code})</div>
                        )} */}
                      </IonText>
                    </IonCol>
                    <IonCol size="4" className="table-data-col">
                      <IonText>{formatValue(subject.date)}</IonText>
                    </IonCol>
                     <IonCol size="4" className="table-data-col">
                      <IonText>{formatValue(subject.time_from)}</IonText>
                    </IonCol>
                    {/* <IonCol size="3" className="table-data-col">
                      <IonText>{formatValue(subject.get_marks)}</IonText>
                    </IonCol>
                    <IonCol size="2" className="table-data-col">
                      <IonText>{formatValue(subject.note)}</IonText>
                    </IonCol> */}
                  </IonRow>
                ))
              )}
            {/* <IonCardContent className="exam-card-content">
              <IonGrid className="details-grid">
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Date</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.date}</IonText>
                  </IonCol>
                </IonRow>
                
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Room No</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.room_no}</IonText>
                  </IonCol>
                </IonRow>
                
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Start Time</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.time_from}</IonText>
                  </IonCol>
                </IonRow>
                
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Duration</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.duration} </IonText>
                  </IonCol>
                </IonRow>
                
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Max Marks</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.written_maximum_marks}</IonText>
                  </IonCol>
                </IonRow>
                
                <IonRow className="detail-row">
                  <IonCol className="detail-col">
                    <IonText className="detail-label">Pass Marks</IonText>
                    <IonText className="detail-separator">:</IonText>
                    <IonText className="detail-value">{subject.pass_marks}</IonText>
                  </IonCol>
                </IonRow>
                
                
              </IonGrid>
            </IonCardContent> */}
          </IonCard>
        ))}
        
      </IonContent>
    </IonPage>
  );
};

export default ExamSchedules;
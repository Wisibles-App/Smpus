import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import './fee.css';
import { api, CLINT_SERVICE } from "../util/util";
import { useEffect, useState } from "react";
import { Browser } from '@capacitor/browser';
import axios from 'axios'; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Fee: React.FC = () => {

    const [showIonLoading, dismissIonLoading] = useIonLoading();
    const [studentFeeData, getstudentFeeData] = useState<any>([]);
      const [status,setStatus] =useState<any>()
    var [userInfo] = useState(localStorage.getItem('userAuth') as any);
    userInfo = JSON.parse(userInfo);
    useIonViewWillEnter(() => {
        APIForGetStudentFeeData();
  fetchStatus();

    })
    const fetchStatus = async () => {
    try {
       const res = await axios.get("https://smpus.wisibles.com/api_new/Dashboard/getdashboardpermissions");
       res.data.result.map(( value :any, index :number) =>{
            if (value.type == 'pstatus'){
      setStatus(value.status)
            }
       })
     
      // console.log("Status", res.data.dashboard[0].status);


    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };
    useEffect(() => {
        console.log(studentFeeData, 'student fee data');
 

    });
    const APIForGetStudentFeeData = () => {
        // showIonLoading('Loading....')
        const reqObj = {
            student_id:    userInfo.record.student_id
          }; 
        return api.post('api/Webservice/fees',reqObj, {
            headers:    {
                "Content-Type":    "application/json",
               "Client-Service":  CLINT_SERVICE,
                "Auth-Key":    'schoolAdmin@',
                "Authorization":    userInfo.token,
                "User-ID":    userInfo.id
              }
        }
        ).then((res:    any) => {
            getstudentFeeData(res.data);
            dismissIonLoading();
        }).catch((error:    any) => {
            console.log('error:    ', error);
            dismissIonLoading();
        })
    };

    const clickOnPay = async (feeItem: any) =>{
        // const options = {
        //     key: 'rzp_test_gIIAc42lIE8qma',
        //     amount: '100',
        //     description: 'Great offers',
        //     image: 'https://i.imgur.com/3g7nmJC.png',
        //     order_id: 'order_Km6p19RxELnnQe',//Order ID generated in Step 1
        //     currency: 'INR',
        //     name: 'Medley',
        //     prefill: {
        //       email: 'narayana.dalasari@gmail.com',
        //       contact: '97004002500'
        //     },
        //     theme: {
        //       color: '#3399cc'
        //     }
        //   };
        //   try {
        //     let data = (Checkout.open(options));
        //     console.log(data);
        //   } catch (error) {
        //   }

        var url = 'https://smpus.wisibles.com/api/payment/index/'+feeItem.id+'/'+feeItem.fee_groups_feetype_id+'/'+ userInfo.record.student_id
        APIForGetStudentFeeData();
        //  var url = 'https://fees.easebuzz.in/view/STEM4x0LC'
        window.open(url, '_system');
        // await Browser.open({ url: url });

        // Browser.addListener('browserFinished', () => {
        //     // This console log fires when the browser is closed
        //     console.log('finished');
        //     APIForGetStudentFeeData();
        //   })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="md" className="toolbar_class">
                    <IonButtons slot="start">
                        <IonBackButton />
                        <IonTitle >Fees</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <div className="day_time_table">
                    <div className="day_time_table_h">
                        <p className="no_margin day font_size_head">Grand Total</p>
                    </div>
                    <div className="time_table_headings">
                        <IonRow>
                            <IonCol size="3">
                                <p className="no_margin time_h font_size_body">Amount</p>
                            </IonCol>
                            {/* <IonCol size="3">
                                <p className="no_margin subject_h font_size_body">Discount</p>
                            </IonCol> */}
                            <IonCol size="3">
                                <p className="no_margin room_no_h font_size_body">Fine</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin room_no_h font_size_body">Paid</p>
                            </IonCol>
                            <IonCol size="3">
                                <p className="no_margin room_no_h font_size_body">Balance</p>
                            </IonCol>
                        </IonRow>
                    </div>
                    <div className="time_table_details">
                        <IonRow>
                            <IonCol size="3">
                                <span className="font_size_body">₹{studentFeeData?.grand_fee?.amount}</span>
                            </IonCol>
                            {/* <IonCol size="3">
                                <span className="font_size_body">₹{studentFeeData?.grand_fee?.amount_discount}</span>
                            </IonCol> */}
                            <IonCol size="3">
                                <span className="font_size_body">₹{studentFeeData?.grand_fee?.amount_fine}</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">₹{studentFeeData?.grand_fee?.amount_paid}</span>
                            </IonCol>
                            <IonCol size="3">
                                <span className="font_size_body">₹{studentFeeData?.grand_fee?.amount_remaining}</span>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
                {studentFeeData?.student_due_fee?.map((item: any)=>{
                    return (
                        <div>
                <IonRow class="ion-align-items-center flipped_video_header font_size_head">
                    <IonCol size="12">
                        <p className="no_margin font_size_head">Group Name: {item.name}</p>
                    </IonCol>
                    {/* <IonCol size="3" class="ion-no-padding">
                        <IonRow class="ion-align-items-center ion-float-right">
                            <IonCol size="auto"> <IonImg class="view_img_class_white" src={'../../../assets/images/view_white.svg'} /></IonCol>
                            <IonCol>View</IonCol>
                        </IonRow>
                    </IonCol> */}
                </IonRow>
               {item?.fees?.map((feeItem: any)=>{
                return (
                    <div className="flipped_video_details">
                    <IonRow class="videos_f_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Fees Type</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">{feeItem.type}</p>
                        </IonCol>
                        <IonCol size="3">
                            {feeItem.status === 'paid' && 
                            <p className="no_margin font_size_body fee_status_class green_bg_class">Paid</p>
                            }
                             {feeItem.status !== 'paid' && 
                            <p className="no_margin font_size_body fee_status_class red_bg_class">unpaid</p>
                            }
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_s_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Due Date</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">{feeItem.due_date}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_t_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Amount</p>
                        </IonCol>
                        <IonCol size="1">
                                :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">₹{feeItem.amount}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_f_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Fine</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">₹{feeItem.fine_amount}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_fi_row">
                        {/* <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Discount</p>
                        </IonCol> */}
                        {/* <IonCol size="1">
                            :
                        </IonCol> */}
                        {/* <IonCol size="4">
                            <p className="no_margin font_size_body">₹{feeItem.total_amount_discount}</p>
                        </IonCol> */}
                    </IonRow>
                    <IonRow class="videos_si_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Paid Amt</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">₹{feeItem.total_amount_paid}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow class="videos_si_row">
                        <IonCol size="4">
                            <p className="no_margin row_h font_size_body">Balance Amt</p>
                        </IonCol>
                        <IonCol size="1">
                            :
                        </IonCol>
                        <IonCol size="4">
                            <p className="no_margin font_size_body">₹{feeItem.total_amount_remaining}</p>
                        </IonCol>
                      {  status != 1 && <IonCol size="3">
                            {feeItem.status !== 'paid' &&
                            <p onClick={() => clickOnPay(feeItem)} className="no_margin font_size_body fee_status_class">Pay</p>
                        }
                        </IonCol>}
                    </IonRow>
                </div>
                )
               })}
                </div>
                    )
                })}
            </IonContent>
        </IonPage>
    )
}
export default Fee;





// import state from '../store/common';
// var IMP = window.IMP;
// IMP.init("imp75847396");
// IMP.init("imp55488636");

// const IMP = window.IMP; 
// IMP.init("{INIpayTest}"); 
export default class PaymentService {
  // requestPay(buyerEmail, buyerName, buyerTel, buyerAddr) {
  //   // IMP.request_pay(param, callback) call payment window
  //   IMP.request_pay({
  //     //pg: "html5_inicis",
  //     pg: "uplus",
  //     // pay_method: "card",
  //     merchant_uid: "ORDER_" + new Date().getTime(),
  //     name: buyerName,
  //     amount: 300000,
  //     buyer_email: buyerEmail,
  //     buyer_name: buyerName,
  //     buyer_tel: buyerTel,
  //     buyer_addr: buyerAddr,
  //     app_scheme: "NutrabbitIAmPort",
  //     m_redirect_url : "https://frontned-nutrabbit-dev.dvconsulting.org/callback/payment",
  //   }, function (rsp) {
  //     if (rsp.success) { // payment successful: payment accepted or virtual account issued
  //       alert('"Payment Success. Success:' + rsp);
  //       console.log('success',rsp);
  //       state.isPayment = true;
  //       state.isPaymentDone = 'done';
  //     } else {
  //       console.log('failed',rsp);
  //       state.isPayment = false;
  //       state.isPaymentDone = 'notdone';
  //       // addPayment(applicationId, applyNum, bankName, buyerAddr, buyerEmail, buyerName, buyerTel, 
  //       //   cardName, cardNumber, cardQuota, currency, customData, impUid, merchantUid, name, 
  //       //   paidAmount, paidAt, payMethod, pgProvider, pgTid, pgType, receiptUrl, requestId, status, 
  //       //   success, errorCode, errorMsg);
  //       alert("Payment failed. Error: " + rsp.error_msg);

  //     }

  //   });
  // }

  // API Functions
  async addPayment(applicationId, applyNum, bankName, buyerAddr, buyerEmail, buyerName, buyerTel, cardName, cardNumber, cardQuota, currency, customData, impUid, merchantUid, name, paidAmount, paidAt, payMethod, pgProvider, pgTid, pgType, receiptUrl, requestId, status, success, errorCode, errorMsg) {
    return await axios.post(`/payment/add`, {
      application_id: applicationId,
      apply_num: applyNum,
      bank_name: bankName,
      buyer_addr: buyerAddr,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_tel: buyerTel,
      card_name: cardName,
      card_number: cardNumber,
      card_quota: cardQuota,
      currency: currency,
      custom_data: customData,
      imp_uid: impUid,
      merchant_uid: merchantUid,
      name: name,
      paid_amount: paidAmount,
      paid_at: paidAt,
      pay_method: payMethod,
      pg_provider: pgProvider,
      pg_tid: pgTid,
      pg_type: pgType,
      receipt_url: receiptUrl,
      request_id: requestId,
      status: status,
      success: success,
      error_code: errorCode,
      error_msg: errorMsg
    }).then((res) => res).catch((err) => err);
  }





}
//import 
import axios from 'axios';

export default class CustomerCenterService {

    // Notice List
    async getNoticeList() {
        return await axios.post(`/notice`, { lang: localStorage.getItem('selectedLang'), title: '' }).then((res) => res).catch((err) => err);
    }

    // Notice Details
    async getNoticeDetails(noticeId) {
        return await axios.post(`/notice/id`, { lang: localStorage.getItem('selectedLang'), id: noticeId }).then((res) => res).catch((err) => err);
    }

    // Faq
    async getFAQList() {
        return await axios.post(`/faq`, { lang: localStorage.getItem('selectedLang')}).then((res) => res).catch((err) => err);
    }

    // Faq
    async getEnqueryList(inqId) {
        return await axios.post(`/inquery`, { lang: localStorage.getItem('selectedLang'), userID: inqId}).then((res) => res).catch((err) => err);
    }
    // Inquiry type
    async getEnqueryType() {
        return await axios.post(`inquery/get_inquery_type`, {lang : localStorage.getItem('selectedLang')}).then((res) => res).catch((err) => err);
    }
}
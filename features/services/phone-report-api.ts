import { IDetailPhoneNumber, IPayloadComment, ISearchPhoneCommentPayload, ISearchPhonePayload } from 'models/phone-report';
import  axiosClient  from './axios-client';

class phoneReportApi {

    getListPhoneReport(payload:ISearchPhonePayload) {
        console.log('payload',payload)
        return axiosClient({
            method: 'get',
            url:`/api/v1/phonesearchjp`,
            params: {
                page: payload.page,
                limit:payload.limit
            }
        })
    }
    getSearchPhoneNumber(payload:ISearchPhonePayload) {
        return axiosClient({
            method: 'get',
            url:`/api/v1/phonesearchjp/search/${payload.phoneNumber}`,
            params: {
                page: payload.page,
                limit:payload.limit
            }
        })
    }
    updatephonesearchjp(payload:any) {
        return axiosClient({
            method: 'put',
            url:`/api/v1/phonesearchjp/${payload.phoneNumber}`,
            data:payload
        })
    }
    getCharPhoneNumber(payload:IDetailPhoneNumber){
        return axiosClient({
            method: 'get',
            url:`/api/v1/phonechart/findNumber/${payload.id}`,
        })
    }
    getDetailPhoneNumber(payload:IDetailPhoneNumber){
        return axiosClient({
            method: 'get',
            url:`api/v1/phonesearchjp/${payload.id}`,
        })
    }

    createChartPhoneNumber(payload:any){
        return axiosClient({
            method: 'post',
            url:`api/v1/phonechartjp`,
            data:payload
        })
    }
    getListCommentPhone(payload:ISearchPhoneCommentPayload){
        return axiosClient({
            method: 'get',
            url:`api/v1/phonecommentjp/search/${payload.phoneSearchId }`,
            params: {
                page: payload.page,
                limit:payload.limit
            }
        })
    }
    createCommentPhone(payload:IPayloadComment){
        return axiosClient({
            method: 'post',
            url:`api/v1/phonecommentjp`,
            data:payload
        })
    }
}


export default new phoneReportApi();

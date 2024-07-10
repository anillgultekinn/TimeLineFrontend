import { Paginate } from "../models/paginate";
import { BaseService } from "../core/services/baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import GetListWorkHourResponse from "../models/responses/workHour/getListWorkHourResponse";
import GetWorkHourResponse from "../models/responses/workHour/getWorkHourResponse";
import AddWorkHourRequest from "../models/requests/workHour/addWorkHourRequest";
import AddedWorkHourResponse from "../models/responses/workHour/addedWorkHourResponse";
import UpdateWorkHourRequest from "../models/requests/workHour/updateWorkHourRequest";
import UpdatedWorkHourResponse from "../models/responses/workHour/updatedWorkHourResponse";

class WorkHourService extends BaseService<
    Paginate<GetListWorkHourResponse>,
    GetWorkHourResponse,
    AddWorkHourRequest,
    AddedWorkHourResponse,
    UpdateWorkHourRequest,
    UpdatedWorkHourResponse> {
    constructor() {
        super();
        this.apiUrl = "WorkHours";
    }

    getByAccountId(accountId: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListWorkHourResponse>, any>> {
        return axiosInstance.get<Paginate<GetListWorkHourResponse>>(this.apiUrl + "/GetByAccountId?accountId=" + accountId + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
    getByMonthAsync(month: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListWorkHourResponse>, any>> {
        return axiosInstance.get<Paginate<GetListWorkHourResponse>>(this.apiUrl + "/getByMonthAsync?month=" + month + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
    getByMonthAndDayAsync(month: number, day: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListWorkHourResponse>, any>> {
        return axiosInstance.get<Paginate<GetListWorkHourResponse>>(this.apiUrl + "/GetByMonthAndDayAsync?month=" + month + "&day" + day + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
    getByAccountIdAndMonthAsync(accountId: number, month: number, pageIndex: number, pageSize: number): Promise<AxiosResponse<Paginate<GetListWorkHourResponse>, any>> {
        return axiosInstance.get<Paginate<GetListWorkHourResponse>>(this.apiUrl + "/GetByAccountIdAndMonthAsync?accountId" + accountId + "&month" + month + "&PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    }
}

export default new WorkHourService();
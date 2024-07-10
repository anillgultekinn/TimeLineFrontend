import { AxiosResponse } from 'axios';
import axiosInstance from '../core/interceptors/axiosInterceptor';
import LoginResponse from '../models/responses/auth/loginResponse';
import ChangePasswordRequest from '../models/requests/auth/changePasswordRequest';
import RegisterRequest from '../models/requests/auth/registerRequest';
import LoginRequest from '../models/requests/auth/loginRequest';
class UserService {

    public apiUrl: string;
    constructor() {
        this.apiUrl = "Users";
    }

    loginUser(loginUserRequest: LoginRequest): Promise<AxiosResponse<LoginResponse, any>> {
        return axiosInstance.post<LoginResponse>(this.apiUrl + '/Login', loginUserRequest);
    }

    changePassword(changePasswordRequest: ChangePasswordRequest): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.post<boolean>(this.apiUrl + '/ChangePassword', changePasswordRequest);
    }

    register(registerUserRequest: RegisterRequest): Promise<AxiosResponse<LoginResponse, any>> {
        return axiosInstance.post<LoginResponse>(this.apiUrl + '/Register', registerUserRequest);
    }

    getUserIdByEmail(email: string): Promise<AxiosResponse<number, any>> {
        return axiosInstance.get<number>(this.apiUrl + '/GetUserIdByEmail?email=' + email);
    }
}

export default new UserService();
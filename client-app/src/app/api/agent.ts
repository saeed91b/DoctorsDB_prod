import axios, { AxiosError, AxiosResponse } from 'axios'
import { Doctor } from '../models/doctor';
import { toast } from 'react-toastify';
import { router } from '../router/routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Appointment } from '../models/appointment';
import { PaginatedResult } from '../models/pagination';
import helpers from "../common/helpers/helpers";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await helpers.sleep(1000);

    const pagination = response.headers["pagination"];
    if (pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }

    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors?.hasOwnProperty('id')) {
                router.navigate('not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];

                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }

                throw modalStateErrors.flat();
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        default:
            break;
    }

    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Doctors = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Doctor[]>>('/doctors', {params}).then(responseBody),
    details: (id: string) => requests.get<Doctor>(`/doctors/${id}`),
    updateFavorite: (id: string) => requests.post<void>(`/doctors/${id}/favorite`, {}),
    updateRating: (id: string, score: number) => axios.post<void>(`/doctors/${id}/rate`, {}, { params: { score } }).then(responseBody)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const Appointments = {
    list: () => requests.get<Appointment[]>('/appointments'),
    create: (id: string, dateString: string) => axios.post<void>(`appointments/${id}`, {}, { params: { dateString } }).then(responseBody),
    delete: (id: string) => requests.del<void>(`appointments/${id}`)
}

const agent = { Doctors, Account, Appointments }

export default agent;
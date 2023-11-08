import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/routes";
import { Doctor } from "../models/doctor";
import { Appointment } from "../models/appointment";
import AppointmentStore from "./appointmentStore";

export default class UserStore {
    user: User | null = null;
    private favorites: Doctor[] = [];
    private appointments: Appointment[] | undefined = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get userFavorites() {
        return this.favorites;
    }

    get userAppointments() {
        return this.appointments;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            
            runInAction(() => {
                this.user = user;
                this.favorites = user.favorites;
                this.appointments = store.appointmentStore.userAppointments;
            });

            let selectedDoctor = store.doctorStore.getSelectedDoctor;

            if (!selectedDoctor) {
                await store.doctorStore.reloadDoctors();
                router.navigate('/doctors');
            }
            else {
                store.doctorStore.refreshRegistry();
                store.doctorStore.loadDoctor(selectedDoctor!.id);
            }
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            await store.doctorStore.reloadDoctors();
            store.modalStore.closeModal();
            router.navigate('/doctors');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        router.navigate('/');
        store.commonStore.setToken(null);
        this.user = null;
        store.doctorStore.refreshRegistry();
        store.doctorStore.setSelectedDoctor(undefined);
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
                this.favorites = user.favorites;
                this.appointments = store.appointmentStore.userAppointments;
            });
        } catch (error) {
            console.log(error);
        }
    }
}
import { makeAutoObservable, runInAction } from "mobx";
import { Appointment } from "../models/appointment";
import agent from "../api/agent";
import { store } from "./store";

export default class AppointmentStore {
    private appointments: Appointment[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get allAppointments() {
        return this.appointments;
    }

    get userAppointments() {
        if (store.userStore.isLoggedIn){
            var userAppointments = this.appointments.filter(x => x.username === store.userStore.user!.username);
            return userAppointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
    }

    filterAppointmentTimes = (doctorId: string): Date[] => {
        var dates = store.userStore.isLoggedIn ?
            this.appointments.filter(x => x.doctorId === doctorId || x.username === store.userStore.user!.username).map(x => new Date(x.date))
            : this.appointments.filter(x => x.doctorId === doctorId).map(x => new Date(x.date));
        return dates;
    }

    hasAppointment = (doctorId: string) => {
        if (store.userStore.isLoggedIn) {
            return this.appointments.some(x => x.doctorId === doctorId && x.username === store.userStore.user!.username);
        }

        return false;
    }

    getAppointment = (doctorId: string) => {
        return this.appointments.find(x => x.doctorId === doctorId && x.username === store.userStore.user!.username);
    }

    createAppointment = async (doctorId: string, date: Date) => {
        try {
            if (store.userStore.isLoggedIn) {
                await agent.Appointments.create(doctorId, date.toISOString());

                var newAppointment: Appointment = {
                    doctorId: doctorId,
                    username: store.userStore.user!.username,
                    doctorFirstName: store.doctorStore.getSelectedDoctor!.firstName,
                    doctorLastName: store.doctorStore.getSelectedDoctor!.lastName,
                    date: date
                }

                store.doctorStore.setDoctorAppointment(doctorId, newAppointment);
                runInAction(() => {
                    this.appointments.push(newAppointment);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    cancelAppointment = async (doctorId: string) => {
        try {
            if (store.userStore.isLoggedIn) {
                await agent.Appointments.delete(doctorId);
                store.doctorStore.setDoctorAppointment(doctorId, undefined);

                runInAction(() => {
                    this.appointments = this.appointments.filter(x => !((x.doctorId === doctorId) && (x.username === store.userStore.user!.username)));
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadAppointments = async () => {
        try {
            this.appointments = await agent.Appointments.list();
        } catch (error) {
            console.log(error);
        }
    }

}
import { makeAutoObservable, runInAction } from "mobx";
import { Doctor } from "../models/doctor";
import agent from "../api/agent";
import { store } from "./store";
import helpers from "../common/helpers/helpers";
import appointmentStore from "./appointmentStore";
import { Appointment } from "../models/appointment";
import { Pagination, PaginationParams } from "../models/pagination";


export default class DoctorStore {
    doctorRegistry = new Map<string, Doctor>();
    private selectedDoctor: Doctor | undefined = undefined;
    loadingInitial = false;
    pagination: Pagination | null = null;
    paginationParams = new PaginationParams();
    filterType = "all";
    filterValue = "";
    orderByRating = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getSelectedDoctor() {
        return this.selectedDoctor;
    }

    get favoriteDoctors() {
        const doctors = [...Array.from(this.doctorRegistry.values())];
        const favorites = doctors.filter(x => x.isFavorite === true);
        return favorites;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append("pageNumber", this.paginationParams.pageNumber.toString());
        params.append("pageSize", this.paginationParams.pageSize.toString());

        if (this.filterType !== "all" && this.filterValue !== "") {
            params.append("filterType", this.filterType);
            params.append("filterValue", this.filterValue);
        }

        if (this.orderByRating) {
            params.append("orderByRating", 'true');
        }

        return params;
    }

    loadDoctors = async () => {
        this.setLoadingInitial(true);

        try {
            var result = await agent.Doctors.list(this.axiosParams);
            result.data.forEach(doctor => this.setDoctor(doctor));
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    reloadDoctors = async () => {
        this.paginationParams = new PaginationParams();
        this.doctorRegistry.clear();
        this.loadDoctors();
    }

    setFilterType = (filterType: string) => {
        this.filterType = filterType;

        if (filterType === "all") {
            this.filterValue = "";
            this.reloadDoctors();
        }
    }

    setFilterValue = (filterValue: string) => {
        this.filterValue = filterValue;
        this.reloadDoctors();
    }

    setOrderBy = (value: boolean) => {
        this.orderByRating = value;
        this.reloadDoctors();
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPaginationParams = (params: PaginationParams) => {
        this.paginationParams = params;
    }

    loadDoctor = async (id: string) => {
        let doctor = this.getDoctor(id);

        if (doctor) {
            this.setLoadingInitial(true);
            await helpers.sleep(500);
            this.setSelectedDoctor(doctor);
            this.setLoadingInitial(false);
        }

        else {
            this.setLoadingInitial(true);

            try {
                doctor = await agent.Doctors.details(id);
                doctor = this.setDoctor(doctor);
                this.setSelectedDoctor(doctor);
                this.setLoadingInitial(false);
            }
            catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getDoctor = (id: string) => {
        return this.doctorRegistry.get(id);
    }

    setDoctor = (doctor: Doctor) => {
        doctor.currentRating = 0;

        if (store.userStore.isLoggedIn) {
            const user = store.userStore.user;
            doctor.isFavorite = user!.favorites.some(x => x.id === doctor.id);

            if (doctor.ratings.some(x => x.userName == user!.username)) {
                doctor.currentRating = doctor.ratings.find(x => x.userName == user!.username)!.score;
            }

            if (store.appointmentStore.hasAppointment(doctor.id)) {
                doctor.appointment = store.appointmentStore.getAppointment(doctor.id);
            }
        }

        this.doctorRegistry.set(doctor.id, doctor);
        return doctor;
    }

    refreshRegistry = () => {
        this.setLoadingInitial(true);
        this.doctorRegistry.forEach((doctor, id) => this.setDoctor(doctor));
        this.setLoadingInitial(false);
    }

    setDoctorAppointment = (id: string, appointment: Appointment | undefined) => {
        let doctor = this.getDoctor(id);

        if (doctor) {
            doctor.appointment = appointment;
            this.doctorRegistry.set(doctor.id, doctor);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setSelectedDoctor = (doctor: Doctor | undefined) => {
        this.selectedDoctor = doctor;
    }

    updateFavorite = async (doctor: Doctor) => {
        try {
            if (store.userStore.isLoggedIn) {
                await agent.Doctors.updateFavorite(doctor.id);
                doctor = this.toggleFavorite(doctor);
            }
        } catch (error) {
            console.log(error);
        }
    }

    toggleFavorite = (doctor: Doctor) => {
        const user = store.userStore.user;

        if (doctor.isFavorite) {
            doctor.numberOfFavorites -= 1;
        }
        else {
            doctor.numberOfFavorites += 1;
        }

        doctor.isFavorite = !doctor.isFavorite;
        this.doctorRegistry.set(doctor.id, doctor);
        return doctor;
    }

    updateRating = async (doctor: Doctor, score: number) => {
        if (store.userStore.isLoggedIn && doctor.currentRating != score) {
            try {
                const user = store.userStore.user;
                await agent.Doctors.updateRating(doctor.id, score);

                if (doctor.currentRating === 0) {
                    doctor.ratings.push({ userName: user!.username, score: score });
                }

                else doctor.ratings.find(x => x.userName === user!.username)!.score = score;

                runInAction(() => {
                    doctor.currentRating = score;
                    doctor.averageRating = helpers.computeAverageRating(doctor.ratings);
                })

                this.doctorRegistry.set(doctor.id, doctor);
            } catch (error) {
                console.log(error);
            }
        }
    }

}
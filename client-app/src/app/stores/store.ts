
import { createContext, useContext } from "react";
import DoctorStore from "./doctorStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import AppointmentStore from "./appointmentStore";
import CommentStore from "./commentStore";

interface Store {
    doctorStore: DoctorStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    appointmentStore: AppointmentStore,
    commentStore: CommentStore
}

export const store: Store = {
    doctorStore: new DoctorStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    appointmentStore: new AppointmentStore(),
    commentStore: new CommentStore()
}

export const StoreContext =  createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
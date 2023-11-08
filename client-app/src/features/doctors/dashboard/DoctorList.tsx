import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import DoctorListItem from "./DoctorListItem";
import { Fragment } from "react";
import { Doctor } from "../../../app/models/doctor";
import helpers from "../../../app/common/helpers/helpers";


function DoctorList() {
    const { doctorStore: { doctorRegistry } } = useStore();

    return (
        <>
            {Array.from(doctorRegistry.values()).map(doctor => (
                <DoctorListItem key={doctor.id} doctor={doctor} />
            ))
            }
        </>
    );
}

export default observer(DoctorList);
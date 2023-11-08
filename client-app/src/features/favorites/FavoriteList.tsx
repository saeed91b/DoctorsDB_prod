import { observer } from "mobx-react-lite";
import { Doctor } from "../../app/models/doctor";
import DoctorListItem from "../doctors/dashboard/DoctorListItem";
import helpers from "../../app/common/helpers/helpers";

interface Props {
    favorites: Doctor[];
}

function DoctorList({favorites}: Props ) {

    return (
        <>
            {helpers.doctorsByName(favorites).map(doctor => (
                <DoctorListItem key={doctor.id} doctor={doctor} />
            ))
            }
        </>
    );
}

export default observer(DoctorList);
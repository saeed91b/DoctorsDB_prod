import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DoctorDetailedHeader from "./DoctorDetailedHeader";
import DoctorDetailedDescription from "./DoctorDetailedDescription";
import DoctorDetailedComments from "./DoctorDetailedComments";
import DoctorDetailedSidebar from "./DoctorDetailedSidebar";

function DoctorDetails() {
    const { doctorStore } = useStore();
    const { getSelectedDoctor: doctor, loadDoctor, loadingInitial } = doctorStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadDoctor(id);
    }, [id, loadDoctor])

    if (loadingInitial || !doctor) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width='10'>
                <DoctorDetailedHeader doctor={doctor} />
                <DoctorDetailedDescription doctor={doctor} />
                <DoctorDetailedComments doctorId={doctor.id}/>
            </Grid.Column>
            <Grid.Column width='6'>
                <DoctorDetailedSidebar />
            </Grid.Column>
        </Grid>

    );
}

export default observer(DoctorDetails);
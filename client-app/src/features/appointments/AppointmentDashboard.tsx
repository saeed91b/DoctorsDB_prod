import { Grid, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import AppointmentListItem from "./AppointmentListItem";
import LoadingComponent from "../../app/layout/LoadingComponent";

function FavoritesPage() {
    const { userStore: { getUser, userAppointments} } = useStore();
    const [loadingInitial, setLoadingInitial] = useState(false);

    useEffect(() => {
        setLoadingInitial(true);
        getUser().finally(() => setLoadingInitial(false));
    }, [getUser]);

    if (loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Grid>
            <Grid.Column width='12'>
                {(userAppointments!.length === 0) ? (<h1>You don't have any appointments.</h1>) : (
                    <>
                        <Header as='h2' dividing content='Your Appointments:' />
                        {userAppointments!.map(appointment => (<AppointmentListItem key={appointment.doctorId} appointment={appointment} />))}
                    </>
                )
                }
            </Grid.Column>
        </Grid>
    )

}

export default observer(FavoritesPage);
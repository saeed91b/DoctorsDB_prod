import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";

interface Props {
    doctor: Doctor;
}

function DoctorDetailedDescription({ doctor }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='olive' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{doctor.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    );
}

export default observer(DoctorDetailedDescription)
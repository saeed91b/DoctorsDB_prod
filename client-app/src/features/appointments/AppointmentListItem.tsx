import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonProps, Icon, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Appointment } from "../../app/models/appointment";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";
import { toast } from "react-toastify";

interface Props {
    appointment: Appointment;
}

function AppointmentListItem({ appointment }: Props) {
    const {appointmentStore: {cancelAppointment}} = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        setIsSubmitting(true);
        cancelAppointment(appointment.doctorId).then(() => {
            toast.success("Appointment canceled successfully!")
            setIsSubmitting(false);
        })
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={appointment.doctorId}>
                        <Item.Image size='tiny' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/doctors/${appointment.doctorId}`}>Dr. {appointment.doctorFirstName} {appointment.doctorLastName}</Item.Header>
                            <Item.Description>
                                <div> <Icon name='clock' color='olive' /> {format(new Date(appointment.date), "MMM d, yyyy h:mm aa")}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' onClick={handleCancel} loading={isSubmitting}  content='Cancel' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}

export default observer(AppointmentListItem);
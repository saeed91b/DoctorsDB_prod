import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { observer } from "mobx-react-lite";

interface Props {
    doctor: Doctor;
}

function DoctorListItem({ doctor }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={doctor.id}>
                        <Item.Image size='tiny' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/doctors/${doctor.id}`}>Dr. {doctor.firstName} {doctor.lastName}</Item.Header>
                            <Item.Description>
                                <div> <Icon name='marker' color='olive' /> {doctor.city}, {doctor.address}</div>
                                <div> <Icon name='phone' color='olive' /> {doctor.phone}</div>
                                <div> <Icon name='heart' color='red' /> {doctor.numberOfFavorites}</div>
                                <div> <Icon name='star' color='yellow' /> {(doctor.averageRating === 0) ? '-' : doctor.averageRating.toFixed(1)}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' as={Link} to={`/doctors/${doctor.id}`} content='View' color='green' />
                                <Label basic content={doctor.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}

export default observer(DoctorListItem);
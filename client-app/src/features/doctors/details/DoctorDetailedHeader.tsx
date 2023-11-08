import { Button, Grid, Icon, Item, Label, Rating, RatingProps, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import { toast } from "react-toastify";

interface Props {
    doctor: Doctor;
}

function DoctorDetailedHeader({ doctor }: Props) {
    const { doctorStore: { updateFavorite, updateRating }, userStore: { isLoggedIn }, modalStore: { openModal } } = useStore();
    
    const handleRating = async (e: any, {rating}: RatingProps) => {
        if (isLoggedIn) await updateRating(doctor, rating! as number).then(() => toast.success("Rating submitted!"));
        else openModal(<LoginForm />);
    }

    const handleClick = async () => {
        if (isLoggedIn) await updateFavorite(doctor).then(() => {
            if (doctor.isFavorite) toast.success("Added to favorites!")
            else toast.success("Removed from favorites!")
        } );
        else openModal(<LoginForm />);
    }

    return (
        <Segment.Group>
            <Segment basic attached='top'>
                <Item.Group>
                    <Item key={doctor.id}>
                        <Item.Image size='small' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header >{doctor.firstName} {doctor.lastName}</Item.Header>
                            <Item.Description>
                                <Label basic content={doctor.category} />
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='olive' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{doctor.city}, {doctor.address}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='phone' size='large' color='olive' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{doctor.phone}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment basic clearing attached='bottom'>
                <Grid verticalAlign="middle">
                    <Grid.Column width={5}>
                        <Button floated="left" as='div' labelPosition='right'>
                            <Button toggle className="activeButton" active={isLoggedIn && doctor.isFavorite} onClick={handleClick}>
                                <Icon name='heart' />
                                Favorite
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>
                                {doctor.numberOfFavorites}
                            </Label>
                        </Button>
                    </Grid.Column>
                    <Grid.Column floated="left" width={3}>
                        <Item>
                            <Item.Content verticalAlign="middle">
                                <Icon size="large" name='favorite' color="yellow" />
                                {(doctor.averageRating === 0) ? '-' : doctor.averageRating.toFixed(1)}
                            </Item.Content>
                        </Item>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Rating icon='star' size='large' rating={doctor.currentRating}  onRate={handleRating} maxRating={5}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button color='red' floated='right' as={Link} to={`/doctors/`}>Cancel</Button>
                    </Grid.Column>

                </Grid>

            </Segment>
        </Segment.Group>
    );
}

export default observer(DoctorDetailedHeader);
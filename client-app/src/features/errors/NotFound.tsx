import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound () {
return (
    <Segment placeholder>
        <Header icon>
            <Icon name='warning' />
            Woops we couldn't find what you're looking for!
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/doctors'>
                Return to the Doctors page
            </Button>
        </Segment.Inline>
    </Segment>
)
}
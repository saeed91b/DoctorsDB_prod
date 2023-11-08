import React, { Fragment } from 'react';
import { Segment, Button, Placeholder } from 'semantic-ui-react';

export default function DoctorListItemPlaceholder() {
    return (
            <Placeholder fluid style={{ marginTop: 25 }}>
                    <Segment clearing style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                        <Button disabled color='blue' floated='right' content='View' />
                    </Segment>
            </Placeholder>
    );
};
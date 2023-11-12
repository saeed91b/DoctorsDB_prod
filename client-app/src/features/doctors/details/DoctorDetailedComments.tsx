import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Segment, Comment, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import MyTextArea from "../../../app/common/form/MyTextArea";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";

interface Props {
    doctorId: string
}

function DoctorDetailedComments({ doctorId }: Props) {
    const { commentStore, userStore } = useStore();

    useEffect(() => {
        if (doctorId && userStore.isLoggedIn) {
            commentStore.createHubConnection(doctorId);

        }

        return () => commentStore.clearComments();
    }, [commentStore, doctorId, userStore.isLoggedIn]);

    return (
        <>
            <Segment textAlign='center' attached='top' inverted color='violet' style={{ border: 'none' }}>
                <Header>{userStore.isLoggedIn ? "Comments" : "Login to view or add comments"}</Header>
            </Segment>

            {userStore.isLoggedIn &&
                (<Segment attached clearing>
                    <Formik onSubmit={(values, { resetForm }) => { commentStore.addComment(values).then(() => resetForm()) }}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({ body: Yup.string().required() })}>
                        {({ isSubmitting, isValid }) => (
                            <Form className="ui form">
                                <MyTextArea placeholder="Add comment" name='body' rows={2} />
                                <Button loading={isSubmitting} disabled={isSubmitting || !isValid} floated="right" type="submit"
                                    content='Submit' labelPosition='left' icon='edit'  color="green" />
                            </Form>
                        )}
                    </Formik>
                    <Divider horizontal/>
                        <Comment.Group>
                            {commentStore.comments.map(comment => (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src='/assets/user.png' />
                                    <Comment.Content>
                                        <Comment.Author>{comment.displayName}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{formatDistanceToNow(comment.createdAt)}</div>
                                        </Comment.Metadata>
                                        <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            ))}
                        </Comment.Group>

                </Segment>)}
        </>
    );
}

export default observer(DoctorDetailedComments);
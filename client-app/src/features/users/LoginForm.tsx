import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Container, Divider, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import RegisterForm from "./RegisterForm";

function LoginForm() {
    const { userStore, modalStore } = useStore();

    function handleNoAccount() {
        modalStore.closeModal();
        modalStore.openModal(<RegisterForm />);
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password!' }))}>

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login to DoctorsDB!' color='olive' textAlign="center" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                    <Divider horizontal />
                    <Container textAlign="center">
                        <p>Don't have an account?</p>
                        <Button basic color='blue' content="Register" onClick={handleNoAccount} />
                    </Container>
                </Form>
            )}

        </Formik>
    )
}

export default observer(LoginForm);
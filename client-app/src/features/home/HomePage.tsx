import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted vertical textAlign="center" className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 15 }} />
                    DoctorsDB
                </Header>
                <Divider style={{ marginBottom: 35 }} inverted horizontal></Divider>
                <>
                
                    <Header style={{ marginTop: 25 }} as='h2' inverted content='Welcome to DoctorsDB!' />
                    <Button basic as={Link} to='/doctors' size='huge' style={{ marginTop: 25 }}>
                        View doctors
                    </Button>
                </>
                
                {!userStore.isLoggedIn &&
                    <>
                        <p style={{marginTop: 100}}>hint: you can use a fake email to register (e.g. [name]@test.com)</p>
                        <Button onClick={() => { modalStore.openModal(<LoginForm />) }} size='huge' style={{ marginTop: 40 }}>
                            Login
                        </Button>
                        <Button onClick={() => { modalStore.openModal(<RegisterForm />) }} size='huge' style={{ marginTop: 40, marginLeft: 20 }}>
                            Register
                        </Button>
                    </>
                }
                {/* <Divider style={{marginTop: 100}} inverted horizontal></Divider> */}
                <p style={{marginTop: 200}}>Developed by Saeed Basirian</p>
                <p>Image by pngtree.com</p>
            </Container>
        </Segment>
    );
}
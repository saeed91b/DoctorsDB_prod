import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';

function NavBar() {
    const { userStore: { user, logout, isLoggedIn }, modalStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header fixed='left'>
                    <img src='assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    DoctorsDB
                </Menu.Item>
                <Menu.Item as={NavLink} to='/doctors' name='Doctors' />
                {!isLoggedIn && <Menu.Item onClick={() => { modalStore.openModal(<LoginForm />) }} name='Login' />}
                {!isLoggedIn && <Menu.Item onClick={() => { modalStore.openModal(<RegisterForm />) }} name='Register' />}
                {isLoggedIn &&
                    <>
                        <Menu.Item position='right'>
                            <Image src={'/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`favorites/${user?.username}`} text='Favorites' icon='heart' />
                                    <Dropdown.Item as={Link} to={`appointments/${user?.username}`} text='Appointments' icon='calendar outline' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                }
            </Container>
        </Menu>
    );
}

export default observer(NavBar);
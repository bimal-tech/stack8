import { useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"

export const HomeMenu = (props) => {
    let is_logged_in = localStorage.getItem('stack_8_token') ? true : false;
    let user = JSON.parse(localStorage.getItem('stack_8_user')) ?? null;
    let [q, setQ] = useState();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/about">About Us</NavLink>
                    <NavLink className="nav-link" to="/contact-us">Contact Us</NavLink>
                    <NavLink className="nav-link" to="/category">Category List</NavLink>
                    <NavLink className="nav-link" to="/category/smart-phones">Smartphones</NavLink>
                    {
                        (is_logged_in && user) ? 
                        <LoggedInComp user={user}/>
                        :
                        <AuthCompo />
                    }
                    
                </Nav>
                <Form action="/search">
                    <Form.Control 
                    type="search" 
                    name="q" 
                    size="sm" 
                    placeholder="Enter Search keyword"
                    ></Form.Control>
                </Form>
            </Container>
        </Navbar>
    )
}

const AuthCompo = () => {
    return (<>
        <NavLink className="nav-link" to="/register">Register</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
    </>)
}

const LoggedInComp = ({user}) => {
    let navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('stack_8_user');
        localStorage.removeItem('stack_8_token');
        navigate('/login');
    }
    return (<>
        <NavLink className="nav-link" to={`/${user.role}`}>{user.name}</NavLink>
        <a href="" className="nav-link" onClick={logout}>Logout</a>
    </>)
}
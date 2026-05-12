import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

const Navigation = () => {
    return (
        <Navbar expand="lg" className="navbar-custom" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Logo Anáhuac Mayab" width="auto" height="30" className="d-inline-block align-text-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link href="/#rutina">Obtener rutina</Nav.Link>
                        <Nav.Link href="/#suplementos">Adicionales</Nav.Link>
                        <Nav.Link href="/#contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;

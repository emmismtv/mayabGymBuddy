import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <p className="mb-0">&copy; {new Date().getFullYear()} Anáhuac Mayab Gym Buddy</p>
                <p>Emmanuel Martínez - Programación para Internet</p>
            </Container>
        </footer>
    );
};

export default Footer;

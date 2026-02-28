import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Hero = () => {
    const scrollToRutina = () => {
        const section = document.getElementById('rutina');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-section">
            <Container>
                <h1 className="hero-title animate__animated animate__fadeInDown">Obtén el mejor rendimiento</h1>
                <p className="lead mb-4 animate__animated animate__fadeInUp">
                    Tu rutina personalizada, descuento en nuestra tienda de suplementos y mucho más.
                </p>
                <Button
                    size="lg"
                    className="btn-primary-custom px-5 py-3 rounded-pill shadow"
                    onClick={scrollToRutina}
                >
                    ¡Comienza Ahora!
                </Button>
            </Container>
        </section>
    );
};

export default Hero;

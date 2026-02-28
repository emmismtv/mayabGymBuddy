import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Contact = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
            form.reset();
            setValidated(false);
            return;
        }
        setValidated(true);
    };

    return (
        <section id="contacto" className="section-padding bg-light">
            <Container>
                <h2 className="section-title">Obtner Rutina Personalizada</h2>
                <p className="lead mb-4 text-center">
                    Ingresa tus datos para recibir tu rutina personalizada y uno de nuestros entrenadores se pondrá en contacto contigo.
                </p>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="bg-white p-5 rounded shadow-sm">
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Escribe tu nombre"
                                        minLength={3}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingresa un nombre.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Correo de la Anáhuac</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="nombre@anahuac.mx"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor provee un correo electrónico válido.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={4}
                                        placeholder="Déjanos tus dudas o comentarios..."
                                        minLength={10}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El mensaje debe contener al menos 10 caracteres.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" className="btn-primary-custom py-2">
                                        Obtener Rutina
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;

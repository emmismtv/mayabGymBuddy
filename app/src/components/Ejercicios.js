import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button } from 'react-bootstrap';
import sampleData from '../sampleExerciseData.json';

const Gallery = () => {
    const [exercises, setExercises] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        const fetchExercises = () => {
            const data = sampleData.slice(0, 6);
            setExercises(data);
        };
        fetchExercises();
    }, []);

    const handleShow = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedExercise(null);
    };

    return (
        <section id="rutina" className="section-padding bg-light">
            <Container>
                <h2 className="section-title">Tu rutina personalizada</h2>
                <p className="lead mb-4 text-center">
                    Aquí encontrarás una rutina personalizada para obtener el mejor rendimiento en tus entrenamientos.
                </p>
                <div className="bg-white p-4 rounded shadow-sm">
                    <Carousel variant="dark" indicators={false}>
                        {exercises.map((exercise) => {
                            let gifSrc;
                            try {
                                gifSrc = require(`../ejercicios_gif/${exercise.id}.gif`);
                            } catch (err) {
                                gifSrc = 'https://via.placeholder.com/400x400.png?text=No+Preview';
                            }

                            return (
                                <Carousel.Item key={exercise.id}>
                                    <Row className="align-items-center justify-content-center p-3 p-md-5">
                                        <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
                                            <img
                                                className="img-fluid rounded shadow-sm custom-carousel-img"
                                                src={gifSrc}
                                                alt={exercise.name}
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h3 className="exercise-title mb-3">{exercise.name}</h3>
                                            <p className="text-muted text-capitalize mb-3">
                                                <strong>Músculo Objetivo:</strong> {exercise.target}
                                            </p>
                                            <div className="exercise-instructions">
                                                <Button
                                                    className="mt-2 btn-primary-custom-ejercicios"
                                                    onClick={() => handleShow(exercise)} >
                                                    Ver indicaciones
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </div>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered size="lg">
                {selectedExercise && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="exercise-title text-capitalize">
                                {selectedExercise.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                            <img
                                className="img-fluid rounded mb-4"
                                src={(() => {
                                    try {
                                        return require(`../ejercicios_gif/${selectedExercise.id}.gif`);
                                    } catch (err) {
                                        return 'https://via.placeholder.com/400x400.png?text=No+Preview';
                                    }
                                })()}
                                alt={selectedExercise.name}
                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                            />
                            <div className="text-start">
                                <h5 className="text-muted text-capitalize mb-3">
                                    <strong>Músculo Objetivo:</strong> {selectedExercise.target}
                                </h5>
                                <strong>Instrucciones:</strong>
                                <ol className="mt-2 pl-3">
                                    {selectedExercise.instructions && selectedExercise.instructions.map((step, index) => (
                                        <li key={index} className="mb-2 text-muted">{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </section>
    );
};

export default Gallery;

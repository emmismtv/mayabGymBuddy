import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import creatina from '../img/adicionales/creatina.png';
import proteina from '../img/adicionales/proteina.png';
import nutricion from '../img/adicionales/nutricion.webp';

const Adicionales = () => {
    return (
        <section id="suplementos" className="section-padding">
            <Container>
                <h2 className="section-title">Adicionales para tu rutina</h2>
                <p className="lead mb-4 text-center">
                    Complementa tu rutina con estos suplementos recomendados y obten la recomendación de un nutriólogo.
                </p>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="card-custom border-0 shadow-sm h-100 p-4" style={{ backgroundColor: '#fff8f3' }}>
                            <img src={proteina} alt="Proteina Whey" width="150" height="auto" class="d-inline-block mx-auto" />
                            <Card.Body>
                                <Card.Title className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Proteína de Vainilla</Card.Title>
                                <Card.Text>
                                    La proteína Whey sabor vainilla es un clásico indispensable. Ofrece una rápida absorción, ideal para tomar justo después de tus entrenamientos en el gimnasio de la universidad.
                                </Card.Text>
                                <ul className="text-muted">
                                    <li>Ayuda a la recuperación muscular.</li>
                                    <li>Sabor versátil para smoothies y avena.</li>
                                    <li>Alto valor biológico y perfil completo de aminoácidos.</li>
                                </ul>
                                <a href="https://www.amazon.com.mx/Optimum-Nutrition-Proteína-Standard-Vainilla/dp/B000GISTZ4/ref=asc_df_B000GISTZ4?mcid=379d661536f734a596d96f98f00d33f0&tag=gledskshopmx-20&linkCode=df0&hvadid=709881437427&hvpos=&hvnetw=g&hvrand=13651316817323429333&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9141788&hvtargid=pla-351573489566&psc=1&language=es_MX&gad_source=1"><Button className="mt-2 btn-primary-custom-ejercicios">
                                    Comprar en Amazon
                                </Button></a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="card-custom border-0 shadow-sm h-100 p-4" style={{ backgroundColor: '#f4faff' }}>
                            <img src={creatina} alt="Creatina Birdman" width="150" height="auto" class="d-inline-block mx-auto" />
                            <Card.Body>
                                <Card.Title className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Creatina Monohidratada</Card.Title>
                                <Card.Text>
                                    El suplemento con mayor respaldo científico disponible. Te ayudará a obtener esa fuerza y energía explosiva necesaria para romper tus récords personales.
                                </Card.Text>
                                <ul className="text-muted">
                                    <li>Aumenta la fuerza y el rendimiento físico.</li>
                                    <li>Mejora la hidratación celular.</li>
                                    <li>Consumo diario de 3g a 5g para mejores resultados.</li>
                                </ul>
                                <a href="https://www.amazon.com.mx/Birdman-Creatina-Creapure-Monohidratada-Servicios/dp/B089ZWVJ2K/ref=asc_df_B089ZWVJ2K?mcid=9eec976d73243214a00e7d03af968bee&tag=gledskshopmx-20&linkCode=df0&hvadid=709847167833&hvpos=&hvnetw=g&hvrand=5330757439502312759&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9141788&hvtargid=pla-920563800467&psc=1&language=es_MX&gad_source=1"><Button className="mt-2 btn-primary-custom-ejercicios">
                                    Comprar en Amazon
                                </Button></a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="card-custom border-0 shadow-sm h-100 p-4" style={{ backgroundColor: '#e6f5ec' }}>
                            <img src={nutricion} alt="Creatina Birdman" width="270" height="auto" class="d-inline-block mx-auto" />
                            <Card.Body>
                                <Card.Title className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Servicios de Salud</Card.Title>
                                <Card.Text>
                                    En Anahuac Mayab ofrecemos servicios de salud para que puedas obtener los mejores resultados en tus entrenamientos.
                                </Card.Text>
                                <ul className="text-muted">
                                    <li>Consultas médicas.</li>
                                    <li>Suplementación personalizada.</li>
                                    <li>Programación de entrenamientos.</li>
                                </ul>
                                <a href="https://merida.anahuac.mx/clinica/"><Button className="mt-2 btn-primary-custom-ejercicios">
                                    Agendar mi cita
                                </Button></a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Adicionales;

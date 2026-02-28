import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Ejercicios from './components/Ejercicios';
import Adicionales from './components/Adicionales';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Ejercicios />
      <Adicionales />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

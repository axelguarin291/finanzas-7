// src/components/Header.jsx
import React from 'react';

export default function Header() {
  const styles = {
    header: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    titulo: {
      fontSize: '1.8rem',
      margin: 0,
    },
    subtitulo: {
      marginTop: '5px',
      fontSize: '0.95rem',
      opacity: 0.9,
    },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.titulo}>💰 Finanzas Personales</h1>
      <p style={styles.subtitulo}>Gestiona tus ingresos y gastos fácilmente</p>
    </header>
  );
}

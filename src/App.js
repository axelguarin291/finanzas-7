import React, { useState, useEffect } from 'react';
import ChartComponent from './components/ChartComponent';

function App() {
  const [transacciones, setTransacciones] = useState(() => {
    const guardadas = localStorage.getItem('transacciones');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
  }, [transacciones]);

  const agregarTransaccion = () => {
    const valor = parseFloat(monto);
    if (!valor || valor <= 0) return alert('Monto inválido');

    const nueva = {
      id: Date.now(),
      monto: valor,
      tipo,
      descripcion: descripcion || 'Sin descripción',
      fecha: new Date().toLocaleDateString(),
    };

    setTransacciones([nueva, ...transacciones]);
    setMonto('');
    setDescripcion('');
  };

  const eliminarTransaccion = (id) => {
    setTransacciones(transacciones.filter(t => t.id !== id));
  };

  const totalIngresos = transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((a, b) => a + b.monto, 0);

  const totalGastos = transacciones
    .filter(t => t.tipo === 'gasto')
    .reduce((a, b) => a + b.monto, 0);

  const balance = totalIngresos - totalGastos;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>💰 Finanzas Personales</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="number"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          placeholder="Monto"
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripción"
          style={{ marginRight: 10 }}
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ marginRight: 10 }}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <button onClick={agregarTransaccion}>Agregar</button>
      </div>

      <hr />

      <h2>Total Ingresos: ${totalIngresos.toFixed(2)}</h2>
      <h2>Total Gastos: ${totalGastos.toFixed(2)}</h2>
      <h2 style={{ color: balance < 0 ? 'red' : 'green' }}>Balance: ${balance.toFixed(2)}</h2>

      <ChartComponent ingresos={totalIngresos} gastos={totalGastos} />

      <hr />
      <h3>🧾 Transacciones</h3>
      {transacciones.length === 0 ? (
        <p>No hay transacciones todavía.</p>
      ) : (
        <ul>
          {transacciones.map(t => (
            <li key={t.id}>
              [{t.fecha}] <strong>{t.tipo === 'ingreso' ? '+' : '-'}</strong> ${t.monto.toFixed(2)} - {t.descripcion}
              <button
                onClick={() => eliminarTransaccion(t.id)}
                style={{ marginLeft: 10, color: 'red' }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar.jsx';
import './App.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [transacciones, setTransacciones] = useState(() => {
    const guardadas = localStorage.getItem('transacciones');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [descripcion, setDescripcion] = useState('');
  const [vistaActual, setVistaActual] = useState('inicio');

  // ✅ Restaurar la vista guardada al iniciar
  useEffect(() => {
    const vistaGuardada = localStorage.getItem('vistaActual');
    if (vistaGuardada) {
      setVistaActual(vistaGuardada);
    }
  }, []);

  // ✅ Guardar vista actual cada vez que cambia
  useEffect(() => {
    localStorage.setItem('vistaActual', vistaActual);
  }, [vistaActual]);

  // ✅ Guardar transacciones
  useEffect(() => {
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
  }, [transacciones]);

  const agregarTransaccion = () => {
    const valor = parseFloat(monto);
    if (!valor || valor <= 0 || descripcion.trim() === '') {
      return alert('Monto o descripción inválido');
    }

    setTransacciones([
      ...transacciones,
      { monto: valor, tipo, descripcion, fecha: new Date().toLocaleString() },
    ]);
    setMonto('');
    setDescripcion('');
  };

  const eliminarTransaccion = (index) => {
    const nuevas = [...transacciones];
    nuevas.splice(index, 1);
    setTransacciones(nuevas);
  };

  // ✅ Exportar a CSV
  const exportarCSV = () => {
    if (transacciones.length === 0) {
      alert('No hay transacciones para exportar');
      return;
    }

    const encabezado = 'Fecha,Tipo,Monto,Descripción\n';
    const filas = transacciones
      .map(t => `${t.fecha},${t.tipo},${t.monto},${t.descripcion}`)
      .join('\n');

    const csvContent = encabezado + filas;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transacciones.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalIngresos = transacciones
    .filter((t) => t.tipo === 'ingreso')
    .reduce((acc, t) => acc + t.monto, 0);

  const totalGastos = transacciones
    .filter((t) => t.tipo === 'gasto')
    .reduce((acc, t) => acc + t.monto, 0);

  const balance = totalIngresos - totalGastos;

  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [totalIngresos, totalGastos],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <Sidebar 
          onChangeView={setVistaActual} 
          vistaActual={vistaActual} 
        />
        <main className="main-content">
          {vistaActual === 'inicio' && (
            <>
              <div className="formulario">
                <input
                  type="number"
                  placeholder="Monto"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>
                <button onClick={agregarTransaccion}>Agregar</button>
              </div>

              <h2>Total Ingresos: ${totalIngresos.toFixed(2)}</h2>
              <h2>Total Gastos: ${totalGastos.toFixed(2)}</h2>
              <h2 style={{ color: balance < 0 ? 'red' : 'green' }}>
                Balance: ${balance.toFixed(2)}
              </h2>

              <Pie data={data} />
            </>
          )}

          {vistaActual === 'transacciones' && (
            <div>
              <h2>🔁 Transacciones Registradas</h2>
              <button 
                onClick={exportarCSV} 
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                📥 Exportar CSV
              </button>
              <ul>
                {transacciones.map((t, index) => (
                  <li key={index}>
                    {t.fecha} - {t.tipo.toUpperCase()}: ${t.monto} ({t.descripcion})
                    <button
                      style={{
                        marginLeft: '10px',
                        color: 'red',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={() => eliminarTransaccion(index)}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vistaActual === 'estadisticas' && (
            <div>
              <h2>📊 Estadísticas</h2>
              <Pie data={data} />
            </div>
          )}

          {vistaActual === 'configuracion' && (
            <div>
              <h2>⚙️ Configuración</h2>
              <p>Aquí podrás ajustar preferencias futuras.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;


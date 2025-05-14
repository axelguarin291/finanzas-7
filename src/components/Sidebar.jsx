// src/components/Sidebar.jsx
import React from 'react';
import {
  Home,
  ListOrdered,
  PieChart,
  Settings
} from 'lucide-react';

export default function Sidebar({ onChangeView, vistaActual }) {
  const secciones = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={18} /> },
    { id: 'transacciones', label: 'Transacciones', icon: <ListOrdered size={18} /> },
    { id: 'estadisticas', label: 'Estadísticas', icon: <PieChart size={18} /> },
    { id: 'configuracion', label: 'Configuración', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="sidebar">
      {secciones.map((seccion) => (
        <button
          key={seccion.id}
          className={vistaActual === seccion.id ? 'activo' : ''}
          onClick={() => onChangeView(seccion.id)}
          aria-pressed={vistaActual === seccion.id}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {seccion.icon}
            {seccion.label}
          </span>
        </button>
      ))}
    </aside>
  );
}

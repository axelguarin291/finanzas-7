import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ ingresos, gastos }) {
  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        label: 'Distribución',
        data: [ingresos, gastos],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={data} />
    </div>
  );
}

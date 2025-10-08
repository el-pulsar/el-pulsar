'use client';

import { useEffect, useState } from 'react';

// Simple formateo de fecha
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  try {
    return new Intl.DateTimeFormat('es-ES', options)
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());
  } catch (e) {
    return date.toLocaleDateString('es-ES', options);
  }
};

// Simple formateo de hora
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export default function Clock() {
  const [date, setDate] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // Configuración inicial cuando el componente se monta
  useEffect(() => {
    setMounted(true);
    
    // Obtener la zona horaria del navegador
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (e) {
      console.error('Error al obtener la zona horaria:', e);
      setTimezone('UTC');
    }
    
    // Actualizar la hora cada segundo
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);

  // No renderizar nada en el servidor
  if (!mounted) {
    return (
      <div className="clock-container">
        <span className="clock-label">Fecha Actual</span>
        <div id="reloj" style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'var(--gray-900)',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '1rem',
          borderRadius: '0.5rem',
          margin: '0.5rem 0',
          minWidth: '300px',
          display: 'inline-block',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="clock-container">
      <span className="clock-label">Fecha Actual</span>
      <div id="reloj" style={{
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--gray-900)',
        background: 'rgba(255, 255, 255, 0.7)',
        padding: '1rem',
        borderRadius: '0.5rem',
        margin: '0.5rem 0',
        minWidth: '300px',
        display: 'inline-block',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        {formatDate(date)}
      </div>
      
      <span className="clock-label" style={{ marginTop: '1rem', display: 'block' }}>Hora Actual</span>
      <div id="hora" style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--primary)',
        margin: '0.5rem 0',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '1px'
      }}>
        {formatTime(date)}
      </div>
      
      <span className="clock-label" style={{ marginTop: '1rem', display: 'block' }}>Zona Horaria</span>
      <div style={{
        marginTop: '0.5rem',
        color: 'var(--gray-600)',
        fontSize: '0.9rem',
        fontFamily: 'monospace',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        display: 'inline-block'
      }}>
        {timezone || 'Cargando zona horaria...'}
      </div>
    </div>
  );
}

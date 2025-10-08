'use client';

import { useEffect, useState } from 'react';

const formatDate = (date: Date, timezone: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone
    };
    const dateStr = new Intl.DateTimeFormat('es-ES', options).format(date);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return 'Error al cargar la fecha';
  }
};

const formatTime = (date: Date, timezone: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezone
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  } catch (error) {
    console.error('Error al formatear la hora:', error);
    return '--:--:--';
  }
};

export default function Clock() {
  const [time, setTime] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>('');

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Set timezone
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
    } catch (error) {
      console.error('Error al detectar la zona horaria:', error);
      setTimezone('UTC');
    }

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up
    return () => clearInterval(timer);
  }, []);

  // Don't render anything on the server
  if (typeof window === 'undefined') {
    return null;
  }

  const formattedDate = formatDate(time, timezone);
  const formattedTime = formatTime(time, timezone);

  return (
    <div className="clock-container">
      <span className="clock-label">Fecha Actual</span>
      <div id="reloj" style={{
        fontSize: '1.25rem',
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
        {formattedDate}
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
        {formattedTime}
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

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
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState<string>('');

  // Set client-side flag and initial time
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
    } catch (error) {
      console.error('Error al detectar la zona horaria:', error);
      setTimezone('UTC');
    }
  }, []);

  // Update time every second
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  // Don't render anything during SSR or before client-side hydration
  if (!isClient || !currentTime) {
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
          Cargando fecha...
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
          --:--:--
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

  const formattedDate = formatDate(currentTime, timezone);
  const formattedTime = formatTime(currentTime, timezone);

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
        {timezone}
      </div>
    </div>
  );
}

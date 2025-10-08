import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaRocket, FaCalendarAlt } from 'react-icons/fa';
import DocumentationButton from '../components/DocumentationButton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Inter } from 'next/font/google';

// Configurar la fuente Inter
const inter = Inter({ subsets: ['latin'] });

// Estilos CSS en el componente
const styles = `
  :root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --secondary: #7c3aed;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: var(--gray-800);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .container {
    max-width: 800px;
    width: 100%;
    background: white;
    border-radius: 1rem;
    box-shadow: var(--shadow);
    padding: 3rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }
  
  h1 {
    color: var(--gray-900);
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
  }
  
  .subtitle {
    color: var(--gray-600);
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
  
  .clock-container {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 500px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--gray-100);
  }

  .clock-label {
    display: block;
    color: var(--gray-600);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  #reloj {
    font-size: 1.75rem;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    color: var(--gray-900);
    font-weight: 600;
    background: var(--gray-50);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: inline-block;
    min-width: 300px;
    border: 1px solid var(--gray-200);
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: white;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.2s ease;
    margin-top: 1rem;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -1px rgba(79, 70, 229, 0.2);
  }
  
  .btn:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.2);
  }

  .btn:active {
    transform: translateY(0);
  }

  .logo {
    width: 120px;
    height: auto;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 640px) {
    .container {
      padding: 2rem 1.5rem;
      margin: 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
    }
    
    #reloj {
      font-size: 1.5rem;
      min-width: 100%;
      padding: 0.75rem 1rem;
    }
    
    .btn {
      width: 100%;
      padding: 0.875rem 1.5rem;
    }
  }
`;

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
    timezone: ''
  });

  // Get user's timezone on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      updateDateTime(userTimezone);
      
      // Update time every second
      const timer = setInterval(() => updateDateTime(userTimezone), 1000);
      
      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    }
  }, []);

  const updateDateTime = (timezone: string) => {
    const now = new Date();
    
    // Formatear fecha
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone
    };
    
    const dateStr = now.toLocaleDateString('es-ES', dateOptions);
    const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    // Formatear hora
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezone
    };
    
    const timeStr = now.toLocaleTimeString('es-ES', timeOptions);
    
    setCurrentDateTime({
      date: formattedDate,
      time: timeStr,
      timezone: timezone
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>El Pulsar - Inicio</title>
        <meta name="description" content="Bienvenido a El Pulsar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <svg className="logo" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="60" fill="url(#paint0_linear)" />
            <path d="M60 30L80 60L60 90L40 60L60 30Z" fill="white" />
            <defs>
              <linearGradient id="paint0_linear" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4f46e5" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          
          <h1>Bienvenido a <span style={{ display: 'block' }}>El Pulsar</span></h1>
          <p className="subtitle">Tu plataforma de documentación y recursos tecnológicos</p>
          
          <div className="clock-container">
            <span className="clock-label">Fecha Actual</span>
            <div id="reloj">{currentDateTime.date}</div>
            
            <span className="clock-label" style={{ marginTop: '1rem' }}>Hora Actual</span>
            <div id="reloj">{currentDateTime.time}</div>
            
            <span className="clock-label" style={{ marginTop: '1rem' }}>Zona Horaria</span>
            <div style={{ marginTop: '0.5rem', color: 'var(--gray-700)' }}>
              {currentDateTime.timezone}
            </div>
          </div>
          
          <a 
            href="https://docs.elpulsar.app" 
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a la Documentación
          </a>
        </div>
      </div>
      
      <style jsx global>{styles}</style>
    </div>
  );
}

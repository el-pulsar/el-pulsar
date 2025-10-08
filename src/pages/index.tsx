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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  :root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --primary-light: #eef2ff;
    --secondary: #7c3aed;
    --secondary-hover: #6d28d9;
    --accent: #8b5cf6;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.7;
    color: var(--gray-800);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .container {
    max-width: 1200px;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-radius: 1.25rem;
    box-shadow: var(--shadow-lg);
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: var(--transition);
    border: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 1;
    margin: 2rem;
  }

  .container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
    background-size: 200% auto;
    animation: gradient 8s ease infinite;
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  h1 {
    color: var(--gray-900);
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    background: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    line-height: 1.2;
    letter-spacing: -0.025em;
    animation: gradient 8s ease infinite;
    margin-bottom: 0.5rem;
  }
  
  h1 span {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-600);
    margin-top: 0.5rem;
    -webkit-text-fill-color: var(--gray-600);
    background: none;
    animation: none;
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
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border-radius: 1rem;
    padding: 2.5rem;
    margin: 2.5rem auto;
    max-width: 500px;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(255, 255, 255, 0.5);
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }
  
  .clock-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
  }

  .clock-label {
    display: block;
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 1.5rem;
  }
  
  .clock-label:first-child {
    margin-top: 0;
  }
  
  #reloj {
    font-size: 1.75rem;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    color: var(--gray-900);
    font-weight: 700;
    background: rgba(255, 255, 255, 0.7);
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    display: inline-block;
    min-width: 300px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
  }
  
  #reloj::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
    z-index: -1;
    opacity: 0.5;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 9999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 2rem;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 20px -5px rgba(99, 102, 241, 0.5);
    position: relative;
    overflow: hidden;
    z-index: 1;
    min-width: 220px;
  }
  
  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--primary-hover), var(--accent));
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.6);
  }
  
  .btn:hover::before {
    opacity: 1;
  }

  .btn:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px -3px rgba(99, 102, 241, 0.6);
  }
  
  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
  }

  .logo {
    width: 120px;
    height: auto;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 768px) {
    body {
      padding: 1rem;
    }
    
    .container {
      padding: 2.5rem 1.5rem;
      margin: 0.5rem;
      border-radius: 1rem;
    }
    
    h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }
    
    h1 span {
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    
    .clock-container {
      padding: 1.5rem;
      margin: 2rem 0;
      width: 100%;
    }
    
    #reloj {
      font-size: 1.5rem;
      min-width: 100%;
      padding: 0.875rem 1rem;
    }
    
    .btn {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1rem;
      margin-top: 1.5rem;
    }
    
    .logo {
      width: 100px;
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
    
    h1 span {
      font-size: 1.1rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .clock-container {
      padding: 1.25rem;
    }
    
    .clock-label {
      font-size: 0.7rem;
    }
    
    #reloj {
      font-size: 1.25rem;
      padding: 0.75rem 1rem;
    }
  }
`;

// Función para formatear la fecha
const formatDate = (date: Date, timezone: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone
  };
  const dateStr = date.toLocaleDateString('es-ES', options);
  return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
};

// Función para formatear la hora
const formatTime = (date: Date, timezone: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: timezone
  };
  return date.toLocaleTimeString('es-ES', options);
};

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: 'Cargando fecha...',
    time: '--:--:--',
    timezone: 'Cargando zona horaria...'
  });

  // Get user's timezone on client side
  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window === 'undefined') return;
    
    // Función para actualizar el reloj
    const updateClock = () => {
      try {
        const now = new Date();
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Formatear la fecha y hora directamente
        const dateOptions: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: userTimezone
        };
        
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: userTimezone
        };
        
        const formattedDate = now.toLocaleDateString('es-ES', dateOptions);
        const formattedTime = now.toLocaleTimeString('es-ES', timeOptions);
        
        // Actualizar el estado
        setCurrentDateTime({
          date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
          time: formattedTime,
          timezone: userTimezone
        });
      } catch (error) {
        console.error('Error al actualizar el reloj:', error);
        setCurrentDateTime({
          date: 'Error al cargar la fecha',
          time: '--:--:--',
          timezone: 'Error al detectar zona horaria'
        });
      }
    };
    
    // Actualizar inmediatamente
    updateClock();
    
    // Actualizar cada segundo
    const timer = setInterval(updateClock, 1000);
    
    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, []);

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
              {currentDateTime.date || 'Cargando fecha...'}
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
              {currentDateTime.time || '--:--:--'}
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
              {currentDateTime.timezone || 'Cargando zona horaria...'}
            </div>
          </div>
          
          <a 
            href="https://docs.elpulsar.app" 
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.125rem',
              marginTop: '2rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px -5px rgba(99, 102, 241, 0.5)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              minWidth: '220px'
            }}
          >
            Ir a la Documentación
          </a>
        </div>
      </div>
      
      <style jsx global>{styles}</style>
    </div>
  );
}

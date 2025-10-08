import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaRocket, FaCalendarAlt } from 'react-icons/fa';
import DocumentationButton from '../components/DocumentationButton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [timezone, setTimezone] = useState('');

  // Get user's timezone on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
    }
  }, []);

  useEffect(() => {
    // Update date and time immediately
    updateDateTime();
    
    // Update time every second
    const timer = setInterval(updateDateTime, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const updateDateTime = () => {
    const now = new Date();
    setCurrentDate(format(now, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }));
    setCurrentTime(formatTime(now));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>El Pulsar - Inicio</title>
        <meta name="description" content="Bienvenido a El Pulsar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaRocket className="text-5xl text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ¡Bienvenido a <span className="text-blue-600">El Pulsar</span>!
          </h1>
          
          <p className="text-xl text-gray-600 mb-10">
            Tu plataforma de gestión y productividad todo en uno
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <FaCalendarAlt className="text-blue-500 text-2xl" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Fecha y Hora Actual
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-3xl font-medium text-gray-800">
                  {currentDate}
                </div>
                <div className="text-5xl font-bold text-blue-600">
                  {currentTime}
                </div>
              </div>
              {timezone && (
                <div className="text-sm text-gray-500">
                  <p>Hora local de tu ubicación</p>
                  <p className="text-xs">Zona horaria: {timezone}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center">
              <DocumentationButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

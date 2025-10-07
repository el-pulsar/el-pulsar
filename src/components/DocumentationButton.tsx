import Link from 'next/link';

export default function DocumentationButton() {
  return (
    <a
      href="https://docs.elpulsar.app"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      Ver Documentación
    </a>
  );
}

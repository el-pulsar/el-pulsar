/** @type {import('next').NextConfig} */

// Encabezados de seguridad
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';",
  },
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Eliminamos 'output: export' para permitir SSR/ISR en Vercel
  // output: 'export',
  // distDir: 'out',  // Vercel maneja el directorio de salida
  images: {
    domains: ['www.elpulsar.app', 'docs.elpulsar.app'],
    // Habilitar optimización de imágenes de Vercel
    unoptimized: false,
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Eliminamos exportPathMap ya que no es necesario con el enrutamiento de páginas de Next.js
  // exportPathMap: async function() {
  //   return {
  //     '/': { page: '/' },
  //     '/index.html': { page: '/' },
  //   }
  // },
  // Configuración para Vercel
  experimental: {
    // Mejora el rendimiento de la compilación
    optimizeCss: true,
    // Mejora el rendimiento del servidor
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  // Configuración de caché
  onDemandEntries: {
    // Tiempo en segundos que la página permanece en la caché
    maxInactiveAge: 25 * 1000,
    // Número de páginas que se mantienen en la caché
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig

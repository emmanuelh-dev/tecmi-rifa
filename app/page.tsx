import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import AdminButton from '@/components/AdminButton';
import EventTicket from '@/components/EventTicket';
import TicketsCarousel from '@/components/TicketsCarousel';

export default function Home() {
  const speakers = [
    {
      id: 1,
      name: "Adrían Garza",
      image: "1.svg"
    },
    {
      id: 2,
      name: "Karla Morales",
      image: "2.svg"
    },
    {
      id: 3,
      name: "Ana Delia García",
      image: "3.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-tecmitalk-green">
      <nav className="bg-[#14095D] py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image 
              src="logo_sin_fondo.png" 
              alt="TECMITALK" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#speakers" className="text-white hover:text-tecmitalk-accent transition">Ponentes</a>
            <a href="#why-attend" className="text-white hover:text-tecmitalk-accent transition">¿Por qué asistir?</a>
            <a href="#tickets" className="text-white hover:text-tecmitalk-accent transition">Tickets</a>
            <a href="#location" className="text-white hover:text-tecmitalk-accent transition">Ubicación</a>
          </div>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#14095D]">
            Registro
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h2 className="text-sm font-medium text-tecmitalk-accent mb-2 tracking-widest">#LEADYOURPATH</h2>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  El evento tecnológico <br/>más importante del año
                </h1>
              </div>
              
              <p className="text-xl text-gray-100 mb-8 max-w-lg">
                Conoce las últimas tendencias tecnológicas de la mano de expertos y networking con profesionales del sector.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="inline-flex items-center border border-white/30 rounded-full px-4 py-2 text-white text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  29 de Abril del 2025
                </div>
                <div className="inline-flex items-center border border-white/30 rounded-full px-4 py-2 text-white text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  9:00 a.m. - 6:00 p.m.
                </div>
                <div className="inline-flex items-center border border-white/30 rounded-full px-4 py-2 text-white text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Tecmilenio Campus San Nicolás
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-md transform hover:scale-105 transition duration-500">
                <EventTicket />
              </div>
            </div>
          </div>
        </div>

        {/* Why Attend Section */}
        <section id="why-attend" className="bg-white/10 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-tecmitalk-accent text-sm font-medium tracking-widest mb-4">¿POR QUÉ ASISTIR?</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Razones para no perdértelo</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-tecmitalk-accent transition">
                <div className="text-tecmitalk-accent text-4xl font-bold mb-4">01</div>
                <h4 className="text-xl font-bold text-white mb-3">Expertos de clase mundial</h4>
                <p className="text-gray-200">Aprende de los líderes y pioneros en tecnología que están dando forma al futuro de la industria.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-tecmitalk-accent transition">
                <div className="text-tecmitalk-accent text-4xl font-bold mb-4">02</div>
                <h4 className="text-xl font-bold text-white mb-3">Networking valioso</h4>
                <p className="text-gray-200">Conecta con profesionales, reclutadores y colegas que comparten tus intereses y pasiones.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-tecmitalk-accent transition">
                <div className="text-tecmitalk-accent text-4xl font-bold mb-4">03</div>
                <h4 className="text-xl font-bold text-white mb-3">Tendencias actuales</h4>
                <p className="text-gray-200">Mantente al día con las últimas tecnologías, herramientas y metodologías que están transformando el sector.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-20 bg-[#14095D]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-tecmitalk-accent text-sm font-medium tracking-widest mb-4">PONENTES</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Conoce a nuestros expertos</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Los líderes de la industria que compartirán su conocimiento y experiencia contigo.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-tecmitalk-accent transition duration-500">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white text-center">{speaker.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-tecmitalk-accent text-tecmitalk-accent hover:bg-tecmitalk-accent/10 px-8 py-4 text-lg">
                Ver todos los ponentes
              </Button>
            </div>
          </div>
        </section>

        {/* Tickets Section */}
        <section id="tickets" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-tecmitalk-accent text-sm font-medium tracking-widest mb-4">ENTRADAS</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Obtén tu ticket ahora</h3>
            </div>
            
            <div className="mt-16">
              <TicketsCarousel />
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-tecmitalk-accent hover:bg-tecmitalk-accent/90 text-white px-8 py-4 text-lg">
                Obtener tickets
              </Button>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="bg-white/10 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-tecmitalk-accent text-sm font-medium tracking-widest mb-4">UBICACIÓN</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Tecmilenio Campus San Nicolás</h3>
                <p className="text-gray-200 text-lg mb-6">
                Iztaccihuatl 431, Las Puentes 3er Sector, 66460 San Nicolás de los Garza, N.L.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-tecmitalk-accent mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium">Cómo llegar</h4>
                      <p className="text-gray-300">El campus cuenta con estacionamiento gratuito. También es accesible mediante transporte público (rutas: 001, 217, TME, 207, L02 del Metrorrey, Rufino Tamayo, Camino Al Milagro, Benito Juárez, Eloy Cavazos, Gonzalitos).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-tecmitalk-accent mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium">Contacto</h4>
                      <p className="text-gray-300">Para preguntas sobre el evento: <a href="mailto:tecmitalk@tecmilenio.mx" className="text-tecmitalk-accent hover:underline">tecmitalk@tecmilenio.mx</a></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-96 bg-gray-800 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/place/Tecmilenio+San+Nicolás/@25.743988,-100.2853909,17z/data=!3m1!4b1!4m6!3m5!1s0x866294ea743f4987:0x1c359940df5d881f!8m2!3d25.743988!4d-100.282816!16s%2Fg%2F1trvlw4k?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy"
                  className="filter grayscale-50 contrast-125"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <AdminButton />
        </div>
      </div>

      {/* Footer Simplificado */}
      <footer className="bg-[#14095D] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Image 
                src="logo_sin_fondo.png" 
                alt="TECMITALK" 
                width={160} 
                height={48} 
                className="h-12 w-auto mr-4"
              />
              <p className="text-gray-300 text-sm">El evento tecnológico más importante del año.</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/tecmileniosannicolas/?hl=es" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.facebook.com/TecmilenioSanNicolas/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/tecmilenio-campus-san-nicolás/?fbclid=PAZXh0bgNhZW0CMTEAAaaosA8Bmj5BJKOvORjls4JNQJModrOFLJ5pW3Mrt9v1XZ8l1aVoaFn2x08_aem_ANjCHMgd9iDkPHTCWl4rYw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@tecmilenio_sn?_t=8pQB2XPXC5t&_r=1&fbclid=PAZXh0bgNhZW0CMTEAAaYBWuH-8zEdgygPM8HJEOOVOCdIOYsVLnKh1JrquD7DAWLir9-VPXJyZf0_aem_DPhMJV1ch5NUjOqHO-wxtA" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <span className="sr-only">TikTok</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-sm font-medium">Creado con ❤️ por <a href="https://bysmax.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-tecmitalk-accent">bysmax</a>: María Fernanda, Emmanuel, Valeria y Gerson</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
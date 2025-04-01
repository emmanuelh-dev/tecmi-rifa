import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import AdminButton from '@/components/AdminButton';
import EventTicket from '@/components/EventTicket';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-tecmitalk-green">
      {/* Hero Section */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h2 className="text-sm font-medium text-tecmitalk-accent mb-2">#leadyourpath</h2>
                <Image 
                  src="/tecmitalk-logo.svg" 
                  alt="TECMITALK" 
                  width={400} 
                  height={120} 
                  className="w-full max-w-[400px]" 
                  priority
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                El evento tecnológico más importante del año
              </h1>
              
              <p className="text-lg text-gray-100 mb-8">
                Registra tus datos para participar en nuestra rifa y ganar un premio exclusivo
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="inline-block border border-white/30 rounded-full px-4 py-2 text-white">
                  29 de Abril del 2025
                </div>
                <div className="inline-block border border-white/30 rounded-full px-4 py-2 text-white">
                  9:00 a.m. - 6:00 p.m.
                </div>
                <div className="inline-block border border-white/30 rounded-full px-4 py-2 text-white">
                  Tecmilenio Campus San Nicolás
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <RegistrationForm />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <EventTicket />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <AdminButton />
          </div>
        </div>
      </div>

      {/* Footer con color #14095D */}
      <footer className="bg-[#14095D] text-white py-4 text-center shadow-md">
        <p className="text-sm font-medium">Creado con ❤️ por <a href="https://bysmax.com" target='_blank' className='font-bold '>bysmax</a>:  María Fernanda, Emmanuel, Valeria y Gerson</p>
      </footer>
    </div>
  );
}

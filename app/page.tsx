import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-custom-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Feria de Empleo Tecmilenio Campus San Nicolás</h1>
          <p className="text-lg text-gray-100">
          Registra tus datos para participar en nuestra rifa y ganar un premio
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <RegistrationForm />
        </div>
       <div className='bg-white rounded-lg mt-8 overflow-hidden'>
       <Image
          src="/feria.jpg"
          alt="Empresas"
          width={400}
          height={400}
          className="mx-auto w-full"
        />
       </div>
        <div className="mt-8 text-center">
          <Link href="/admin">
            <Button variant="outline" className="bg-white text-custom-green hover:bg-black-100">
              Panel de Administrador
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
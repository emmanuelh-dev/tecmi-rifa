import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Feria de Empleo Tecmilenio</h1>
          <p className="text-lg text-gray-600">Registra tus datos para participar en nuestra rifa de la feria de empleo</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <RegistrationForm />
        </div>

        <div className="mt-8 text-center">
          <Link href="/admin">
            <Button variant="outline">
              Panel de Administrador
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
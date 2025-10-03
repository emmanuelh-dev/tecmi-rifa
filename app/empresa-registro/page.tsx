import EmpresaRegistrationForm from '@/components/EmpresaForm';
import EmpresasBlock from '@/components/EmpresasBlock';
import { Button } from '@/components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowRight, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function EmpresaRegistroPage() {
  const registerOpen = false;

  return (
    <MainLayout>
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tecmilenio/5 via-transparent to-tecmilenio/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-tecmilenio/10 rounded-full mb-6 animate-pulse">
              <Building2 className="w-4 h-4 text-tecmilenio" />
              <span className="text-sm font-medium text-tecmilenio">Feria de Empleo 2025</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Feria del Empleo{' '}
              <span className="text-tecmilenio bg-clip-text text-transparent bg-gradient-to-r from-tecmilenio to-tecmilenio-700 block">
                San Nicolás
              </span>
            </h1>

            {registerOpen ? (
              <>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Completa el formulario para registrar tu empresa y participar en el evento.
                </p>
                <Link href="/empresas">
                  <Button className="bg-tecmilenio hover:bg-tecmilenio-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    Ver Empresas Registradas
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </>
            ) : (
              <div className="max-w-xl mx-auto px-8 py-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg text-gray-900 font-semibold mb-2">
                      El registro para esta edición ya ha cerrado.
                    </p>
                    <p className="text-base text-gray-700 mb-1">
                      ¡Nos vemos en la próxima Feria de Empleo del semestre{' '}
                      <span className="font-bold text-tecmilenio">Enero–Mayo 2026!</span>
                    </p>
                    <p className="text-base text-gray-600">
                      Esperamos contar contigo
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {registerOpen ? (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-tecmilenio/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-tecmilenio" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Formulario de Registro
                </h2>
                <p className="text-gray-600">Completa los datos de tu empresa</p>
              </div>
              <EmpresaRegistrationForm />
            </div>
          </div>
        </section>
      ) : (
        <EmpresasBlock />
      )}
    </MainLayout>
  );
}
import EmpresaRegistrationForm from '@/components/EmpresaForm';
import MainLayout from '@/Layouts/MainLayout';

export default function EmpresaRegistroPage() {

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Registro de Empresas
              </h1>
              <p className="text-gray-600">
                Completa el formulario para participar en la feria de empleo
              </p>
            </div>
            <EmpresaRegistrationForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
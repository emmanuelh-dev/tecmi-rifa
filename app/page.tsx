import RegistrationForm from '@/components/RegistrationForm';

import { ArrowRight, Building2, Calendar, Gift, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
  const empresas = [
    { name: "Microsoft", logo: "/microsoft-logo.png" },
    { name: "Google", logo: "/google-logo.png" },
    { name: "Amazon", logo: "/amazon-logo.png" },
    { name: "Meta", logo: "/meta-logo-abstract.png" },
    { name: "Apple", logo: "/apple-logo.png" },
    { name: "Netflix", logo: "/netflix-inspired-logo.png" },
    { name: "Spotify", logo: "/spotify-logo.png" },
    { name: "Uber", logo: "/provider-logos/uber.png" },
  ]

  return (
    <MainLayout>

    <div className="min-h-screen bg-gradient-to-br from-tecmilenio-50 via-white to-tecmilenio-50">
      {/* Header */}


      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-tecmilenio-100 text-tecmilenio-800 text-sm font-medium mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              Próximamente • 2025
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Feria de <span className="text-tecmilenio">Empleo</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Conecta con las empresas más innovadoras del mundo tech. Prácticas profesionales, servicio social y
              oportunidades de medio tiempo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="/empresas">            <Button size="lg" className="bg-tecmilenio hover:bg-tecmilenio-700 text-white px-8 py-3 text-lg">
                Explorar Empresas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button></a>
              <a href="/#registro">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-tecmilenio-200 text-tecmilenio-700 hover:bg-tecmilenio-50 px-8 py-3 text-lg bg-transparent"
                >
                  Registrar Visita
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-tecmilenio-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-tecmilenio" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Grandes Empresas</h3>
                <p className="text-sm text-gray-600">Líderes en tecnología</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tecmilenio-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-tecmilenio" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Muchas Vacantes</h3>
                <p className="text-sm text-gray-600">Oportunidades únicas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tecmilenio-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-tecmilenio" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Campus TecMilenio</h3>
                <p className="text-sm text-gray-600">Evento presencial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Empresas Participantes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Las compañías más innovadoras del mundo tech estarán presentes
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {empresas.map((empresa, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 group">
                <CardContent className="p-6 flex items-center justify-center h-24">
                  <img
                    src={empresa.logo || "/placeholder.svg"}
                    alt={`${empresa.name} logo`}
                    className="max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Y muchas más empresas por confirmar</p>
            <a href="/empresas">
              <Button className="bg-tecmilenio hover:bg-tecmilenio-700 text-white px-6 py-3 text-lg">
                Ver Todas las Empresas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className="mb-8" id="registro">
            <Gift className="w-16 h-16 text-tecmilenio mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-tecmilenio mb-4 text-center">Registra tu Visita</h2>
            <p className="text-xl text-tecmilenio max-w-2xl mx-auto">
              Todos los participantes registrados entrarán automáticamente en nuestra rifa
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>


    </div>
        </MainLayout>

  )
}

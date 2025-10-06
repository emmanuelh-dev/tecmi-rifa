'use client'
import { Empresa } from '@/app/types';
import { supabaseClient } from '@/lib/supabase/client';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Building2, User, Mail, Calendar, Briefcase } from 'lucide-react';
import { CAREERS } from '@/app/data/constants';
import { Marquee } from './ui/marquees';
import { Input } from './ui/input';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger } from './ui/select';

const REQUIRED_FIELDS = 'id,nombreEmpresa,logo,carreraBuscada,descripcion';

export default function EmpresasBlock({ limit }: { limit?: number }) {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('all');


  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        let query = supabaseClient
          .from('RegistroEmpresas')
          .select(REQUIRED_FIELDS);

        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        if (data) setEmpresas(data as any);
      } catch (error) {
        console.error('Error fetching empresas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpresas();
  }, [limit]);

  const getCareerNames = (careerIds: string) =>
    careerIds.split(',').map(id => {
      const career = CAREERS.find(c => c.id === id.trim());
      return career?.name || id;
    });

  if (isLoading) {
    return (
      <div className='max-w-6xl px-4 mx-auto'>
        <div className="text-center">Cargando empresas...</div>
      </div>
    );
  }

  const groupedEmpresas = Array.from(
    { length: Math.ceil(empresas.length / 4) },
    (_, i) => empresas.slice(i * 4, i * 4 + 4)
  );
  console.log({ searchTerm, selectedCareer });

  return (
    <div className='max-w-6xl px-4 mx-auto'>
      <div className="space-y-8 grid grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-4 flex items-center gap-4">
          <Input placeholder="Buscar por nombre..." onChange={e => setSearchTerm(e.target.value)} />
          <Select onValueChange={value => setSelectedCareer(value)} value={selectedCareer} defaultValue="all">
            <SelectTrigger className="w-full">
              <span>Filtrar por carrera</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las carreras</SelectItem>
              {CAREERS.map(career => (
                <SelectItem key={career.id} value={career.id}>{career.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {empresas.filter(empresa => {
          const matchesSearch = empresa.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCareer = selectedCareer === 'all' || empresa.carreraBuscada.split(',').map(id => id.trim()).includes(selectedCareer);
          return matchesSearch && matchesCareer;
        }).map((empresa, i) => (
          <Dialog key={empresa.id}>
            <DialogTrigger asChild>
              <div className="mx-1 lg:mx-42 flex-shrink-0">
                <Card className=" w-32 lg:w-64 cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 transform group">
                  <CardContent className="p-0 h-full">
                    <div className="relative h-16 lg:h-32 flex items-center justify-center overflow-hidden rounded-t-lg">
                      <img
                        src={empresa.logo || "/placeholder-logo.png"}
                        alt={`${empresa.nombreEmpresa} logo`}
                        className="object-cover max-w-full object-center transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {!limit && (
                      <div className="p-4 h-16">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                          {empresa.nombreEmpresa}
                        </h3>
                        <div className="flex items-center text-xs text-gray-600">
                          <Briefcase className="w-3 h-3 mr-1" />
                          <span className="line-clamp-1">{empresa.carreraBuscada}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-2 rounded-lg flex items-center justify-center">
                    <img
                      src={empresa.logo || "/placeholder-logo.png"}
                      alt={`${empresa.nombreEmpresa} logo`}
                      className="max-h-8 w-auto object-contain"
                    />
                  </div>
                  {empresa.nombreEmpresa}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {empresa.descripcion && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {empresa.descripcion}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Carrera Buscada</p>
                        <ul className="text-sm text-gray-600">
                          {getCareerNames(empresa.carreraBuscada).map(name => (
                            <li key={name} className="list-disc ml-4">
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
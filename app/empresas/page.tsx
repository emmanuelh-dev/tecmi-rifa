'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/Layouts/MainLayout';

interface Empresa {
    created_at: string;
    nombreColaborador: string;
    nombreEmpresa: string;
    carreraBuscada: string;
    logo?: string;
    descripcion?: string;
    correo?: string;
}

export default function EmpresasPage() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('RegistroEmpresas')
                    .select('*');

                if (error) throw error;
                if (data) setEmpresas(data);
            } catch (error) {
                console.error('Error fetching empresas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmpresas();
    }, []);
    return (
        <MainLayout>
            <h1 className="text-3xl font-bold text-center mb-8">Empresas Participantes</h1>
            <div className="max-w-3xl mx-auto">

            {isLoading ? (
                <div className="text-center">Cargando empresas...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-12 group/grid">
                    {empresas.map((empresa, index) => (
                        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group opacity-100 group-hover/grid:opacity-50 hover:!opacity-100">
                            <CardContent className="p-6 flex items-center justify-center h-24">
                                <img
                                    src={empresa.logo || "/empresa.svg"}
                                    alt={`${empresa.nombreEmpresa} logo`}
                                    className="max-h-16 max-w-full object-contain transition-all duration-300"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            </div>
        </MainLayout>
    )
}

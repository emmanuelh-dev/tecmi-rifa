'use client'
import { Empresa } from '@/app/types';
import { createClient } from '@/lib/supabase/client';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';

export default function EmpresasBlock({ limit }: { limit?: number}) {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const supabase = createClient();
                let query = supabase.from('RegistroEmpresas').select('*');
                if (limit) {
                    query = query.limit(limit);
                }
                const { data, error } = await query;

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
        <div className='max-w-6xl px-4 mx-auto'>
            {isLoading ? (
                <div className="text-center">Cargando empresas...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-12 group/grid">
                    {empresas.map((empresa, index) => (
                        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group opacity-100 group-hover/grid:opacity-50 hover:!opacity-100">
                            <CardContent className="p-6 flex items-center justify-center h-24 overflow-hidden">
                                <img
                                    src={empresa.logo || "/empresa.svg"}
                                    alt={`${empresa.nombreEmpresa} logo`}
                                    className="object-cover max-w-full object-center transition-all duration-300"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

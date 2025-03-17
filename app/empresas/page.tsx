'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EmpresaRegistrationForm from '@/components/EmpresaForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CAREERS } from '@/app/data/constants';

interface Empresa {
    created_at: string;
    nombreColaborador: string;
    nombreEmpresa: string;
    carreraBuscada: string;
}

export default function EmpresasListPage() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const filteredEmpresas = empresas.filter(empresa =>
        empresa.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.nombreColaborador.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCareerNames = (careerString: string) => {
        const careerIds = careerString.split(',');
        return careerIds.map(id =>
            CAREERS.find(career => career.id === id)?.name || id
        ).join(', ');
    };

    return (
        <div className="min-h-screen bg-custom-green py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Empresas Registradas</h1>
                        <p className="text-lg text-gray-100">
                            Listado de empresas participantes en la feria de empleo
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-custom-green hover:bg-gray-100">
                                Registrar Empresa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Registrar Nueva Empresa</DialogTitle>
                            </DialogHeader>
                            <EmpresaRegistrationForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-7xl mx-auto">
                <div className="mb-6">
                    <Input
                        placeholder="Buscar por nombre de empresa o colaborador..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>

                {isLoading ? (
                    <div className="text-center py-8">Cargando empresas...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Colaborador</TableHead>
                                    <TableHead>Carreras Buscadas</TableHead>
                                    <TableHead>Fecha de Registro</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmpresas.map((empresa, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{empresa.nombreEmpresa}</TableCell>
                                        <TableCell>{empresa.nombreColaborador}</TableCell>
                                        <TableCell>{getCareerNames(empresa.carreraBuscada)}</TableCell>
                                        <TableCell>
                                            {new Date(empresa.created_at).toLocaleDateString('es-MX')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredEmpresas.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No se encontraron empresas que coincidan con la búsqueda
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
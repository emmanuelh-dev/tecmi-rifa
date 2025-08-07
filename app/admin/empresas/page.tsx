'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import EmpresaRegistrationForm from '@/components/EmpresaForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CAREERS } from '@/app/data/constants';
import Link from 'next/link';

interface Empresa {
    id?: number;
    created_at: string;
    nombreColaborador: string;
    nombreEmpresa: string;
    carreraBuscada: string;
    logo?: string;
    descripcion?: string;
    correo?: string;
    telefono?: string;
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

    const handleDeleteEmpresa = async (id: number, nombreEmpresa: string) => {
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('RegistroEmpresas')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Actualizar el estado local removiendo la empresa eliminada
            setEmpresas(empresas.filter(empresa => empresa.id !== id));
            
            console.log(`Empresa ${nombreEmpresa} eliminada exitosamente`);
        } catch (error) {
            console.error('Error al eliminar empresa:', error);
            alert('Error al eliminar la empresa. Inténtalo de nuevo.');
        }
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
                    <Link href="/empresa-registro">
                        <Button className="bg-white text-custom-green hover:bg-gray-100">
                            Página de Registro de Empresas
                        </Button>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-white text-custom-green hover:bg-gray-100">
                                Ver Formulario de Empresa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Formulario de Empresa (Solo Vista)</DialogTitle>
                                <p className="text-sm text-gray-600">Este formulario es solo para que veas las preguntas. Las empresas deben usar la página pública.</p>
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
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Colaborador</TableHead>
                                    <TableHead>Carreras Buscadas</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Fecha de Registro</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmpresas.map((empresa, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {empresa.logo ? (
                                                <img
                                                    src={empresa.logo}
                                                    alt={`Logo de ${empresa.nombreEmpresa}`}
                                                    className="w-12 h-12 object-contain rounded"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                                        if (nextElement) {
                                                            nextElement.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                                                style={{ display: empresa.logo ? 'none' : 'flex' }}
                                            >
                                                Sin logo
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{empresa.nombreEmpresa}</TableCell>
                                        <TableCell>{empresa.nombreColaborador}</TableCell>
                                        <TableCell>{getCareerNames(empresa.carreraBuscada)}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {empresa.correo && <div>{empresa.correo}</div>}
                                                {empresa.telefono && <div>{empresa.telefono}</div>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(empresa.created_at).toLocaleDateString('es-MX')}
                                        </TableCell>
                                        <TableCell>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        Eliminar
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer. Se eliminará permanentemente la empresa "{empresa.nombreEmpresa}" de la base de datos.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction 
                                                            onClick={() => empresa.id && handleDeleteEmpresa(empresa.id, empresa.nombreEmpresa)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Eliminar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
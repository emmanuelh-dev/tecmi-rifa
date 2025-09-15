'use client';

import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import EmpresaRegistrationForm from '@/components/EmpresaForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CAREERS } from '@/app/data/constants';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import CloudinaryUpload from '@/components/CloudinaryUpload';

interface Empresa {
  id?: number;
  created_at: string;
  nombreEmpresa: string;
  ubicacion?: string;
  nombreColaborador: string;
  cargo?: string;
  correo?: string;
  telefono?: string;
  llevaAcompanante?: boolean;
  nombreAcompañante?: string;
  correo2?: string;
  telefono2?: string;
  personasExtras?: string;
  nivelVacante?: string;
  carreraBuscada: string;
  requiereStand?: boolean;
  participaBolsa?: boolean;
  traeArticulos?: boolean;
  articulo?: string;
  logo?: string;
  descripcion?: string;
  autorizacion?: string;
  llevaPersonasExtras?: boolean;
  cantidadPersonasExtras?: number;
  nombresPersonasExtras?: string;
  luz?: boolean;
}

export default function EmpresasListPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const supabase = supabaseClient();
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
      const supabase = supabaseClient();
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

  const handleEditEmpresa = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEmpresa = async (updatedData: Partial<Empresa>) => {
    if (!editingEmpresa?.id) return;

    try {
      const supabase = supabaseClient();
      const { error } = await supabase
        .from('RegistroEmpresas')
        .update(updatedData)
        .eq('id', editingEmpresa.id);

      if (error) throw error;

      // Actualizar el estado local
      setEmpresas(empresas.map(empresa =>
        empresa.id === editingEmpresa.id
          ? { ...empresa, ...updatedData }
          : empresa
      ));

      setIsEditDialogOpen(false);
      setEditingEmpresa(null);
      console.log('Empresa actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
      alert('Error al actualizar la empresa. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-tecmilenio py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Empresas Registradas</h1>
            <p className="text-lg text-gray-100">
              Listado de empresas participantes en la feria de empleo
            </p>
          </div>
          <Link href="/empresa-registro">
            <Button className="bg-white text-tecmilenio hover:bg-gray-100">
              Página de Registro de Empresas
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white text-tecmilenio hover:bg-gray-100">
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
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Acompañante</TableHead>
                  <TableHead>Nivel Vacante</TableHead>
                  <TableHead>Carreras Buscadas</TableHead>
                  <TableHead>Stand</TableHead>
                  <TableHead>Bolsa Trabajo</TableHead>
                  <TableHead>Trae Artículos</TableHead>
                  <TableHead>Personas Extras</TableHead>
                  <TableHead>Autorización</TableHead>
                  <TableHead>Fecha Registro</TableHead>
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
                    <TableCell>{empresa.ubicacion || 'N/A'}</TableCell>
                    <TableCell>{empresa.nombreColaborador}</TableCell>
                    <TableCell>{empresa.cargo || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {empresa.correo && <div>{empresa.correo}</div>}
                        {empresa.telefono && <div>{empresa.telefono}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {empresa.llevaAcompanante ? (
                          <>
                            <div className="font-medium">{empresa.nombreAcompañante}</div>
                            {empresa.correo2 && <div>{empresa.correo2}</div>}
                            {empresa.telefono2 && <div>{empresa.telefono2}</div>}
                          </>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{empresa.nivelVacante || 'N/A'}</TableCell>
                    <TableCell className="max-w-xs truncate">{empresa.carreraBuscada}</TableCell>
                    <TableCell>
                      <div className={`text-center rounded-full px-2 py-1 text-white text-xs ${empresa.requiereStand ? 'bg-green-500' : 'bg-red-500'}`}>
                        {empresa.requiereStand ? 'Sí' : 'No'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-center rounded-full px-2 py-1 text-white text-xs ${empresa.participaBolsa ? 'bg-green-500' : 'bg-red-500'}`}>
                        {empresa.participaBolsa ? 'Sí' : 'No'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {empresa.traeArticulos ? (
                          <>
                            <div className="text-green-600 font-medium">Sí</div>
                            {empresa.articulo && <div className="text-xs text-gray-500">{empresa.articulo}</div>}
                          </>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {empresa.llevaPersonasExtras ? (
                          <>
                            <div className="text-green-600 font-medium">Sí ({empresa.cantidadPersonasExtras})</div>
                            {empresa.nombresPersonasExtras && (
                              <div className="text-xs text-gray-500 max-w-xs truncate">
                                {empresa.nombresPersonasExtras}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-center rounded-full px-2 py-1 text-white text-xs ${empresa.autorizacion === 'SI' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {empresa.autorizacion || 'NO'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(empresa.created_at).toLocaleDateString('es-MX')}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEmpresa(empresa)}
                        >
                          Editar
                        </Button>
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
                      </div>
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

      {/* Modal de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
          </DialogHeader>
          {editingEmpresa && (
            <EditEmpresaForm
              empresa={editingEmpresa}
              onSave={handleUpdateEmpresa}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para editar empresa
interface EditEmpresaFormProps {
  empresa: Empresa;
  onSave: (data: Partial<Empresa>) => void;
  onCancel: () => void;
}

function EditEmpresaForm({ empresa, onSave, onCancel }: EditEmpresaFormProps) {
  const [formData, setFormData] = useState<Partial<Empresa>>({
    nombreEmpresa: empresa.nombreEmpresa || '',
    ubicacion: empresa.ubicacion || '',
    nombreColaborador: empresa.nombreColaborador || '',
    cargo: empresa.cargo || '',
    correo: empresa.correo || '',
    telefono: empresa.telefono || '',
    llevaAcompanante: empresa.llevaAcompanante || false,
    nombreAcompañante: empresa.nombreAcompañante || '',
    correo2: empresa.correo2 || '',
    telefono2: empresa.telefono2 || '',
    nivelVacante: empresa.nivelVacante || '',
    descripcion: empresa.descripcion || '',
    carreraBuscada: empresa.carreraBuscada || '',
    requiereStand: empresa.requiereStand || false,
    participaBolsa: empresa.participaBolsa || false,
    traeArticulos: empresa.traeArticulos || false,
    articulo: empresa.articulo || '',
    logo: empresa.logo || '',
    autorizacion: empresa.autorizacion || 'NO',
    llevaPersonasExtras: empresa.llevaPersonasExtras || false,
    cantidadPersonasExtras: empresa.cantidadPersonasExtras || 0,
    nombresPersonasExtras: empresa.nombresPersonasExtras || '',
    luz: empresa.luz || false
  });

  const [selectedCareers, setSelectedCareers] = useState<string[]>(
    empresa.carreraBuscada ? empresa.carreraBuscada.split(',') : []
  );

  const handleCareerChange = (careerId: string, checked: boolean) => {
    let newSelectedCareers: string[];
    if (checked) {
      newSelectedCareers = [...selectedCareers, careerId];
    } else {
      newSelectedCareers = selectedCareers.filter(id => id !== careerId);
    }
    setSelectedCareers(newSelectedCareers);
    setFormData(prev => ({
      ...prev,
      carreraBuscada: newSelectedCareers.join(',')
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.nombreEmpresa?.trim()) {
      alert('El nombre de la empresa es obligatorio');
      return;
    }
    if (!formData.nombreColaborador?.trim()) {
      alert('El nombre del colaborador es obligatorio');
      return;
    }
    if (!formData.logo?.trim()) {
      alert('El logo es obligatorio');
      return;
    }
    if (!formData.carreraBuscada?.trim()) {
      alert('Debe seleccionar al menos una carrera');
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreEmpresa">Nombre de la Empresa *</Label>
          <Input
            id="nombreEmpresa"
            value={formData.nombreEmpresa}
            onChange={(e) => setFormData(prev => ({ ...prev, nombreEmpresa: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input
            id="ubicacion"
            value={formData.ubicacion}
            onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreColaborador">Nombre del Colaborador *</Label>
          <Input
            id="nombreColaborador"
            value={formData.nombreColaborador}
            onChange={(e) => setFormData(prev => ({ ...prev, nombreColaborador: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            id="cargo"
            value={formData.cargo}
            onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="correo">Correo Electrónico</Label>
          <Input
            id="correo"
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData(prev => ({ ...prev, correo: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="llevaAcompanante"
            checked={formData.llevaAcompanante}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, llevaAcompanante: checked === true }))}
          />
          <Label htmlFor="llevaAcompanante">Lleva Acompañante</Label>
        </div>

        {formData.llevaAcompanante && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
            <div>
              <Label htmlFor="nombreAcompañante">Nombre del Acompañante</Label>
              <Input
                id="nombreAcompañante"
                value={formData.nombreAcompañante}
                onChange={(e) => setFormData(prev => ({ ...prev, nombreAcompañante: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="correo2">Correo del Acompañante</Label>
              <Input
                id="correo2"
                type="email"
                value={formData.correo2}
                onChange={(e) => setFormData(prev => ({ ...prev, correo2: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="telefono2">Teléfono del Acompañante</Label>
              <Input
                id="telefono2"
                value={formData.telefono2}
                onChange={(e) => setFormData(prev => ({ ...prev, telefono2: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="nivelVacante">Nivel de Vacante</Label>
        <Input
          id="nivelVacante"
          value={formData.nivelVacante}
          onChange={(e) => setFormData(prev => ({ ...prev, nivelVacante: e.target.value }))}
          placeholder="Ej: Junior, Senior, Practicante"
        />
      </div>

      <div>
        <Label htmlFor="logo">URL del Logo *</Label>
        <CloudinaryUpload
          value={formData.logo}
          onChange={(url) => setFormData(prev => ({ ...prev, logo: url }))}
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción de la Empresa</Label>
        <Textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
          rows={3}
        />
      </div>

      <div>
        <Label>Carreras Buscadas *</Label>
        <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
          {CAREERS.map((career) => (
            <div key={career.id} className="flex items-center space-x-2">
              <Checkbox
                id={career.id}
                checked={selectedCareers.includes(career.id)}
                onCheckedChange={(checked) => handleCareerChange(career.id, checked === true)}
              />
              <Label htmlFor={career.id} className="text-sm">
                {career.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="requiereStand"
            checked={formData.requiereStand}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requiereStand: checked === true }))}
          />
          <Label htmlFor="requiereStand">Requiere Stand</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="participaBolsa"
            checked={formData.participaBolsa}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, participaBolsa: checked === true }))}
          />
          <Label htmlFor="participaBolsa">Participa en Bolsa de Trabajo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="luz"
            checked={formData.luz}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, luz: checked === true }))}
          />
          <Label htmlFor="luz">Requiere Conexión Eléctrica</Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="traeArticulos"
            checked={formData.traeArticulos}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, traeArticulos: checked === true }))}
          />
          <Label htmlFor="traeArticulos">Trae Artículos</Label>
        </div>

        {formData.traeArticulos && (
          <div className="ml-6">
            <Label htmlFor="articulo">Descripción del Artículo</Label>
            <Input
              id="articulo"
              value={formData.articulo}
              onChange={(e) => setFormData(prev => ({ ...prev, articulo: e.target.value }))}
              placeholder="Describe el artículo que traerá"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="llevaPersonasExtras"
            checked={formData.llevaPersonasExtras}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, llevaPersonasExtras: checked === true }))}
          />
          <Label htmlFor="llevaPersonasExtras">Lleva Personas Extras</Label>
        </div>

        {formData.llevaPersonasExtras && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
            <div>
              <Label htmlFor="cantidadPersonasExtras">Cantidad de Personas Extras</Label>
              <Input
                id="cantidadPersonasExtras"
                type="number"
                min="0"
                value={formData.cantidadPersonasExtras}
                onChange={(e) => setFormData(prev => ({ ...prev, cantidadPersonasExtras: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="nombresPersonasExtras">Nombres de Personas Extras</Label>
              <Textarea
                id="nombresPersonasExtras"
                value={formData.nombresPersonasExtras}
                onChange={(e) => setFormData(prev => ({ ...prev, nombresPersonasExtras: e.target.value }))}
                placeholder="Lista los nombres separados por comas"
                rows={2}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="autorizacion">Autorización</Label>
        <Select
          value={formData.autorizacion}
          onValueChange={(value) => setFormData(prev => ({ ...prev, autorizacion: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona autorización" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SI">SÍ</SelectItem>
            <SelectItem value="NO">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
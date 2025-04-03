'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { PieChart as ReChartPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CAREERS, CAMPUSES, BOLETOSTYPE, PAYTYPE } from '@/app/data/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


interface Student {
  id: string;
  name: string;
  matricula: string;
  semester: number;
  career: string;
  campus: string;
  email: string;
  whatsapp: string;
  apellido: string;
  typeticket: string;
  typepay: string;
  paid: boolean;
  userType: 'student' | 'alumni';
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function AdminPage() {
  const [selectedStudentToEdit, setSelectedStudentToEdit] = useState<Student | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string } | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    matricula: '',
    semester: 1,
    career: '',
    campus: '',
    typeticket: '',
    typepay: '',
    paid: false
  });

  // Mover los estados de filtro dentro del componente
  const [filters, setFilters] = useState({
    ticketType: '',
    paymentType: '',
    paymentStatus: ''
  });

  // Mover la función de filtrado dentro del componente
  const filteredStudents = students.filter(student => {
    return (
      (filters.ticketType === '' || student.typeticket === filters.ticketType) &&
      (filters.paymentType === '' || student.typepay === filters.paymentType) &&
      (filters.paymentStatus === '' || 
        (filters.paymentStatus === 'paid' && student.paid) ||
        (filters.paymentStatus === 'unpaid' && !student.paid))
    );
  });

  // Resto del código del componente...

  // Data for charts
  const [campusData, setCampusData] = useState<Array<{ name: string; value: number }>>([]);
  const [careerData, setCareerData] = useState<Array<{ name: string; value: number }>>([]);
  const [userTypeData, setUserTypeData] = useState<Array<{ name: string; value: number }>>([]);
  const [paymentData, setPaymentData] = useState<Array<{ name: string; value: number }>>([]);
  const [ticketData, setTicketData] = useState<Array<{ name: string; value: number }>>([]);

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('RegistroTecmi')
        .delete()
        .eq('id', itemToDelete.id);

      if (error) throw error;

      toast.success('Asistente eliminado con éxito');
      
      // Refresh data
      const { data } = await supabase.from('RegistroTecmi').select('*');
      if (data) {
        setStudents(data as Student[]);
        processChartData(data as Student[]);
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      toast.error('Error al eliminar el registro');
    } finally {
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudentToEdit(student);
  };

  const handleUpdate = async (updatedData: Student) => {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('RegistroTecmi')
        .update(updatedData)
        .eq('id', updatedData.id);

      if (error) throw error;

      toast.success('Asistente actualizado con éxito');
      
      // Refresh data
      const { data } = await supabase.from('RegistroTecmi').select('*');
      if (data) {
        setStudents(data as Student[]);
        processChartData(data as Student[]);
      }
      setSelectedStudentToEdit(null);
    } catch (err) {
      console.error('Error al actualizar:', err);
      toast.error('Error al actualizar el registro');
    }
  };

  const handleRegisterSubmit = async () => {
    const supabase = createClient();
    
    try {
      // Validación de campos obligatorios
      if (!formData.name || !formData.matricula || !formData.typeticket) {
        toast.error('Campos obligatorios faltantes', {
          description: 'Nombre, matrícula y tipo de boleto son requeridos',
          duration: 3000
        });
        return;
      }
  
      // Insertar en Supabase
      const { error } = await supabase
        .from('RegistroTecmi')
        .insert([{
          name: formData.name,
          apellido: formData.apellido,
          matricula: formData.matricula,
          semester: formData.semester || 1, // Valor por defecto
          career: formData.career,
          campus: formData.campus,
          typeticket: formData.typeticket,
          typepay: formData.typepay,
          paid: formData.paid || false, // Valor por defecto
        }]);
  
      if (error) throw error;
  
      // Notificación de éxito mejorada
      toast.success('¡Registro exitoso!', {
        description: (
          <div className="mt-2">
            <p>{formData.name} {formData.apellido}</p>
            <p className="text-sm opacity-80">Matrícula: {formData.matricula}</p>
          </div>
        ),
        duration: 5000,
        position: 'top-right'
      });
  
      // Reset del formulario (versión optimizada)
      setFormData({
        name: '',
        apellido: '',
        matricula: '',
        semester: 1,
        career: '',
        campus: '',
        typeticket: '',
        typepay: '',
        paid: false
      });
  
      // Refrescar datos (versión optimizada)
      const { data, error: fetchError } = await supabase
        .from('RegistroTecmi')
        .select('*');
        
      if (fetchError) throw fetchError;
      
      if (data) {
        setStudents(data as Student[]);
        processChartData(data as Student[]);
      }
  
    } catch (err) {
      console.error('Error al registrar:', err);
      toast.error('Error en el registro', {
        description: 'Ocurrió un error al procesar tu solicitud',
        action: {
          label: 'Reintentar',
          onClick: () => handleRegisterSubmit(),
        },
      });
    }
  };


  const processChartData = (data: Student[]) => {
    // Process campus data
    const campusCounts: Record<string, number> = {};
    CAMPUSES.forEach(campus => {
      campusCounts[campus.name] = 0;
    });

    data.forEach(student => {
      const campusName = CAMPUSES.find(c => c.id === student.campus)?.name || student.campus;
      campusCounts[campusName] = (campusCounts[campusName] || 0) + 1;
    });

    const campusChartData = Object.entries(campusCounts)
      .filter(([_, count]) => count > 0)
      .map(([name, value]) => ({ name, value }));
    setCampusData(campusChartData);

    // Process career data
    const careerCounts: Record<string, number> = {};
    data.forEach(student => {
      const careerName = CAREERS.find(c => c.id === student.career)?.name || student.career;
      careerCounts[careerName] = (careerCounts[careerName] || 0) + 1;
    });

    const careerChartData = Object.entries(careerCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    setCareerData(careerChartData);

    // Process user type data
    const userTypeCounts = {
      'Estudiantes': 0,
      'ExaTecmis': 0
    };

    data.forEach(student => {
      if (student.userType === 'student') {
        userTypeCounts['Estudiantes']++;
      } else if (student.userType === 'alumni') {
        userTypeCounts['ExaTecmis']++;
      }
    });

    const userTypeChartData = Object.entries(userTypeCounts)
      .map(([name, value]) => ({ name, value }));
    setUserTypeData(userTypeChartData);

    // Process payment status data
    const paymentCounts = {
      'Pagado': 0,
      'Pendiente': 0
    };

    data.forEach(student => {
      if (student.paid) {
        paymentCounts['Pagado']++;
      } else {
        paymentCounts['Pendiente']++;
      }
    });

    const paymentChartData = Object.entries(paymentCounts)
      .map(([name, value]) => ({ name, value }));
    setPaymentData(paymentChartData);

    // Process ticket type data
    const ticketCounts: Record<string, number> = {};
    data.forEach(student => {
      const ticketType = BOLETOSTYPE.find(b => b.id === student.typeticket)?.name || 'No especificado';
      ticketCounts[ticketType] = (ticketCounts[ticketType] || 0) + 1;
    });

    const ticketChartData = Object.entries(ticketCounts)
      .map(([name, value]) => ({ name, value }));
    setTicketData(ticketChartData);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
          .from('RegistroTecmi')
          .select('*');

        if (error) throw error;

        if (data) {
          setStudents(data as Student[]);
          processChartData(data as Student[]);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Error al cargar los asistentes. Por favor, intenta de nuevo.');
        toast.error('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-custom-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Panel de Administrador</h1>
            <p className="text-lg text-gray-300">Gestión de Asistentes</p>
          </div>
          <div className="flex gap-4">
          <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white text-custom-green hover:bg-gray-100">
              Registrar Asistente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Asistente</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Sección 1: Datos Personales */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium">Datos Personales</h3>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="grid gap-2">
                    <label>Nombre(s)</label>
                    <input 
                      className="border p-2 rounded"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej. Juan Carlos"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Apellidos</label>
                    <input 
                      className="border p-2 rounded"
                      value={formData.apellido}
                      onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                      placeholder="Ej. Pérez López"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Matrícula</label>
                    <input 
                      className="border p-2 rounded"
                      value={formData.matricula}
                      onChange={(e) => setFormData({...formData, matricula: e.target.value})}
                      placeholder="Ej. A01234567"
                    />
                  </div>
                  <div className="grid gap-2">
  <label>Semestre</label>
  <input 
    type="number" 
    min="1" 
    max="8"
    className="border p-2 rounded"
    value={formData.semester || ''}
    onChange={(e) => {
      const value = e.target.value;
      // Permitir campo vacío temporalmente
      if (value === '') {
        setFormData({...formData, semester: 0}); // Set to default value 1 instead of empty string
      } else {
        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
          // Asegurarse que esté entre 1 y 8
          const clampedValue = Math.min(8, Math.max(1, numValue));
          setFormData({...formData, semester: clampedValue});
        }
      }
    }}
    onBlur={(e) => {
      // Si queda vacío al salir, poner valor por defecto 1
      if (e.target.value === '') {
        setFormData({...formData, semester: 1});
      }
    }}
    placeholder="Ej. 5"
  />
</div>
                  <div className="flex flex-wrap gap-4">
  <div className="flex-1 min-w-[200px]">
    <label className="block mb-2 text-sm font-medium text-gray-700">  {/* Estilos añadidos */}
      Carrera
    </label>
    <select 
      className="border p-2 rounded h-[42px] w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={formData.career}
      onChange={(e) => setFormData({...formData, career: e.target.value})}
    >
      <option value="">Selecciona tu carrera</option>
      {CAREERS.map((career) => (
        <option key={career.id} value={career.id}>
          {career.name}
        </option>
      ))}
    </select>
  </div>
</div>
                  <div className="grid gap-2">
                    <label>Campus</label>
                    <select 
                      className="border p-2 rounded h-[42px]"
                      value={formData.campus}
                      onChange={(e) => setFormData({...formData, campus: e.target.value})}
                    >
                      <option value="">Selecciona tu campus</option>
                      {CAMPUSES.map((campus) => (
                        <option key={campus.id} value={campus.id}>
                          {campus.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Sección 2: Información del Boleto */}
              <div>
                <h3 className="text-lg font-medium">Información del Boleto</h3>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="grid gap-2">
                    <label>Tipo de Boleto</label>
                    <select
                      className="border p-2 rounded h-[42px]"
                      value={formData.typeticket}
                      onChange={(e) => setFormData({...formData, typeticket: e.target.value})}
                    >
                      <option value="">Selecciona un tipo</option>
                      {BOLETOSTYPE.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Tipo de Pago</label>
                    <select
                      className="border p-2 rounded h-[42px]"
                      value={formData.typepay}
                      onChange={(e) => setFormData({...formData, typepay: e.target.value})}
                    >
                      <option value="">Selecciona método</option>
                      {PAYTYPE.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Estado de Pago</label>
                    <select
                      className="border p-2 rounded h-[42px]"
                      value={formData.paid ? 'true' : 'false'}
                      onChange={(e) => setFormData({...formData, paid: e.target.value === 'true'})}
                    >
                      <option value="true">Pagado</option>
                      <option value="false">Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleRegisterSubmit}
                  disabled={!formData.name || !formData.matricula || !formData.typeticket}
                  className="bg-custom-green text-white hover:bg-green-600"
                >
                  Registrar Asistente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Payment Status Chart */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado de Pagos</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-64">
              {!isLoading && paymentData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </ReChartPie>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  {isLoading ? 'Cargando datos...' : 'No hay datos disponibles'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ticket Distribution Chart */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distribución de Boletos</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-64">
              {!isLoading && ticketData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={ticketData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ticketData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </ReChartPie>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  {isLoading ? 'Cargando datos...' : 'No hay datos disponibles'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campus Distribution Chart */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distribución por Campus</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-64">
              {!isLoading && campusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={campusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {campusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </ReChartPie>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  {isLoading ? 'Cargando datos...' : 'No hay datos disponibles'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asistentes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Asistentes registrados</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? 'Cargando...' : error ? 'Error' : 'Listo'}</div>
              <p className="text-xs text-muted-foreground">
                {isLoading ? 'Obteniendo datos...' : error ? 'Error al cargar datos' : 'Datos cargados correctamente'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Asistentes Table */}
        <Card className="bg-white border border-gray-200 shadow-lg">
  <CardHeader>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <CardTitle>Lista de Asistentes</CardTitle>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        {/* Filtro por Tipo de Boleto */}
        <select
          className="border p-2 rounded text-sm"
          value={filters.ticketType}
          onChange={(e) => setFilters({...filters, ticketType: e.target.value})}
        >
          <option value="">Todos los boletos</option>
          {BOLETOSTYPE.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Filtro por Tipo de Pago */}
        <select
          className="border p-2 rounded text-sm"
          value={filters.paymentType}
          onChange={(e) => setFilters({...filters, paymentType: e.target.value})}
        >
          <option value="">Todos los pagos</option>
          {PAYTYPE.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Filtro por Estado de Pago */}
        <select
          className="border p-2 rounded text-sm"
          value={filters.paymentStatus}
          onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
        >
          <option value="">Todos los estados</option>
          <option value="paid">Pagado</option>
          <option value="unpaid">Pendiente</option>
        </select>

        {/* Botón para limpiar filtros */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilters({
            ticketType: '',
            paymentType: '',
            paymentStatus: ''
          })}
          className="whitespace-nowrap"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Nombre</th>
            <th className="text-left py-3 px-4">Matrícula</th>
            <th className="text-left py-3 px-4">Carrera</th>
            <th className="text-left py-3 px-4">Campus</th>
            <th className="text-left py-3 px-4">Tipo de Boleto</th>
            <th className="text-left py-3 px-4">Tipo de Pago</th>
            <th className="text-left py-3 px-4">Estado de Pago</th>
            <th className="text-left py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{student.name} {student.apellido}</td>
                <td className="py-2 px-4">{student.matricula}</td>
                <td className="py-2 px-4">{CAREERS.find(c => c.id === student.career)?.name || student.career}</td>
                <td className="py-2 px-4">{CAMPUSES.find(c => c.id === student.campus)?.name || student.campus}</td>
                <td className="py-2 px-4">{BOLETOSTYPE.find(t => t.id === student.typeticket)?.name || student.typeticket}</td>
                <td className="py-2 px-4">{PAYTYPE.find(t => t.id === student.typepay)?.name || student.typepay}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${student.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {student.paid ? 'Pagado' : 'Pendiente'}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(student)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setItemToDelete({ id: student.id });
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-4 text-center text-gray-500">
                No se encontraron asistentes con los filtros aplicados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>¿Estás seguro que deseas eliminar este asistente?</p>
            <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <div className="flex justify-end gap-3 p-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={selectedStudentToEdit !== null} onOpenChange={() => setSelectedStudentToEdit(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Asistente</DialogTitle>
          </DialogHeader>
          {selectedStudentToEdit && (
            <div className="p-4 space-y-6">
              {/* Sección 1: Datos Personales */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium">Datos Personales</h3>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="grid gap-2">
                    <label>Nombre</label>
                    <input
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.name}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Apellidos</label>
                    <input
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.apellido}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        apellido: e.target.value
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Matrícula</label>
                    <input
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.matricula}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        matricula: e.target.value
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Semestre</label>
                    <input
                      type="number"
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.semester}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        semester: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
              </div>
              
              {/* Sección 2: Información del Boleto */}
              <div>
                <h3 className="text-lg font-medium">Información del Boleto</h3>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="grid gap-2">
                    <label>Tipo de Boleto</label>
                    <select
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.typeticket}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        typeticket: e.target.value
                      })}
                    >
                      {BOLETOSTYPE.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Tipo de Pago</label>
                    <select
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.typepay}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        typepay: e.target.value
                      })}
                    >
                      {PAYTYPE.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Estado de Pago</label>
                    <select
                      className="border p-2 rounded"
                      value={selectedStudentToEdit.paid ? 'true' : 'false'}
                      onChange={(e) => setSelectedStudentToEdit({
                        ...selectedStudentToEdit,
                        paid: e.target.value === 'true'
                      })}
                    >
                      <option value="true">Pagado</option>
                      <option value="false">Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedStudentToEdit(null)}>
                  Cancelar
                </Button>
                <Button onClick={() => handleUpdate(selectedStudentToEdit)}>
                  Guardar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
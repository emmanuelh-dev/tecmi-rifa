'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as ReChartPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CAREERS, CAMPUSES } from '@/app/data/constants';
<<<<<<< HEAD
import Link from 'next/link'; // Importa Link para redireccionar
=======
import Link from 'next/link'; 
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92

// Define a type for student data
interface Student {
  name: string;
  matricula: string;
  career: string;
  campus: string;
  semester: number;
  userType: 'student' | 'alumni';
}

// Define colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function AdminPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data for charts
  const [campusData, setCampusData] = useState<Array<{name: string; value: number}>>([]);
  const [careerData, setCareerData] = useState<Array<{name: string; value: number}>>([]);
  const [userTypeData, setUserTypeData] = useState<Array<{name: string; value: number}>>([]);

  // Load real student data from Supabase
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('RegistroTecmi')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setStudents(data as Student[]);
          
          // Process data for charts
          processChartData(data as Student[]);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Error al cargar los estudiantes. Por favor, intenta de nuevo.');
        toast.error('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Process data for charts
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
      .filter(([_, count]) => count > 0) // Only include campuses with students
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
      .sort((a, b) => b.value - a.value) // Sort by count in descending order
      .slice(0, 5); // Only show top 5 careers
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
  };

  const selectRandomWinner = () => {
    setIsSelecting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (students.length > 0) {
        // Select a random student from the array
        const randomIndex = Math.floor(Math.random() * students.length);
        const winner = students[randomIndex];
        
        setSelectedStudent(winner);
        toast.success('¡Ganador seleccionado!');
      } else {
        toast.error('No hay estudiantes disponibles');
      }
      
      setIsSelecting(false);
    }, 2000);
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
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
    <div className="min-h-screen bg-admin-blue py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado con título y botón de Registro de Empresas */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Panel de Administrador</h1>
            <p className="text-lg text-gray-300">Selección de ganadores de la rifa</p>
          </div>
          <Link href="/empresa">
            <Button variant="outline" className="bg-white text-admin-blue hover:bg-gray-100">
              Registro de Empresas
            </Button>
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 mb-8 md:grid-cols-3">
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
                      {campusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
                              <p className="font-medium">{payload[0].name}</p>
                              <p>{`${payload[0].value} participantes`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
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

          {/* Career Distribution Chart */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top 5 Carreras</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-64">
              {!isLoading && careerData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={careerData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={100}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Participantes" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  {isLoading ? 'Cargando datos...' : 'No hay datos disponibles'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Type Distribution Chart */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipo de Usuario</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-64">
              {!isLoading && userTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
                              <p className="font-medium">{payload[0].name}</p>
                              <p>{`${payload[0].value} participantes`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
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
              <CardTitle className="text-sm font-medium">Total Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                Estudiantes registrados
              </p>
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

        <Card className="mb-8 bg-white border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Seleccionar Ganador</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button
              size="lg"
              onClick={selectRandomWinner}
              disabled={isSelecting || students.length === 0}
              className="mb-6 bg-admin-blue text-white hover:bg-opacity-90"
            >
              {isSelecting ? 'Seleccionando...' : 'Seleccionar Ganador Aleatorio'}
            </Button>

            {selectedStudent && (
              <div className="w-full max-w-md bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">¡Ganador Seleccionado!</h3>
                <div className="space-y-2">
                  <p><strong>Nombre:</strong> {selectedStudent.name}</p>
                  <p><strong>Matrícula:</strong> {selectedStudent.matricula}</p>
                  <p><strong>Carrera:</strong> {selectedStudent.career}</p>
                  <p><strong>Campus:</strong> {selectedStudent.campus}</p>
                  <p><strong>Semestre:</strong> {selectedStudent.semester}</p>
                  <p><strong>Tipo:</strong> {selectedStudent.userType === 'student' ? 'Estudiante' : 'ExaTecmi'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Lista de Participantes</CardTitle>
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
                    <th className="text-left py-3 px-4">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.matricula} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{student.name}</td>
                      <td className="py-2 px-4">{student.matricula}</td>
                      <td className="py-2 px-4">{student.career}</td>
                      <td className="py-2 px-4">{student.campus}</td>
                      <td className="py-2 px-4">{student.userType === 'student' ? 'Estudiante' : 'ExaTecmi'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
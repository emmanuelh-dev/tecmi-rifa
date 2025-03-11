'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users } from 'lucide-react';
import { toast } from 'sonner';

// Define a type for student data
interface Student {
  name: string;
  matricula: string;
  career: string;
  campus: string;
  semester: number;
}

export default function AdminPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Load mock student data
  useEffect(() => {
    // In a real application, this would be an API call
    const mockStudents: Student[] = [
      {
        name: 'María González',
        matricula: 'A54321',
        career: 'Ingeniería en Sistemas Computacionales',
        campus: 'Campus Norte',
        semester: 6,
      },
      {
        name: 'Juan Pérez',
        matricula: 'A12345',
        career: 'Ingeniería Industrial',
        campus: 'Campus Sur',
        semester: 4,
      },
      {
        name: 'Ana Rodríguez',
        matricula: 'A67890',
        career: 'Ingeniería en Mecatrónica',
        campus: 'Campus Norte',
        semester: 8,
      },
      {
        name: 'Carlos Martínez',
        matricula: 'A24680',
        career: 'Ingeniería en Sistemas Computacionales',
        campus: 'Campus Centro',
        semester: 5,
      },
      {
        name: 'Laura Sánchez',
        matricula: 'A13579',
        career: 'Ingeniería en Biotecnología',
        campus: 'Campus Norte',
        semester: 7,
      },
    ];
    
    setStudents(mockStudents);
  }, []);

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

  return (
    <div className="min-h-screen bg-admin-blue py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Panel de Administrador</h1>
          <p className="text-lg text-gray-300">Selección de ganadores de la rifa</p>
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
          
          // ... existing code ...
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
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.matricula} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{student.name}</td>
                      <td className="py-2 px-4">{student.matricula}</td>
                      <td className="py-2 px-4">{student.career}</td>
                      <td className="py-2 px-4">{student.campus}</td>
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
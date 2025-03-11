'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const selectRandomWinner = () => {
    setIsSelecting(true);
    // Simulate API call delay
    setTimeout(() => {
      // This is where you would typically fetch the actual list of participants
      // and randomly select one
      const mockWinner = {
        name: 'María González',
        matricula: 'A54321',
        career: 'Ingeniería en Sistemas Computacionales',
        campus: 'Campus Norte',
        semester: 6,
      };
      
      setSelectedStudent(mockWinner);
      setIsSelecting(false);
      toast.success('¡Ganador seleccionado!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Administrador</h1>
          <p className="text-lg text-gray-600">Selección de ganadores de la rifa</p>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">
                Estudiantes registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premios Entregados</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                De 10 premios totales
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Seleccionar Ganador</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button
              size="lg"
              onClick={selectRandomWinner}
              disabled={isSelecting}
              className="mb-6"
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
      </div>
    </div>
  );
}
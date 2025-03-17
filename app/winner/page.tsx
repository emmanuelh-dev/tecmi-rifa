'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Student {
    name: string;
    matricula: string;
    career: string;
    campus: string;
    semester: number;
    userType: 'student' | 'alumni';
}

export default function WinnerPage() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load students from Supabase
    useState(() => {
        const fetchStudents = async () => {
            try {
                setIsLoading(true);
                const supabase = createClient();

                const { data, error } = await supabase
                    .from('RegistroTecmi')
                    .select('*');

                if (error) throw error;
                if (data) setStudents(data as Student[]);
            } catch (err) {
                console.error('Error fetching students:', err);
                toast.error('Error al cargar los datos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 999
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const selectRandomWinner = () => {
        setIsSelecting(true);

        setTimeout(() => {
            if (students.length > 0) {
                const randomArray = new Uint32Array(1);
                window.crypto.getRandomValues(randomArray);
                const randomIndex = randomArray[0] % students.length;

                const winner = students[randomIndex];

                setSelectedStudent(winner);
                triggerConfetti();
                toast.success('¡Ganador seleccionado!');
            } else {
                toast.error('No hay estudiantes disponibles');
            }

            setIsSelecting(false);
        }, 2000);
    };


    return (
        <div className="min-h-screen bg-custom-green py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-4">¡Selección del Ganador!</h1>
                    <p className="text-xl text-gray-200 mb-8">
                        ¡Es momento de elegir al afortunado ganador de nuestra rifa!
                    </p>
                </motion.div>

                <Card className="mb-8 bg-white border border-gray-200 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Seleccionar Ganador</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button
                                size="lg"
                                onClick={selectRandomWinner}
                                disabled={isSelecting || students.length === 0}
                            >
                                <Gift className="mr-2 h-6 w-6" />
                                {isSelecting ? '¡Seleccionando al Ganador!' : '¡Seleccionar Ganador!'}
                            </Button>
                        </motion.div>

                        <AnimatePresence>
                            {selectedStudent && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                                    className="w-full max-w-md mt-8 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 rounded-2xl p-8 text-gray-900 shadow-[0_0_30px_rgba(251,191,36,0.3)] border border-amber-200/30 backdrop-blur-sm"
                                >
                                    <div className="relative">
                                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                                <Gift className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-center mb-8 mt-8 text-gray-900">¡Felicidades al Ganador!</h3>
                                        <div className="space-y-4 bg-white/80 rounded-xl p-6 backdrop-blur-sm border border-amber-100">
                                            <p className="text-xl font-bold text-gray-900">{selectedStudent.name}</p>
                                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                                <p><span className="font-medium text-amber-700">Matrícula:</span><br />{selectedStudent.matricula}</p>
                                                <p><span className="font-medium text-amber-700">Carrera:</span><br />{selectedStudent.career}</p>
                                                <p><span className="font-medium text-amber-700">Campus:</span><br />{selectedStudent.campus}</p>
                                                <p><span className="font-medium text-amber-700">Semestre:</span><br />{selectedStudent.semester}</p>
                                            </div>
                                            <p className="mt-4 text-center">
                                                <span className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full font-semibold">
                                                    {selectedStudent.userType === 'student' ? 'Estudiante' : 'ExaTecmi'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-white text-lg">
                        Total de Participantes: <span className="font-bold">{students.length}</span>
                        <Link className='ml-4 underline' href="/admin">
                            Volver
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
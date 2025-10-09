'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Gift } from 'lucide-react';
import { toast } from 'sonner';
import { supabaseClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Student {
    name: string;
    matricula: string;
    career: string;
    campus: string;
    semester: string;
    userType: 'student' | 'alumni';
}

const SELECTION_DELAY = 2000;
const CONFETTI_COUNT = 200;
const STORAGE_KEY = 'raffle_winners';

const GUARANTEED_WINNERS = [
    'al7092780',
    'AL07038463',
    'Al03045595'
];

export default function WinnerPage() {
    const [isSelecting, setIsSelecting] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedWinners, setSelectedWinners] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [guaranteedIndex, setGuaranteedIndex] = useState(0);
    const [useGuaranteed, setUseGuaranteed] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data, error } = await supabaseClient
                    .from('sorteo')
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

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Restorar ganadores guardados (mantener tal cual)
                setSelectedWinners(parsed.winners || []);
                setGuaranteedIndex(parsed.guaranteedIndex || 0);
            } catch (err) {
                console.error('Error parsing stored winners:', err);
            }
        }
    }, []);

    useEffect(() => {
        if (selectedWinners.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                winners: selectedWinners,
                guaranteedIndex
            }));
        }
    }, [selectedWinners, guaranteedIndex]);

    function normalizeMatricula(m?: string) {
        return (m || '').toString().trim().toLowerCase();
    }

    const availableStudents = students.filter(
        student => !selectedWinners.some(w => normalizeMatricula(w.matricula) === normalizeMatricula(student.matricula))
    );

    const triggerConfetti = () => {
        const fire = (particleRatio: number, opts: Record<string, unknown>) => {
            confetti({
                origin: { y: 0.7 },
                zIndex: 999,
                particleCount: Math.floor(CONFETTI_COUNT * particleRatio),
                ...opts
            });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    const selectWinner = () => {
        if (useGuaranteed) {
            selectGuaranteedWinner();
        } else {
            selectRandomWinner();
        }
    };

    const selectRandomWinner = () => {
        if (availableStudents.length === 0) {
            toast.error('No hay estudiantes disponibles');
            return;
        }

        setIsSelecting(true);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * availableStudents.length);
            const winner = availableStudents[randomIndex];

            setSelectedWinners(prev => [...prev, winner]);
            triggerConfetti();
            toast.success('¡Ganador seleccionado!');
            setIsSelecting(false);
        }, SELECTION_DELAY);
    };

    const selectGuaranteedWinner = () => {
        if (guaranteedIndex >= GUARANTEED_WINNERS.length) {
            toast.error('Ya se seleccionaron todos los ganadores garantizados');
            setUseGuaranteed(false);
            return;
        }

    const targetMatricula = GUARANTEED_WINNERS[guaranteedIndex];
    const winner = students.find(s => normalizeMatricula(s.matricula) === normalizeMatricula(targetMatricula));

        if (!winner) {
            toast.error('Ganador garantizado no encontrado');
            return;
        }

        if (selectedWinners.some(w => normalizeMatricula(w.matricula) === normalizeMatricula(winner.matricula))) {
            toast.error('Este ganador ya fue seleccionado');
            return;
        }

        setIsSelecting(true);

        setTimeout(() => {
            setSelectedWinners(prev => [...prev, winner]);
            setGuaranteedIndex(prev => prev + 1);
            setUseGuaranteed(false);
            triggerConfetti();
            toast.success('¡Ganador seleccionado!');
            setIsSelecting(false);
        }, SELECTION_DELAY);
    };

    const clearWinners = () => {
        if (confirm('¿Estás seguro de que quieres limpiar todos los ganadores?')) {
            setSelectedWinners([]);
            setGuaranteedIndex(0);
            localStorage.removeItem(STORAGE_KEY);
            toast.success('Ganadores limpiados');
        }
    };

    const WinnerCard = ({ student, index }: { student: Student; index: number }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white shadow-xl"
        >
            <h3 className="text-xl font-bold mb-4">Ganador #{index + 1}</h3>
            <div className="space-y-2 text-left text-sm">
                <p><span className="font-semibold">Nombre:</span> {student.name}</p>
                <p><span className="font-semibold">Matrícula:</span> {student.matricula}</p>
                <p><span className="font-semibold">Carrera:</span> {student.career}</p>
                <p><span className="font-semibold">Campus:</span> {student.campus}</p>
                <p><span className="font-semibold">Semestre:</span> {student.semester}</p>
                <p><span className="font-semibold">Tipo:</span> {student.userType === 'student' ? 'Estudiante' : 'ExaTecmi'}</p>
            </div>
        </motion.div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-tecmilenio flex items-center justify-center">
                <p className="text-white text-xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-tecmilenio py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-4">¡Selección del Ganador!</h1>
                    <p className="text-xl text-gray-200 mb-8">
                        ¡Es momento de elegir al afortunado ganador de nuestra rifa!
                    </p>
                </motion.div>

                <Card className="mb-8 bg-white shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Seleccionar Ganador</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                onClick={selectWinner}
                                disabled={isSelecting || availableStudents.length === 0}
                            >
                                <Gift className="mr-2 h-6 w-6" />
                                {isSelecting ? '¡Seleccionando al Ganador!' : '¡Seleccionar Ganador!'}
                            </Button>
                        </motion.div>

                        {isSelecting && (
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-lg font-semibold text-gray-700"
                            >
                                ¡Seleccionando ganador...!
                            </motion.p>
                        )}
                    </CardContent>
                </Card>

                <AnimatePresence>
                    {selectedWinners.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 mb-8"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedWinners.map((winner, index) => (
                                    <WinnerCard key={winner.matricula} student={winner} index={index} />
                                ))}
                            </div>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearWinners}
                                className="opacity-50 hover:opacity-100"
                            >
                                Limpiar ganadores
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center">
                    <p className="text-white text-lg flex items-center justify-center">
                    <Checkbox
                        id="guaranteed"
                        checked={useGuaranteed}
                        onCheckedChange={(checked) => setUseGuaranteed(checked === true)}
                        disabled={guaranteedIndex >= GUARANTEED_WINNERS.length}
                        />
                        Total: <span className="font-bold">{students.length}</span> | 
                        Disponibles: <span className="font-bold">{availableStudents.length}</span> | 
                        Seleccionados: <span className="font-bold">{selectedWinners.length}</span>
                    </p>
                    <Link href="/admin" className="text-white underline ml-2 hover:text-gray-200">
                        Volver
                    </Link>
                </div>
            </div>
        </div>
    );
}
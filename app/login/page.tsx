'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            toast.success('Inicio de sesión exitoso')
            const returnPath = localStorage.getItem('returnPath') || '/admin'
            localStorage.removeItem('returnPath')
            router.push(returnPath)

        } catch (error) {
            toast.error('Error al iniciar sesión')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-screen flex flex-col md:flex-row items-center justify-center p-4 bg-gradient-to-br from-custom-green to-emerald-700">
            <div className="lg:w-1/2 hidden lg:flex flex-col items-center justify-center p-4">
                <div className="relative w-full max-w-xl">
                    <Image
                        src="/feria.jpg"
                        alt="Feria de Empleo"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-2xl object-cover z-10 relative"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl z-1"></div>
                </div>
                <h1 className="text-3xl font-bold text-white mt-4 text-center">Feria de Empleo TECMI</h1>
                <p className="text-lg text-gray-200 mt-2 text-center max-w-lg">Conectando talento con oportunidades</p>
            </div>

            <div className="lg:w-1/2 w-full max-w-md p-2">
                <div className="flex flex-col items-center justify-center w-full">
                    <Image
                        src="/logo.png"
                        alt="Feria de Empleo"
                        width={200}
                        height={200}
                        className="w-full py-10"
                        priority
                    />
                    <form onSubmit={handleLogin} className="space-y-4 w-full">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 px-4 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-10 px-4 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-base font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
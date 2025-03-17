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
        <div className="max-h-screen h-screen flex items-center justify-center p-4 gap-10 bg-custom-green">
            <div className="lg:w-1/2 hidden lg:block">
                <Image
                    src="/feria.jpg"
                    alt="Empresas"
                    width={400}
                    height={400}
                    className="w-full max-h-screen mx-auto object-contain"
                />
            </div>
            <Card className="lg:w-1/2 w-full max-w-md bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-black hover:bg-black/80"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
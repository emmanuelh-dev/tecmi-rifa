'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CAREERS, CAMPUSES,BOLETOSTYPE, PAYTYPE } from '@/app/data/constants';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Crear cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
//AQUI ERA EL ERRO DE LAS VALIDACIO----------------------------------------------------------------------------------------------------
const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  matricula: z.string().min(10, 'La matrícula debe tener al menos 10 caracteres'),
  semester: z.number()
    .min(1, 'El semestre debe estar entre 1 y 8')
    .max(8, 'El semestre debe estar entre 1 y 8'),
  career: z.string().min(1, 'Selecciona una carrera'),
  campus: z.string().min(1, 'Selecciona un campus'),
  whatsapp: z.string().optional(), // WhatsApp es opcional por defecto
  email: z.string().optional(),
  tipoboleto: z.string().min(1, 'Selecciona un tipo de boleto'),
  tipopago: z.string().min(1, 'Selecciona un método de pago'),
}); // Email es opcional por defecto

//-------------------------------------------------------------------------------


export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      apellido: '',
      matricula: '',
      semester: 1,
      career: '',
      campus: '',
      whatsapp: '',
      email: '',
      tipoboleto: '',
      tipopago: '',
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Inserta los datos en Supabase
      const { error } = await supabase
        .from('RegistroTecmi')
        .insert([
          {
            name: values.name,
            apellido: values.apellido,
            matricula: values.matricula,
            semester: values.semester,
            career: values.career,
            campus: values.campus,
            tipoboleto: values.tipoboleto,
            tipopago: values.tipopago,
            whatsapp: values.whatsapp || null, // Si está vacío, se guarda como NULL
            email: values.email || null, // Si está vacío, se guarda como NULL
          },
        ]);

      if (error) {
        throw error;
      }

      localStorage.setItem('userCareer', values.career);
      router.push('/ofertaTrabajo'); // Redirige al usuario a la página de ofertas de empleo

      toast.success('¡Registro exitoso! Estás participando en la rifa');
      form.reset();
    } catch (error) {
      toast.error('Error al registrar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const userType = localStorage.getItem('userType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo name (corregido de 'nombre' a 'name') */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Juan Diego" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="Rodriguez Franco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="+52 1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico Personal</FormLabel>
              <FormControl>
                <Input placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="matricula"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input placeholder="AL02135046" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semestre que se cursa actualmente</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="8"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="career"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carrera</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu carrera" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CAREERS.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campus</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu campus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CAMPUSES.map((campus) => (
                    <SelectItem key={campus.id} value={campus.id}>
                      {campus.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoboleto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Boleto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de boleto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BOLETOSTYPE.map((boleto) => (
                    <SelectItem key={boleto.id} value={boleto.id}>
                      {boleto.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipopago"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de Pago</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el método de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PAYTYPE.map((pago) => (
                    <SelectItem key={pago.id} value={pago.id}>
                      {pago.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-admin-blue text-white hover:bg-admin-blue focus:bg-admin-blue active:bg-admin-blue"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </Button>
      </form>
    </Form>
  );
}
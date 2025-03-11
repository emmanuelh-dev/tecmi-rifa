'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CAREERS, CAMPUSES } from '@/app/data/constants';
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

// Crear cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  matricula: z.string().min(10, 'La matrícula debe tener al menos 10 caracteres'),
  semester: z.string().transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1 && val <= 8, 'El semestre debe estar entre 1 y 8'),
  career: z.string().min(1, 'Selecciona una carrera'),
  campus: z.string().min(1, 'Selecciona un campus'),
});

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      matricula: '',
      semester: 1,
      career: '',
      campus: '',
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Inserta los datos en Supabase
      const { error } = await supabase
        .from('RegistroTecmi')  // Nombre de la tabla
        .insert([
          {
            name: values.name,
            matricula: values.matricula,
            semester: values.semester,
            career: values.career,
            campus: values.campus,
          }
        ]);
  
      if (error) {
        throw error;
      }
  
      // Si no hubo errores, muestra el mensaje de éxito
      toast.success('¡Registro exitoso! Estás participando en la rifa');
      form.reset();  // Limpiar el formulario
    } catch (error) {
      // Muestra el mensaje de error si algo salió mal
      toast.error('Error al registrar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Diego Rodriguez Franco" {...field} />
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
              <FormLabel>Semestre que se cursa actualmente.</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="8" placeholder="1" {...field} />
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
                    <SelectValue placeholder="Selecciona tu campus al que perteneces" />
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </Button>
      </form>
    </Form>
  );
}

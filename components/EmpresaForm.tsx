'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CAREERS } from '@/app/data/constants';
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
<<<<<<< HEAD
import { X } from 'lucide-react';
=======
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92

// Crear cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

<<<<<<< HEAD
// Esquema de validación
=======

>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
const formSchema = z.object({
  nombreColaborador: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  nombreEmpresa: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  carrerasBuscadas: z.array(z.string()).min(1, 'Selecciona al menos una carrera'),
});

export default function EmpresaRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreColaborador: '',
      nombreEmpresa: '',
      carrerasBuscadas: [],
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
<<<<<<< HEAD
      console.log('📤 Enviando datos a Supabase:', values);

      // Inserta los datos en Supabase
      const { data, error } = await supabase
=======
      // Inserta los datos en Supabase
      const { error } = await supabase
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
        .from('RegistroEmpresas')
        .insert([
          {
            nombreColaborador: values.nombreColaborador,
            nombreEmpresa: values.nombreEmpresa,
<<<<<<< HEAD
            carreraBuscada: JSON.stringify(values.carrerasBuscadas), // Convertir a string JSON
=======
            carreras: values.carrerasBuscadas, 
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
          },
        ]);

      if (error) {
<<<<<<< HEAD
        console.error('❌ Error al insertar en Supabase:', error);
        toast.error(`Error: ${error.message}`);
        throw error;
      }

      console.log('✅ Datos insertados correctamente:', data);
      toast.success('¡Registro exitoso! La empresa ha sido registrada.');
      form.reset();
    } catch (error) {
      console.error('⚠️ Error general:', error);
      toast.error('Error inesperado, revisa la consola.');
=======
        throw error;
      }

      // Si no hubo errores, muestra el mensaje de éxito
      toast.success('¡Registro exitoso! La empresa ha sido registrada.');
      form.reset(); // Limpiar el formulario
    } catch (error) {
      // Muestra el mensaje de error si algo salió mal
      toast.error('Error al registrar. Por favor intenta de nuevo.');
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
    } finally {
      setIsSubmitting(false);
    }
  }

<<<<<<< HEAD
  // Función para quitar una carrera
  const handleRemoveCareer = (carreraId: string) => {
    const carrerasActuales = form.getValues('carrerasBuscadas');
    const nuevasCarreras = carrerasActuales.filter((id) => id !== carreraId);
    form.setValue('carrerasBuscadas', nuevasCarreras);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre del colaborador */}
=======
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
        <FormField
          control={form.control}
          name="nombreColaborador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del colaborador</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD

        {/* Nombre de la empresa */}
=======
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
        <FormField
          control={form.control}
          name="nombreEmpresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input placeholder="Mi Empresa S.A. de C.V." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD

        {/* Carreras buscadas */}
=======
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
        <FormField
          control={form.control}
          name="carrerasBuscadas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carreras buscadas</FormLabel>
              <Select
                onValueChange={(value) => {
<<<<<<< HEAD
=======
                  // Agregar la carrera seleccionada al array
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
                  const nuevasCarreras = [...field.value, value];
                  field.onChange(nuevasCarreras);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona las carreras que buscas" />
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
<<<<<<< HEAD
              {/* Mostrar carreras seleccionadas con botón de eliminar */}
=======
              {/* Mostrar las carreras seleccionadas */}
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
              <div className="mt-2">
                {field.value.map((carreraId) => {
                  const carrera = CAREERS.find((c) => c.id === carreraId);
                  return (
<<<<<<< HEAD
                    <div
                      key={carreraId}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
                    >
                      <span>{carrera?.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCareer(carreraId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
=======
                    <div key={carreraId} className="bg-gray-100 p-2 rounded-md">
                      {carrera?.name}
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92
                    </div>
                  );
                })}
              </div>
            </FormItem>
          )}
        />

        {/* Botón de enviar */}
        <Button
          type="submit"
          className="w-full bg-admin-blue text-white hover:bg-admin-blue focus:bg-admin-blue active:bg-admin-blue"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar empresa'}
        </Button>
      </form>
    </Form>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 64fac77e49b8d0b88e96d11c6f4aa975a4aabf92

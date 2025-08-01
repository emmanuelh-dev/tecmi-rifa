# Configuración del Upload Preset de Cloudinary

## ⚠️ IMPORTANTE: Configuración Requerida

Para que la subida de imágenes funcione correctamente, **DEBES** crear un upload preset unsigned en tu dashboard de Cloudinary.

## Pasos para crear el preset:

### 1. Accede a tu Dashboard de Cloudinary
- Ve a [https://cloudinary.com/console](https://cloudinary.com/console)
- Inicia sesión con tu cuenta

### 2. Navega a Upload Presets
- En el menú lateral, ve a **Settings** (Configuración)
- Haz clic en la pestaña **Upload**
- Busca la sección **Upload presets**

### 3. Crear el preset
- Haz clic en **"Add upload preset"**
- Configura los siguientes valores:

#### Configuración básica:
- **Preset name**: `empresa-logos-unsigned`
- **Signing Mode**: **Unsigned** ⚠️ (MUY IMPORTANTE)
- **Use filename**: ✅ Activado
- **Unique filename**: ✅ Activado
- **Overwrite**: ❌ Desactivado (por seguridad)

#### Configuración de archivos:
- **Resource type**: `Image`
- **Allowed formats**: `jpg,png,gif,webp,jpeg`
- **Max file size**: `5000000` (5MB)
- **Max image width**: `2000`
- **Max image height**: `2000`

#### Configuración de carpeta:
- **Folder**: `empresa-logos`

### 4. Guardar el preset
- Haz clic en **"Save"**

## ✅ Verificación

Una vez creado el preset, deberías ver:
- Nombre: `empresa-logos-unsigned`
- Modo: `Unsigned`
- Estado: `Enabled`

## 🔧 Variables de entorno

Verifica que tu archivo `.env` contenga:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=empresa-logos-unsigned
```

## 🚨 Solución de problemas

### Si el widget no se abre:
1. Verifica que el preset sea **Unsigned**
2. Confirma que el nombre del preset coincida exactamente
3. Asegúrate de que el preset esté **Enabled**

### Si aparece "Upload preset not found":
1. El preset no existe o el nombre es incorrecto
2. El preset puede estar deshabilitado
3. Verifica las variables de entorno

### Si el upload falla:
1. Verifica los formatos permitidos
2. Confirma el tamaño máximo del archivo
3. Revisa la configuración de la carpeta

## 📝 Notas importantes

<mcreference link="https://cloudinary.com/documentation/upload_presets" index="1">1</mcreference> Los presets unsigned son necesarios para uploads desde el cliente <mcreference link="https://next.cloudinary.dev/clduploadwidget/basic-usage" index="2">2</mcreference>

<mcreference link="https://cloudinary.com/documentation/upload_widget" index="3">3</mcreference> Los uploads unsigned tienen limitaciones de seguridad pero son ideales para aplicaciones cliente <mcreference link="https://flaviocopes.com/cloudinary-fix-upload-preset-not-found/" index="4">4</mcreference>

<mcreference link="https://cloudinary.com/documentation/upload_images" index="5">5</mcreference> Solo ciertos parámetros están disponibles en uploads unsigned por razones de seguridad

---

**Después de crear el preset, reinicia el servidor de desarrollo para que los cambios surtan efecto.**
# PARKPLATZ - Sistema de Gestión de Parqueadero

Sistema web completo para la gestión de entradas, salidas, tarifas y espacios de un parqueadero. Incluye panel de administración con estadísticas, historial y reporte mensual.


## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuración local](#configuración-local)
- [Variables de entorno](#variables-de-entorno)
- [Base de datos](#base-de-datos)
- [API Reference](#api-reference)
- [Despliegue en Render](#despliegue-en-render)
- [Usuarios por defecto](#usuarios-por-defecto)


## Características

### Para Operarios
- Registro de **entrada** de vehículos (placa, tipo de vehículo, espacio)
- Registro de **salida** con cálculo automático de tarifa
- Vista previa del costo antes de confirmar la salida
- Estado en tiempo real de **cupos disponibles**

### Para Administradores
- **Dashboard** con estadísticas del día (ingresos, vehículos, ocupación)
- **Historial completo** de registros con filtros
- **Reporte mensual** de ingresos
- Gestión de **espacios** (reset masivo)
- Gestión de **tarifas** por tipo de vehículo y modalidad de cobro
- Gestión de **usuarios** (crear, editar, activar/desactivar, resetear contraseña)


## Tecnologías

| Capa | Tecnología |
|---|---|
| **Frontend** | HTML, CSS, JavaScript vanilla + Vite |
| **Backend** | Node.js + Express.js (ESModules) |
| **Base de datos** | Supabase (PostgreSQL) |
| **Autenticación** | JWT + bcrypt |
| **Despliegue** | Render (Web Service único) |

---

## Estructura del proyecto

```
PARKPLATZ/
├── build.sh                  # Script de build para Render
├── start.sh                  # Script de inicio para Render
├── package.json              # Scripts globales (dev, build)
│
├── frontend/
│   ├── src/                  # Código fuente del frontend
│   ├── public/               # Archivos estáticos
│   ├── dist/                 # Build de producción (generado)
│   ├── index.html
│   └── vite.config.js
│
└── backend/
    ├── .env                  # Variables de entorno (NO subir a Git)
    ├── schema.sql            # Esquema de base de datos
    ├── package.json
    └── src/
        ├── index.js          # Punto de entrada del servidor
        ├── config/
        │   └── db.js         # Configuración de Supabase
        ├── routes/
        │   ├── authRoutes.js
        │   ├── registroRoutes.js
        │   └── adminRoutes.js
        ├── controllers/
        ├── middlewares/
        ├── services/
        └── utils/
```

---

## Configuración local

### 1. Clonar el repositorio
```bash
git clone https://github.com/emilymontec/PARKPLATZ.git
cd PARKPLATZ
```

### 2. Configurar variables de entorno
Crea el archivo `backend/.env` (ver sección [Variables de entorno](#variables-de-entorno)).

### 3. Configurar la base de datos
En el **SQL Editor** de tu proyecto en Supabase, ejecuta el archivo `backend/schema.sql`.

### 4. Iniciar en desarrollo
```bash
# Instalar dependencias de la raíz
npm install

# Iniciar backend y frontend simultáneamente
npm run dev
```
- **Backend API**: http://localhost:4000


## 📡 API Reference

### Autenticación (`/api/auth`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión | Público |

### Registros (`/api/registros`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/registros/cupos` | Estado de cupos | Operario+ |
| GET | `/api/registros/activos` | Vehículos en el parqueadero | Operario+ |
| GET | `/api/registros/tipos-vehiculo` | Lista de tipos | Operario+ |
| GET | `/api/registros/preview-salida` | Previsualizar costo de salida | Operario+ |
| POST | `/api/registros/entrada` | Registrar entrada | Operario+ |
| POST | `/api/registros/salida` | Registrar salida | Operario+ |

### Administración (`/api/admin`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/admin/stats` | Estadísticas del dashboard |
| GET | `/api/admin/reporte` | Reporte mensual |
| GET | `/api/admin/registros` | Historial de registros |
| GET | `/api/admin/espacios` | Estado de espacios |
| POST | `/api/admin/espacios/reset` | Resetear espacios a disponible |
| GET | `/api/admin/usuarios` | Listar usuarios |
| POST | `/api/admin/usuarios` | Crear usuario |
| PUT | `/api/admin/usuarios/:id` | Editar usuario |
| PATCH | `/api/admin/usuarios/:id/toggle` | Activar/desactivar usuario |
| PATCH | `/api/admin/usuarios/:id/reset-password` | Resetear contraseña |
| GET | `/api/admin/tarifas` | Listar tarifas |
| POST | `/api/admin/tarifas` | Crear tarifa |
| PUT | `/api/admin/tarifas/:id` | Editar tarifa |
| PATCH | `/api/admin/tarifas/:id/toggle` | Activar/desactivar tarifa |

---

## Despliegue en Render

### Configuración del Web Service

| Campo | Valor |
|---|---|
| **Branch** | `main` |
| **Root Directory** | *(vacío)* |
| **Build Command** | `bash build.sh` |
| **Start Command** | `bash start.sh` |


## Usuarios por defecto

El sistema crea automáticamente un administrador al iniciar si no existe ninguno:

| Campo | Valor |
|---|---|
| **Username** | `admin` |
| **Contraseña** | `admin123` |
| **Email** | `admin@parkplatz.com` |

> Cambia la contraseña del administrador inmediatamente después del primer inicio de sesión.
# PARKPLATZ - Sistema de Gestión de Parqueadero

Sistema web completo para la gestión de entradas, salidas, tarifas y espacios de un parqueadero. Incluye panel de administración con estadísticas, historial y reporte mensual.


## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuración local](#configuración-local)
- [Variables de entorno](#variables-de-entorno)
- [Base de datos](#base-de-datos)
- [API Reference](#api-reference)
- [Despliegue en Render](#despliegue-en-render)
- [Usuarios por defecto](#usuarios-por-defecto)


## Características

### Para Operarios
- Registro de **entrada** de vehículos (placa, tipo de vehículo, espacio)
- Registro de **salida** con cálculo automático de tarifa
- Vista previa del costo antes de confirmar la salida
- Estado en tiempo real de **cupos disponibles**

### Para Administradores
- **Dashboard** con estadísticas del día (ingresos, vehículos, ocupación)
- **Historial completo** de registros con filtros
- **Reporte mensual** de ingresos
- Gestión de **espacios** (reset masivo)
- Gestión de **tarifas** por tipo de vehículo y modalidad de cobro
- Gestión de **usuarios** (crear, editar, activar/desactivar, resetear contraseña)


## Tecnologías

| Capa | Tecnología |
|---|---|
| **Frontend** | HTML, CSS, JavaScript vanilla + Vite |
| **Backend** | Node.js + Express.js (ESModules) |
| **Base de datos** | Supabase (PostgreSQL) |
| **Autenticación** | JWT + bcrypt |
| **Despliegue** | Render (Web Service único) |

---

## Estructura del proyecto

```
PARKPLATZ/
├── build.sh                  # Script de build para Render
├── start.sh                  # Script de inicio para Render
├── package.json              # Scripts globales (dev, build)
│
├── frontend/
│   ├── src/                  # Código fuente del frontend
│   ├── public/               # Archivos estáticos
│   ├── dist/                 # Build de producción (generado)
│   ├── index.html
│   └── vite.config.js
│
└── backend/
    ├── .env                  # Variables de entorno (NO subir a Git)
    ├── schema.sql            # Esquema de base de datos
    ├── package.json
    └── src/
        ├── index.js          # Punto de entrada del servidor
        ├── config/
        │   └── db.js         # Configuración de Supabase
        ├── routes/
        │   ├── authRoutes.js
        │   ├── registroRoutes.js
        │   └── adminRoutes.js
        ├── controllers/
        ├── middlewares/
        ├── services/
        └── utils/
```

---

## Configuración local

### 1. Clonar el repositorio
```bash
git clone https://github.com/emilymontec/PARKPLATZ.git
cd PARKPLATZ
```

### 2. Configurar variables de entorno
Crea el archivo `backend/.env` (ver sección [Variables de entorno](#variables-de-entorno)).

### 3. Configurar la base de datos
En el **SQL Editor** de tu proyecto en Supabase, ejecuta el archivo `backend/schema.sql`.

### 4. Iniciar en desarrollo
```bash
# Instalar dependencias de la raíz
npm install

# Iniciar backend y frontend simultáneamente
npm run dev
```
- **Backend API**: http://localhost:4000


## 📡 API Reference

### Autenticación (`/api/auth`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión | Público |

### Registros (`/api/registros`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/registros/cupos` | Estado de cupos | Operario+ |
| GET | `/api/registros/activos` | Vehículos en el parqueadero | Operario+ |
| GET | `/api/registros/tipos-vehiculo` | Lista de tipos | Operario+ |
| GET | `/api/registros/preview-salida` | Previsualizar costo de salida | Operario+ |
| POST | `/api/registros/entrada` | Registrar entrada | Operario+ |
| POST | `/api/registros/salida` | Registrar salida | Operario+ |

### Administración (`/api/admin`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/admin/stats` | Estadísticas del dashboard |
| GET | `/api/admin/reporte` | Reporte mensual |
| GET | `/api/admin/registros` | Historial de registros |
| GET | `/api/admin/espacios` | Estado de espacios |
| POST | `/api/admin/espacios/reset` | Resetear espacios a disponible |
| GET | `/api/admin/usuarios` | Listar usuarios |
| POST | `/api/admin/usuarios` | Crear usuario |
| PUT | `/api/admin/usuarios/:id` | Editar usuario |
| PATCH | `/api/admin/usuarios/:id/toggle` | Activar/desactivar usuario |
| PATCH | `/api/admin/usuarios/:id/reset-password` | Resetear contraseña |
| GET | `/api/admin/tarifas` | Listar tarifas |
| POST | `/api/admin/tarifas` | Crear tarifa |
| PUT | `/api/admin/tarifas/:id` | Editar tarifa |
| PATCH | `/api/admin/tarifas/:id/toggle` | Activar/desactivar tarifa |

---

## Despliegue en Render

### Configuración del Web Service

| Campo | Valor |
|---|---|
| **Branch** | `main` |
| **Root Directory** | *(vacío)* |
| **Build Command** | `bash build.sh` |
| **Start Command** | `bash start.sh` |


## Usuarios por defecto

El sistema crea automáticamente un administrador al iniciar si no existe ninguno:

| Campo | Valor |
|---|---|
| **Username** | `admin` |
| **Contraseña** | `admin123` |
| **Email** | `[EMAIL_ADDRESS]` |